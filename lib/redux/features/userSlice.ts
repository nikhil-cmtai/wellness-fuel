import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "axios";

// Define the User type
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role: "Admin" | "Doctor" | "Influencer" | "Customer";
  status: "Active" | "Inactive";
  dateOfBirth?: string;
  verified: boolean;
  address?: string;
  bio?: string;
  avatar?: string;
  
  // Doctor specific fields
  hospital?: string;
  experience?: number;
  consultationFee?: number;
  specialization?: string;
  location?: string;
  qualifications?: string;
  
  // Influencer specific fields
  platform?: string;
  followers?: number;
  category?: string;
  socialMediaLinks?: string;
  commissionRate?: number;
  availability?: string;
  note?: string;
  
  // Customer specific fields
  customerType?: string;
  
  // Common fields
  isActive: boolean;
  language?: string[];
  occupation?: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  age?: number;
  maritalStatus?: "Single" | "Married" | "Divorced" | "Widowed";
  twoFactorEnabled: boolean;
  
  createdAt: string;
  updatedAt: string;
}

// Define the API User type (from backend)
interface ApiUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role: "Admin" | "Doctor" | "Influencer" | "Customer";
  status: "Active" | "Inactive";
  dateOfBirth?: string;
  verified: boolean;
  address?: string;
  bio?: string;
  
  // Doctor specific fields
  hospital?: string;
  experience?: number;
  consultationFee?: number;
  specialization?: string;
  location?: string;
  qualifications?: string;
  
  // Influencer specific fields
  platform?: string;
  followers?: number;
  category?: string;
  socialMediaLinks?: string;
  commissionRate?: number;
  availability?: string;
  note?: string;
  
  // Customer specific fields
  customerType?: string;
  
  // Common fields
  isActive: boolean;
  language?: string[];
  occupation?: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  age?: number;
  maritalStatus?: "Single" | "Married" | "Divorced" | "Widowed";
  twoFactorEnabled: boolean;
  
  createdAt: string;
  updatedAt: string;
}

