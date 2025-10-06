import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "axios";

// Define the Newsletter type
export interface Newsletter {
  _id: string;
  email: string;
  status: "Subscribed" | "Unsubscribed";
  createdAt: string;
  updatedAt: string;
}

// Define the API Newsletter type (from backend)
interface ApiNewsletter {
  _id: string;
  email: string;
  status: "Subscribed" | "Unsubscribed";
  createdAt: string;
  updatedAt: string;
}

// Define the state structure
interface NewsletterState {
  data: Newsletter[];
  isLoading: boolean;
  error: string | null;
  selectedNewsletter: Newsletter | null;
  filters: {
    status: string;
    email?: string;
  };
}

// Initial state
const initialState: NewsletterState = {
  data: [],
  isLoading: false,
  error: null,
  selectedNewsletter: null,
  filters: {
    status: '',
    email: '',
  },
};

// Create the slice
const newsletterSlice = createSlice({
  name: "newsletters",
  initialState,
  reducers: {
    setNewsletterData: (state, action: PayloadAction<Newsletter[]>) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setNewsletterLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setNewsletterError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedNewsletter: (state, action: PayloadAction<Newsletter | null>) => {
      state.selectedNewsletter = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setNewsletterFilters: (state, action: PayloadAction<Partial<NewsletterState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearSelectedNewsletter: (state) => {
      state.selectedNewsletter = null;
    },
  },
});

// Export actions
export const {
  setNewsletterData,
  setNewsletterLoading,
  setNewsletterError,
  setSelectedNewsletter,
  setNewsletterFilters,
  clearSelectedNewsletter,
} = newsletterSlice.actions;

// Helper function to map API newsletter to our Newsletter interface
const mapApiNewsletterToNewsletter = (apiNewsletter: ApiNewsletter): Newsletter => ({
  _id: apiNewsletter._id,
  email: apiNewsletter.email,
  status: apiNewsletter.status,
  createdAt: apiNewsletter.createdAt,
  updatedAt: apiNewsletter.updatedAt,
});

// Error handler utility
const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

// Fetch newsletters with filters
export const fetchNewslettersData = () => async (dispatch: AppDispatch, getState: () => { newsletters: NewsletterState }) => {
  dispatch(setNewsletterLoading());
  try {
    const { filters } = getState().newsletters;
    const queryParams = new URLSearchParams();

    // Add filter parameters if they exist
    if (filters.status && filters.status !== 'all') {
      queryParams.append('status', filters.status);
    }
    if (filters.email) {
      queryParams.append('email', filters.email);
    }

    const queryString = queryParams.toString();
    const url = queryString ? 
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/newsletters?${queryString}` :
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/newsletters`;

    const response = await axios.get(url);

    if (response.data?.success && Array.isArray(response.data.data)) {
      // Map API response to our Newsletter interface
      const mappedNewsletters = response.data.data.map((item: ApiNewsletter) => mapApiNewsletterToNewsletter(item));

      dispatch(setNewsletterData(mappedNewsletters));
    } else {
      throw new Error(response.data?.message || "Failed to fetch newsletters");
    }
    return true;
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setNewsletterError(errorMessage));
    return false;
  }
};

// Fetch a newsletter by ID
export const fetchNewsletterById = (newsletterId: string) => async (dispatch: AppDispatch) => {
  dispatch(setNewsletterLoading());
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/newsletters/${newsletterId}`
    );
    if (response.data?.success) {
      const newsletter = response.data.data;
      const mappedNewsletter = mapApiNewsletterToNewsletter(newsletter);
      dispatch(setSelectedNewsletter(mappedNewsletter));
      return true;
    } else {
      throw new Error(response.data?.message || "Failed to fetch newsletter");
    }
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setNewsletterError(errorMessage));
    return false;
  }
};

// Add a new newsletter subscription
export const createNewsletter = (email: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/newsletters/subscribe`,
      { email }
    );
    if (response.data?.success) {
      dispatch(setNewsletterLoading());
      return true;
    } else {
      const errorMessage = response.data?.message || "Failed to subscribe to newsletter";
      dispatch(setNewsletterError(errorMessage));
      return false;
    }
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setNewsletterError(errorMessage));
    return false;
  }
};

// Update newsletter status (subscribe/unsubscribe)
export const updateNewsletterStatus = (newsletterId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/newsletters/${newsletterId}`,
    );
    if (response.data?.success) {
      dispatch(setNewsletterLoading());
      return true;
    } else {
      throw new Error(response.data?.message || "Failed to update newsletter status");
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    dispatch(setNewsletterError(errorMessage));
    return false;
  }
}

// Delete a newsletter subscription
export const deleteNewsletter = (newsletterId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/newsletters/${newsletterId}`
    );
    if (response.data?.success) {
      dispatch(setNewsletterLoading());
      return true;
    } else {
      throw new Error(response.data?.message || "Failed to delete newsletter");
    }
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setNewsletterError(errorMessage));
    return false;
  }
};

// Selectors
export const selectNewslettersData = (state: { newsletters: NewsletterState }) => state.newsletters.data;
export const selectNewslettersLoading = (state: { newsletters: NewsletterState }) => state.newsletters.isLoading;
export const selectNewslettersError = (state: { newsletters: NewsletterState }) => state.newsletters.error;
export const selectSelectedNewsletter = (state: { newsletters: NewsletterState }) => state.newsletters.selectedNewsletter;
export const selectNewsletterFilters = (state: { newsletters: NewsletterState }) => state.newsletters.filters;

// Export the reducer
export default newsletterSlice.reducer;