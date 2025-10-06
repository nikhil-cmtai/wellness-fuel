import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "axios";

export interface Field {
  fieldName: string;
  fieldType: string;
  isRequired: boolean;
}

// Define the Popup type
export interface Popup {
  _id: string;
  name: string;
  heading: string;
  subheading: string;
  delay: number;
  image: string;
  ctaButtonText: string;
  secondaryButtonText: string;
  buttonAction: string;
  badgeText: string;
  badgeVisible: boolean;
  showCloseIcon: boolean;
  fields: Field[];
  status: "active" | "inactive";
  // Color options
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
  buttonTextColor: string;
  borderColor: string;
  createdAt: string;
  updatedAt: string;
}

// Define the API Popup type (from backend)
interface ApiPopup {
  _id: string;
  name: string;
  heading: string;
  subheading: string;
  delay: number;
  image: string;
  ctaButtonText: string;
  secondaryButtonText: string;
  buttonAction: string;
  badgeText: string;
  badgeVisible: boolean;
  showCloseIcon: boolean;
  fields: Field[];
  status: "active" | "inactive";
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
  buttonTextColor: string;
  borderColor: string;
  createdAt: string;
  updatedAt: string;
}

// Define the state structure
interface PopupState {
  data: Popup[];
  isLoading: boolean;
  error: string | null;
  selectedPopup: Popup | null;
  filters: {
    status: string;
    name?: string;
  };
}

// Initial state
const initialState: PopupState = {
  data: [],
  isLoading: false,
  error: null,
  selectedPopup: null,
  filters: {
    status: '',
    name: '',
  },
};

// Helper function to map API popup to our Popup interface
const mapApiPopupToPopup = (apiPopup: ApiPopup): Popup => ({
  _id: apiPopup._id,
  name: apiPopup.name,
  heading: apiPopup.heading,
  subheading: apiPopup.subheading,
  delay: apiPopup.delay,
  image: apiPopup.image,
  ctaButtonText: apiPopup.ctaButtonText,
  secondaryButtonText: apiPopup.secondaryButtonText,
  buttonAction: apiPopup.buttonAction,
  badgeText: apiPopup.badgeText,
  badgeVisible: apiPopup.badgeVisible,
  showCloseIcon: apiPopup.showCloseIcon,
  fields: apiPopup.fields,
  status: apiPopup.status,
  backgroundColor: apiPopup.backgroundColor,
  textColor: apiPopup.textColor,
  buttonColor: apiPopup.buttonColor,
  buttonTextColor: apiPopup.buttonTextColor,
  borderColor: apiPopup.borderColor,
  createdAt: apiPopup.createdAt,
  updatedAt: apiPopup.updatedAt,
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

// Create the slice
const popupSlice = createSlice({
  name: "popups",
  initialState,
  reducers: {
    setPopupData: (state, action: PayloadAction<Popup[]>) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setPopupLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setPopupError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedPopup: (state, action: PayloadAction<Popup>) => {
      state.selectedPopup = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setPopupFilters: (state, action: PayloadAction<Partial<PopupState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearSelectedPopup: (state) => {
      state.selectedPopup = null;
    },
  },
});

// Export actions
export const {
  setPopupData,
  setPopupLoading,
  setPopupError,
  setSelectedPopup,
  setPopupFilters,
  clearSelectedPopup,
} = popupSlice.actions;

// Fetch popups with filters
export const fetchPopupsData = () => async (dispatch: AppDispatch, getState: () => { popups: PopupState }) => {
  dispatch(setPopupLoading());
  try {
    const { filters } = getState().popups;
    const queryParams = new URLSearchParams();

    // Add filter parameters if they exist
    if (filters.status && filters.status !== 'all') {
      queryParams.append('status', filters.status);
    }
    if (filters.name) {
      queryParams.append('name', filters.name);
    }

    const queryString = queryParams.toString();
    const url = queryString ?
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/popups?${queryString}` :
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/popups`;

    const response = await axios.get(url);

    if (response.data?.success && Array.isArray(response.data.data)) {
      // Map API response to our Popup interface
      const mappedPopups = response.data.data.map((popup: ApiPopup) => mapApiPopupToPopup(popup));
      dispatch(setPopupData(mappedPopups));
    } else {
      throw new Error(response.data?.message || "Failed to fetch popups");
    }
    return true;
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setPopupError(errorMessage));
    return false;
  }
};

// Fetch active popups
export const fetchActivePopups = () => async (dispatch: AppDispatch) => {
  dispatch(setPopupLoading());
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/popups/getActivePopups`);
    if (response.data?.success && Array.isArray(response.data.data)) {
      const mappedPopups = response.data.data.map((popup: ApiPopup) => mapApiPopupToPopup(popup));
      dispatch(setPopupData(mappedPopups));
    } else {
      throw new Error(response.data?.message || "Failed to fetch popups");
    }
    return true;
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setPopupError(errorMessage));
    return false;
  }
};

// Fetch popup by ID
export const fetchPopupById = (popupId: string) => async (dispatch: AppDispatch) => {
  dispatch(setPopupLoading());
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/popups/getPopupById/${popupId}`
    );
    if (response.data?.success) {
      const popup = response.data.data;
      const mappedPopup = mapApiPopupToPopup(popup);
      dispatch(setSelectedPopup(mappedPopup));
      return true;
    } else {
      throw new Error(response.data?.message || "Failed to fetch popup");
    }
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setPopupError(errorMessage));
    return false;
  }
};

// Add a new popup
export const createPopup = (newPopup: FormData) => async (dispatch: AppDispatch) => {
  dispatch(setPopupLoading());
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/popups`,
      newPopup,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    if (response.data?.success) {
      dispatch(setPopupLoading());
      return true;
    } else {
      const errorMessage = response.data?.message || "Failed to create popup";
      dispatch(setPopupError(errorMessage));
      return false;
    }
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setPopupError(errorMessage));
    return false;
  }
};

// Update popup status
export const updatePopupStatus = (popupId: string) => async (dispatch: AppDispatch) => {
  dispatch(setPopupLoading());
  try {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/popups/updatePopupStatus/${popupId}`);
    if (response.data?.success) {
      dispatch(setPopupLoading());
    } else {
      throw new Error(response.data?.message || "Failed to update popup status");
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    dispatch(setPopupError(errorMessage));
  }
}

// Edit a popup
export const updatePopup = (popupId: string, updatedData: FormData) => async (dispatch: AppDispatch) => {
  dispatch(setPopupLoading());
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/popups/${popupId}`,
      updatedData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    if (response.data?.success) {
      dispatch(setPopupLoading());
      return true;
    } else {
      throw new Error(response.data?.message || "Failed to update popup");
    }
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setPopupError(errorMessage));
    return false;
  }
};

// Delete a popup
export const deletePopup = (popupId: string) => async (dispatch: AppDispatch) => {
  dispatch(setPopupLoading());
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/popups/${popupId}`
    );
    if (response.data?.success) {
      dispatch(setPopupLoading());
      return true;
    } else {
      throw new Error(response.data?.message || "Failed to delete popup");
    }
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setPopupError(errorMessage));
    return false;
  }
};

// Selectors
export const selectPopupsData = (state: { popups: PopupState }) => state.popups.data;
export const selectPopupsLoading = (state: { popups: PopupState }) => state.popups.isLoading;
export const selectPopupsError = (state: { popups: PopupState }) => state.popups.error;
export const selectSelectedPopup = (state: { popups: PopupState }) => state.popups.selectedPopup;
export const selectPopupsFilters = (state: { popups: PopupState }) => state.popups.filters;

// Export the reducer
export default popupSlice.reducer;