// Define the User state
interface UserState {
    data: User[];
  isLoading: boolean;
  error: string | null;
  selectedUser: User | null;
  filters: {
    status: string;
    role: string;
    search: string;
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// Initial state
const initialState: UserState = {
  data: [],
isLoading: false,
  error: null,
  selectedUser: null,
  filters: {
    status: "",
    role: "",
    search: "",
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

// Create the slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {   
    setUserData: (state, action: PayloadAction<{ data: User[]; total: number }>) => {
      state.data = action.payload.data;
      state.pagination.total = action.payload.total;
      state.isLoading = false;
      state.error = null;
    },
    setUserLoading: (state) => {
      state.isLoading = true;
      state.error = null;   
    },
    setUserError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setFilters: (state, action: PayloadAction<Partial<UserState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1; // Reset to first page when filters change
    },
    setPagination: (state, action: PayloadAction<Partial<UserState['pagination']>>) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
    updateUserInList: (state, action: PayloadAction<User>) => {
      const index = state.data.findIndex(user => user._id === action.payload._id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    removeUserFromList: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter(user => user._id !== action.payload);
      state.pagination.total = state.pagination.total - 1;
    },
  },
});

// Export actions
export const {
  setUserData,
  setUserLoading,
  setUserError,
  setSelectedUser,
  setFilters,
  setPagination,
  clearSelectedUser,
  updateUserInList,
  removeUserFromList,
} = userSlice.actions;

// Helper function to map API user to our User interface
const mapApiUserToUser = (apiUser: ApiUser): User => ({
  _id: apiUser._id,
  firstName: apiUser.firstName,
  lastName: apiUser.lastName,
  email: apiUser.email,
  password: apiUser.password,
  phone: apiUser.phone,
  role: apiUser.role,
  status: apiUser.status,
  dateOfBirth: apiUser.dateOfBirth,
  verified: apiUser.verified,
  address: apiUser.address,
  bio: apiUser.bio,
  
  // Doctor specific fields
  hospital: apiUser.hospital,
  experience: apiUser.experience,
  consultationFee: apiUser.consultationFee,
  specialization: apiUser.specialization,
  location: apiUser.location,
  qualifications: apiUser.qualifications,
  
  // Influencer specific fields
  platform: apiUser.platform,
  followers: apiUser.followers,
  category: apiUser.category,
  socialMediaLinks: apiUser.socialMediaLinks,
  commissionRate: apiUser.commissionRate,
  availability: apiUser.availability,
  note: apiUser.note,
  
  // Customer specific fields
  customerType: apiUser.customerType,
  
  // Common fields
  isActive: apiUser.isActive,
  language: apiUser.language || [],
  occupation: apiUser.occupation,
  bloodGroup: apiUser.bloodGroup,
  age: apiUser.age,
  maritalStatus: apiUser.maritalStatus,
  twoFactorEnabled: apiUser.twoFactorEnabled,
  
  createdAt: apiUser.createdAt,
  updatedAt: apiUser.updatedAt,
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

// Fetch users with filters and pagination
export const fetchUsersData = () => async (dispatch: AppDispatch, getState: () => { users: UserState }) => {
  dispatch(setUserLoading());
  try {
    const { filters, pagination } = getState().users;
    const queryParams = new URLSearchParams();
    
    // Add pagination parameters
    queryParams.append('page', pagination.page.toString());
    queryParams.append('limit', pagination.limit.toString());

    // Add filter parameters if they exist
    if (filters.status && filters.status !== 'All') {
      queryParams.append('status', filters.status);
    }
    if (filters.role && filters.role !== 'All') {
      queryParams.append('role', filters.role);
    }
    if (filters.search) {
      queryParams.append('search', filters.search);
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/?${queryParams}`
    );

    if (response.data?.success) {
      // Map API response to our User interface
      const mappedUsers = response.data.data.map((user: ApiUser) => mapApiUserToUser(user));

      dispatch(setUserData({
        data: mappedUsers,
        total: response.data.pagination.total,
      }));
    } else {
      throw new Error(response.data?.message || "Failed to fetch users");
    }
    return true;
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setUserError(errorMessage));
    return false;
  }
};

// Fetch active users
export const fetchActiveUsers = () => async (dispatch: AppDispatch, getState: () => { users: UserState }) => {
  dispatch(setUserLoading());
  try {
    const { filters, pagination } = getState().users;
    const queryParams = new URLSearchParams();
    
    // Add pagination parameters
    queryParams.append('page', pagination.page.toString());
    queryParams.append('limit', pagination.limit.toString());

    // Add filter parameters if they exist
    if (filters.status && filters.status !== '') {
      queryParams.append('status', filters.status);
    }
    if (filters.search) {
      queryParams.append('search', filters.search);
    }

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getActiveUsers?${queryParams}`);
    if (response.data?.success) {
      // Map API response to our User interface
      const mappedUsers = response.data.data.map((user: ApiUser) => mapApiUserToUser(user));

      dispatch(setUserData({
        data: mappedUsers,
        total: response.data.pagination.total,
      }));
    } else {
      throw new Error(response.data?.message || "Failed to fetch users");
    }
    return true;
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setUserError(errorMessage));
    return false;
  }
};

// Fetch user by ID
export const fetchUserById = (userId: string) => async (dispatch: AppDispatch) => {
  dispatch(setUserLoading());
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/getUserById/${userId}`
    );
    if (response.data?.success) {
      const user = response.data.data;
      const mappedUser = mapApiUserToUser(user);
      dispatch(setSelectedUser(mappedUser));
      return true;
    } else {
      throw new Error(response.data?.message || "Failed to fetch user");
    }
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setUserError(errorMessage));
    return false;
  }
};

// Add a new user
export const createUser = (newUser: Partial<User>) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/newUser`,
      newUser
    );
    if (response.data?.success) {
      dispatch(setUserLoading());
      return true;
    } else {
      const errorMessage = response.data?.message || "Failed to create user";
      dispatch(setUserError(errorMessage));
      return false;
    }
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setUserError(errorMessage));
    return false;
  }
};

// Update user status
export const updateUserStatus = (userId: string, status: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/updateUserStatus/${userId}`, {
      status
    });
    if (response.data?.success) {
      dispatch(setUserLoading());
      return true;
    } else {
      throw new Error(response.data?.message || "Failed to update user status");
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    dispatch(setUserError(errorMessage));
  }
};

// Update user role
export const updateUserRole = (userId: string, role: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/updateUserRole/${userId}`, {
      role
    });
    if (response.data?.success) {
      dispatch(setUserLoading());
      return true;
    } else {
      throw new Error(response.data?.message || "Failed to update user role");
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    dispatch(setUserError(errorMessage));
  }
};

// Edit a user
export const updateUser = (userId: string, updatedData: Partial<User>) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/updateUser/${userId}`,
      updatedData
    );
    if (response.data?.success) {
      if (response.data.data) {
        const mappedUser = mapApiUserToUser(response.data.data);
        dispatch(updateUserInList(mappedUser));
      }
      dispatch(setUserLoading());
      return true;
    } else {
      throw new Error(response.data?.message || "Failed to update user");
    }
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setUserError(errorMessage));
    return false;
  }
};

// Delete a user
export const deleteUser = (userId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/deleteUser/${userId}`
    );
    if (response.data?.success) {
      dispatch(removeUserFromList(userId));
      return true;
    } else {
      throw new Error(response.data?.message || "Failed to delete user");
    }
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setUserError(errorMessage));
    return false;
  }
};

// Selectors
export const selectUsersData = (state: { users: UserState }) => state.users.data;
export const selectUsersLoading = (state: { users: UserState }) => state.users.isLoading;
export const selectUsersError = (state: { users: UserState }) => state.users.error;
export const selectSelectedUser = (state: { users: UserState }) => state.users.selectedUser;
export const selectUsersFilters = (state: { users: UserState }) => state.users.filters;
export const selectUsersPagination = (state: { users: UserState }) => state.users.pagination;

// Export the reducer
export default userSlice.reducer;