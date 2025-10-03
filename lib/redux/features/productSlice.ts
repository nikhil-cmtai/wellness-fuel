import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "axios";

// Define the Product type
export interface Product {
  _id: string;
  name: string;
  slug?: string;
  category: string;
  price: {
    amount: number;
    currency: string;
    mrp: number;
  };
  stockQuantity: number;
  shortDescription: string;
  description?: string;
  longDescription: string;
  weightSize: {
    value: number;
    unit: string;
  };
  expiryDate: string;
  ingredients: string[];
  benefits: string[];
  dosageInstructions: string;
  manufacturer: string;
  images: string[];
  imageUrl?: string; // Optional for backward compatibility
  status?: string;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

// Define the API Product type (from backend)
interface ApiProduct {
  _id: string;
  name: string;     
  slug?: string;
  category: string;
  price: {
    amount: number;
    currency: string;
    mrp: number;
  };
  stockQuantity: number;
  shortDescription: string;
  description?: string;
  longDescription: string;
  weightSize: {
    value: number;
    unit: string;
  };
  expiryDate: string;
  ingredients: string[];
  benefits: string[];
  dosageInstructions: string;
  manufacturer: string;
  images: string[];
  imageUrl?: string; // Optional for backward compatibility
  status?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  metaTitle?: string;
  metaDescription?: string;
}

// Define the state structure
interface ProductState {
  data: Product[];
  isLoading: boolean;
  error: string | null;
  selectedProduct: Product | null;
  filters: {
    category: string;
    status: string;
    search: string;
    priceRange?: {
      min: number;
      max: number;
    };
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// Initial state
const initialState: ProductState = {
  data: [],
  isLoading: false,
  error: null,
  selectedProduct: null,
  filters: {
    category: '',
    status: '',
    search: '',
    priceRange: undefined,
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

// Create the slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductData: (state, action: PayloadAction<{ data: Product[]; total: number }>) => {
      state.data = action.payload.data;
      state.pagination.total = action.payload.total;
      state.isLoading = false;
      state.error = null;
    },
    setProductLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setProductError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setFilters: (state, action: PayloadAction<Partial<ProductState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1; // Reset to first page when filters change
    },
    setPagination: (state, action: PayloadAction<Partial<ProductState['pagination']>>) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
});

// Export actions
export const {
  setProductData,
  setProductLoading,
  setProductError,
  setSelectedProduct,
  setFilters,
  setPagination,
  clearSelectedProduct,
} = productSlice.actions;

// Helper function to map API product to our Product interface
const mapApiProductToProduct = (apiProduct: ApiProduct): Product => ({
  _id: apiProduct._id,
  name: apiProduct.name,
  slug: apiProduct.slug || '',
  category: apiProduct.category,
  price: {
    amount: apiProduct.price.amount,
    currency: apiProduct.price.currency,
    mrp: apiProduct.price.mrp || apiProduct.price.amount
  },
  stockQuantity: apiProduct.stockQuantity,
  shortDescription: apiProduct.shortDescription,
  description: apiProduct.description || apiProduct.shortDescription,
  longDescription: apiProduct.longDescription,
  weightSize: apiProduct.weightSize,
  expiryDate: apiProduct.expiryDate,
  ingredients: apiProduct.ingredients || [],
  benefits: apiProduct.benefits || [],
  dosageInstructions: apiProduct.dosageInstructions,
  manufacturer: apiProduct.manufacturer,
  images: apiProduct.images || [],
  imageUrl: apiProduct.imageUrl || apiProduct.image || apiProduct.images?.[0] || '',
  status: apiProduct.status || 'active',
  metaTitle: apiProduct.metaTitle || apiProduct.name,
  metaDescription: apiProduct.metaDescription || apiProduct.shortDescription,
  createdAt: apiProduct.createdAt,
  updatedAt: apiProduct.updatedAt,
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

// Fetch products with filters and pagination
export const fetchProductsData = () => async (dispatch: AppDispatch, getState: () => { products: ProductState }) => {
  dispatch(setProductLoading());
  try {
    const { filters, pagination } = getState().products;
    const queryParams = new URLSearchParams();
    
    // Add pagination parameters
    queryParams.append('page', pagination.page.toString());
    queryParams.append('limit', pagination.limit.toString());

    // Add filter parameters if they exist
    if (filters.category && filters.category !== 'All') {
      queryParams.append('category', filters.category);
    }
    if (filters.status && filters.status !== 'All') {
      queryParams.append('status', filters.status);
    }
    if (filters.search) {
      queryParams.append('search', filters.search);
    }
    if (filters.priceRange) {
      queryParams.append('minPrice', filters.priceRange.min.toString());
      queryParams.append('maxPrice', filters.priceRange.max.toString());
    }

    const queryString = queryParams.toString();
    const url = queryString ? 
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?${queryString}` :
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`;

    const response = await axios.get(url);

    if (response.data?.success && Array.isArray(response.data.data)) {
      // Map API response to our Product interface
      const mappedProducts = response.data.data.map((product: ApiProduct) => mapApiProductToProduct(product));

      dispatch(setProductData({
        data: mappedProducts,
        total: response.data.pagination?.totalProducts || response.data.data.length,
      }));
    } else {
      throw new Error(response.data?.message || "Failed to fetch products");
    }
    return true;
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setProductError(errorMessage));
    return false;
  }
};

// Fetch active products
export const fetchActiveProducts = () => async (dispatch: AppDispatch, getState: () => { products: ProductState }) => {
  dispatch(setProductLoading());
  try {
    const { filters, pagination } = getState().products;
    const queryParams = new URLSearchParams();
    
    // Add pagination parameters
    queryParams.append('page', pagination.page.toString());
    queryParams.append('limit', pagination.limit.toString());

    // Add filter parameters if they exist
    if (filters.category && filters.category !== '') {
      queryParams.append('category', filters.category);
    }
    if (filters.search) {
      queryParams.append('search', filters.search);
    }

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getActiveProducts?${queryParams}`);
    if (response.data?.success) {
      // Map API response to our Product interface
      const mappedProducts = response.data.data.products.map((product: ApiProduct) => mapApiProductToProduct(product));

      dispatch(setProductData({
        data: mappedProducts,
        total: response.data.data.pagination.totalProducts,
      }));
    } else {
      throw new Error(response.data?.message || "Failed to fetch products");
    }
    return true;
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setProductError(errorMessage));
    return false;
  }
};

// Fetch product by ID
export const fetchProductById = (productId: string) => async (dispatch: AppDispatch) => {
  dispatch(setProductLoading());
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getProductById/${productId}`
    );
    if (response.data?.success) {
      const product = response.data.data;
      const mappedProduct = mapApiProductToProduct(product);
      dispatch(setSelectedProduct(mappedProduct));
      return true;
    } else {
      throw new Error(response.data?.message || "Failed to fetch product");
    }
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setProductError(errorMessage));
    return false;
  }
};

// Fetch product by slug
export const fetchProductBySlug = (slug: string) => async (dispatch: AppDispatch) => {
  dispatch(setProductLoading());
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getProductBySlug/${slug}`
    );
    if (response.data?.success) {
      const product = response.data.data;
      const mappedProduct = mapApiProductToProduct(product);
      dispatch(setSelectedProduct(mappedProduct));
      return true;
    } else {
      throw new Error(response.data?.message || "Failed to fetch product");
    }
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setProductError(errorMessage));
    return false;
  }
};

// Fetch latest products
export const fetchLatestProducts = () => async (dispatch: AppDispatch) => {
  dispatch(setProductLoading());
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getLatestProducts`
    );
    if (response.data?.success) {
      // Map API response to our Product interface
      const mappedProducts = response.data.data.products.map((product: ApiProduct) => mapApiProductToProduct(product));

      dispatch(setProductData({
        data: mappedProducts,
        total: response.data.data.pagination.totalProducts,
      }));
    } else {
      throw new Error(response.data?.message || "Failed to fetch latest products");
    }
    return true;
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setProductError(errorMessage));
    return false;
  }
};

