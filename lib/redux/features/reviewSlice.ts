import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "axios";

// Define the Review type
export interface Review {
    _id: string;
    name: string;
    email: string;
    rating: number;
    title: string;
    review: string;
    images: string[];
    status: "Pending" | "Approved" | "Rejected";
    createdAt: string;
    updatedAt: string;
}

// Define the API Review type (from backend)
interface ApiReview {
    _id: string;
    name: string;
    email: string;
    rating: number;
    title: string;
    review: string;
    images: string[];
    status: "Pending" | "Approved" | "Rejected";
    createdAt: string;
    updatedAt: string;
}

// Define the state structure
interface ReviewState {
    data: Review[];
    isLoading: boolean;
    error: string | null;
    selectedReview: Review | null;
    filters: {
        status: "Pending" | "Approved" | "Rejected" | "";
        name?: string;
    };
}

// Initial state
const initialState: ReviewState = {
    data: [],
    isLoading: false,
    error: null,
    selectedReview: null,
    filters: {
        status: "",
        name: '',
    },
};

// Create the slice
const reviewSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {
        setReviewData: (state, action: PayloadAction<Review[]>) => {
            state.data = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        setReviewLoading: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        setReviewError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        setSelectedReview: (state, action: PayloadAction<Review>) => {
            state.selectedReview = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        setFilters: (state, action: PayloadAction<Partial<ReviewState['filters']>>) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearSelectedReview: (state) => {
            state.selectedReview = null;
        },
    },
});

// Export actions
export const {
    setReviewData,
    setReviewLoading,
    setReviewError,
    setSelectedReview,
    setFilters,
    clearSelectedReview,
} = reviewSlice.actions;

// Helper function to map API review to our Review interface
const mapApiReviewToReview = (apiReview: ApiReview): Review => ({
    _id: apiReview._id,
    name: apiReview.name,
    email: apiReview.email,
    rating: apiReview.rating,
    title: apiReview.title,
    review: apiReview.review,
    images: apiReview.images,
    status: apiReview.status,
    createdAt: apiReview.createdAt,
    updatedAt: apiReview.updatedAt,
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

// Fetch reviews with filters
export const fetchReviewsData = () => async (dispatch: AppDispatch, getState: () => { reviews: ReviewState }) => {
    dispatch(setReviewLoading());
    try {
        const { filters } = getState().reviews;
        const queryParams = new URLSearchParams();

        // Add filter parameters if they exist
        if (filters.status) {
            queryParams.append('status', filters.status);
        }
        if (filters.name) {
            queryParams.append('name', filters.name);
        }

        const queryString = queryParams.toString();
        const url = queryString ?
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews?${queryString}` :
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews`;

        const response = await axios.get(url);

        if (response.data?.success && Array.isArray(response.data.data)) {
            const mappedReviews = response.data.data.map((review: ApiReview) => mapApiReviewToReview(review));
            dispatch(setReviewData(mappedReviews));
        } else {
            throw new Error(response.data?.message || "Failed to fetch reviews");
        }
        return true;
    } catch (error: unknown) {
        const errorMessage = handleApiError(error);
        dispatch(setReviewError(errorMessage));
        return false;
    }
};

// Fetch review by ID
export const fetchReviewById = (reviewId: string) => async (dispatch: AppDispatch) => {
    dispatch(setReviewLoading());
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/getReviewById/${reviewId}`
        );
        if (response.data?.success) {
            const review = response.data.data;
            const mappedReview = mapApiReviewToReview(review);
            dispatch(setSelectedReview(mappedReview));
            return true;
        } else {
            throw new Error(response.data?.message || "Failed to fetch review");
        }
    } catch (error: unknown) {
        const errorMessage = handleApiError(error);
        dispatch(setReviewError(errorMessage));
        return false;
    }
};

// Fetch latest reviews
export const fetchLatestReviews = () => async (dispatch: AppDispatch) => {
    dispatch(setReviewLoading());
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/getLatestReviews`
        );
        if (response.data?.success) {
            const mappedReviews = response.data.data.reviews.map((review: ApiReview) => mapApiReviewToReview(review));
            dispatch(setReviewData(mappedReviews));
        } else {
            throw new Error(response.data?.message || "Failed to fetch latest reviews");
        }
        return true;
    } catch (error: unknown) {
        const errorMessage = handleApiError(error);
        dispatch(setReviewError(errorMessage));
        return false;
    }
};

// Add a new review
export const createReview = (newReview: FormData) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/newReview`,
            newReview,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        if (response.data?.success) {
            dispatch(setReviewLoading());
            return true;
        } else {
            const errorMessage = response.data?.message || "Failed to create review";
            dispatch(setReviewError(errorMessage));
            return false;
        }
    } catch (error: unknown) {
        const errorMessage = handleApiError(error);
        dispatch(setReviewError(errorMessage));
        return false;
    }
};

// Update review status
export const updateReviewStatus = (reviewId: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/updateReviewStatus/${reviewId}`);
        if (response.data?.success) {
            dispatch(setReviewLoading());
            return true;
        } else {
            throw new Error(response.data?.message || "Failed to update review status");
        }
    } catch (error: unknown) {
        const errorMessage = handleApiError(error);
        dispatch(setReviewError(errorMessage));
    }
}

// Edit a review
export const updateReview = (reviewId: string, updatedData: FormData) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.put(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/updateReview/${reviewId}`,
            updatedData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        if (response.data?.success) {
            dispatch(setReviewLoading());
            return true;
        } else {
            throw new Error(response.data?.message || "Failed to update review");
        }
    } catch (error: unknown) {
        const errorMessage = handleApiError(error);
        dispatch(setReviewError(errorMessage));
        return false;
    }
};

// Delete a review
export const deleteReview = (reviewId: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/deleteReview/${reviewId}`
        );
        if (response.data?.success) {
            dispatch(setReviewLoading());
            return true;
        } else {
            throw new Error(response.data?.message || "Failed to delete review");
        }
    } catch (error: unknown) {
        const errorMessage = handleApiError(error);
        dispatch(setReviewError(errorMessage));
        return false;
    }
};

// Selectors
export const selectReviewsData = (state: { reviews: ReviewState }) => state.reviews.data;
export const selectReviewsLoading = (state: { reviews: ReviewState }) => state.reviews.isLoading;
export const selectReviewsError = (state: { reviews: ReviewState }) => state.reviews.error;
export const selectSelectedReview = (state: { reviews: ReviewState }) => state.reviews.selectedReview;
export const selectReviewsFilters = (state: { reviews: ReviewState }) => state.reviews.filters;

// Export the reducer
export default reviewSlice.reducer;