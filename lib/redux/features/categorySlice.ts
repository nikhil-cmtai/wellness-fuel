import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "axios";

// Define the Category type
export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  status: string;
  metaTitle: string;
  metaDescription: string;
  createdAt: string;
  updatedAt: string;
}

// Define the API Category type (from backend)
interface ApiCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  metaTitle?: string;
  metaDescription?: string;
}

// Define the state structure
interface CategoryState {
  data: Category[];
  isLoading: boolean;
  error: string | null;
  selectedCategory: Category | null;
  filters: {
    status: string;
    name?: string;
  };
}

// Initial state
const initialState: CategoryState = {
  data: [],
  isLoading: false,
  error: null,
  selectedCategory: null,
  filters: {
    status: '',
    name: '',
  },
};

// Create the slice
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategoryData: (state, action: PayloadAction<Category[]>) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setCategoryLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setCategoryError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<Category>) => {
      state.selectedCategory = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setFilters: (state, action: PayloadAction<Partial<CategoryState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
  },
});

// Export actions
export const {
  setCategoryData,
  setCategoryLoading,
  setCategoryError,
  setSelectedCategory,
  setFilters,
  clearSelectedCategory,
} = categorySlice.actions;

// Helper function to map API category to our Category interface
const mapApiCategoryToCategory = (apiCategory: ApiCategory): Category => ({
  _id: apiCategory._id,
  name: apiCategory.name,
  slug: apiCategory.slug,
  description: apiCategory.description,
  imageUrl: apiCategory.image,
  status: apiCategory.status,
  metaTitle: apiCategory.metaTitle || apiCategory.name,
  metaDescription: apiCategory.metaDescription || apiCategory.description,
  createdAt: apiCategory.createdAt,
  updatedAt: apiCategory.updatedAt,
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

// Fetch categories with filters
export const fetchCategoriesData = () => async (dispatch: AppDispatch, getState: () => { categories: CategoryState }) => {
  dispatch(setCategoryLoading());
  try {
    const { filters } = getState().categories;
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
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories?${queryString}` :
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`;

    const response = await axios.get(url);

    if (response.data?.success && Array.isArray(response.data.data)) {
      // Map API response to our Category interface
      const mappedCategories = response.data.data.map((cat: ApiCategory) => mapApiCategoryToCategory(cat));

      dispatch(setCategoryData(mappedCategories));
    } else {
      throw new Error(response.data?.message || "Failed to fetch categories");
    }
    return true;
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setCategoryError(errorMessage));
    return false;
  }
};

// Fetch active categories
export const fetchActiveCategories = () => async (dispatch: AppDispatch) => {
  dispatch(setCategoryLoading());
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/getActiveCategories`);
    if (response.data?.success && Array.isArray(response.data.data)) {
      // Map API response to our Category interface
      const mappedCategories = response.data.data.map((cat: ApiCategory) => mapApiCategoryToCategory(cat));

      dispatch(setCategoryData(mappedCategories));
    } else {
      throw new Error(response.data?.message || "Failed to fetch categories");
    }
    return true;
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setCategoryError(errorMessage));
    return false;
  }
};

// Fetch category by ID
export const fetchCategoryById = (categoryId: string) => async (dispatch: AppDispatch) => {
  dispatch(setCategoryLoading());
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/getCategoryById/${categoryId}`
    );
    if (response.data?.success) {
      const category = response.data.data;
      const mappedCategory = mapApiCategoryToCategory(category);
      dispatch(setSelectedCategory(mappedCategory));
      return true;
    } else {
      throw new Error(response.data?.message || "Failed to fetch category");
    }
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setCategoryError(errorMessage));
    return false;
  }
};

// Fetch category by slug
export const fetchCategoryBySlug = (slug: string) => async (dispatch: AppDispatch) => {
  dispatch(setCategoryLoading());
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/getCategoryBySlug/${slug}`
    );
    if (response.data?.success) {
      const category = response.data.data;
      const mappedCategory = mapApiCategoryToCategory(category);
      dispatch(setSelectedCategory(mappedCategory));
      return true;
    } else {
      throw new Error(response.data?.message || "Failed to fetch category");
    }
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setCategoryError(errorMessage));
    return false;
  }
};

// Fetch latest categories
export const fetchLatestCategories = () => async (dispatch: AppDispatch) => {
  dispatch(setCategoryLoading());
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/getLatestCategories`
    );
    if (response.data?.success) {
      // Map API response to our Category interface
      const mappedCategories = response.data.data.categories.map((cat: ApiCategory) => mapApiCategoryToCategory(cat));

      dispatch(setCategoryData(mappedCategories));
    } else {
      throw new Error(response.data?.message || "Failed to fetch latest categories");
    }
    return true;
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setCategoryError(errorMessage));
    return false;
  }
};

// Add a new category
export const createCategory = (newCategory: FormData) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/newCategory`,
      newCategory,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    if (response.data?.success) {
      dispatch(setCategoryLoading());
      return true;
    } else {
      const errorMessage = response.data?.message || "Failed to create category";
      dispatch(setCategoryError(errorMessage));
      return false;
    }
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setCategoryError(errorMessage));
    return false;
  }
};

// Update category status
export const updateCategoryStatus = (categoryId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/updateCategoryStatus/${categoryId}`);
    if (response.data?.success) {
      dispatch(setCategoryLoading());
    } else {
      throw new Error(response.data?.message || "Failed to update category status");
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    dispatch(setCategoryError(errorMessage));
  }
}

// Edit a category
export const updateCategory = (categoryId: string, updatedData: FormData) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/updateCategory/${categoryId}`,
      updatedData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    if (response.data?.success) {
      dispatch(setCategoryLoading());
      return true;
    } else {
      throw new Error(response.data?.message || "Failed to update category");
    }
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setCategoryError(errorMessage));
    return false;
  }
};

// Delete a category
export const deleteCategory = (categoryId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/deleteCategory/${categoryId}`
    );
    if (response.data?.success) {
      dispatch(setCategoryLoading());
      return true;
    } else {
      throw new Error(response.data?.message || "Failed to delete category");
    }
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setCategoryError(errorMessage));
    return false;
  }
};

// Selectors
export const selectCategoriesData = (state: { categories: CategoryState }) => state.categories.data;
export const selectCategoriesLoading = (state: { categories: CategoryState }) => state.categories.isLoading;
export const selectCategoriesError = (state: { categories: CategoryState }) => state.categories.error;
export const selectSelectedCategory = (state: { categories: CategoryState }) => state.categories.selectedCategory;
export const selectCategoriesFilters = (state: { categories: CategoryState }) => state.categories.filters;

// Export the reducer
export default categorySlice.reducer;