// Add a new product
export const createProduct = (newProduct: FormData) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/newProduct`,
      newProduct,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    if (response.data?.success) {
      dispatch(setProductLoading());
      return true;
    } else {
      const errorMessage = response.data?.message || "Failed to create product";
      dispatch(setProductError(errorMessage));
      return false;
    }
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setProductError(errorMessage));
    return false;
  }
};

// Update product status
export const updateProductStatus = (productId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/updateProductStatus/${productId}`);
    if (response.data?.success) {
      dispatch(setProductLoading());
    } else {
      throw new Error(response.data?.message || "Failed to update product status");
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    dispatch(setProductError(errorMessage));
  }
};

// Edit a product
export const updateProduct = (productId: string, updatedData: FormData) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/updateProduct/${productId}`,
      updatedData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    if (response.data?.success) {
      dispatch(setProductLoading());
      return true;
    } else {
      throw new Error(response.data?.message || "Failed to update product");
    }
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setProductError(errorMessage));
    return false;
  }
};

// Delete a product
export const deleteProduct = (productId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/deleteProduct/${productId}`
    );
    if (response.data?.success) {
      dispatch(setProductLoading());
      return true;
    } else {
      throw new Error(response.data?.message || "Failed to delete product");
    }
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setProductError(errorMessage));
    return false;
  }
};

// Selectors
export const selectProductsData = (state: { products: ProductState }) => state.products.data;
export const selectProductsLoading = (state: { products: ProductState }) => state.products.isLoading;
export const selectProductsError = (state: { products: ProductState }) => state.products.error;
export const selectSelectedProduct = (state: { products: ProductState }) => state.products.selectedProduct;
export const selectProductsFilters = (state: { products: ProductState }) => state.products.filters;
export const selectProductsPagination = (state: { products: ProductState }) => state.products.pagination;

// Export the reducer
export default productSlice.reducer;