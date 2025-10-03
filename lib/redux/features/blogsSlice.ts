import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "axios";

// Define the Blog type
export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  category: string;
  tags: string | string[];
  status: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  readTime: string;
  views: number;
  likes: number;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

// Define the API Blog type (from backend)
interface ApiBlog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author?: string;
  category: string;
  tags?: string[];
  status: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  readTime?: string;
  views?: number;
  likes?: number;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  blogImages?: string[];
}

// Define the state structure
interface BlogsState {
  data: Blog[];
  isLoading: boolean;
  error: string | null;
  selectedBlog: Blog | null;
  filters: {
    category: string;
    status: string;
    search: string;
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// Initial state
const initialState: BlogsState = {
  data: [],
  isLoading: false,
  error: null,
  selectedBlog: null,
  filters: {
    category: '',
    status: '',
    search: '',
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

// Create the slice
const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogsData: (state, action: PayloadAction<{ data: Blog[]; total: number }>) => {
      state.data = action.payload.data;
      state.pagination.total = action.payload.total;
      state.isLoading = false;
      state.error = null;
    },
    setBlogsLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setBlogsError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedBlog: (state, action: PayloadAction<Blog>) => {
      state.selectedBlog = action.payload;  
      state.isLoading = false;
      state.error = null;
    },
    setFilters: (state, action: PayloadAction<Partial<BlogsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1; // Reset to first page when filters change
    },
    setPagination: (state, action: PayloadAction<Partial<BlogsState['pagination']>>) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    clearSelectedBlog: (state) => {
      state.selectedBlog = null;
    },
  },
});

// Export actions
export const {
  setBlogsData,
  setBlogsLoading,
  setBlogsError,
  setSelectedBlog,
  setFilters,
  setPagination,
  clearSelectedBlog,
} = blogsSlice.actions;

// Helper function to map API blog to our Blog interface
const mapApiBlogToBlog = (apiBlog: ApiBlog): Blog => ({
  _id: apiBlog._id,
  title: apiBlog.title,
  slug: apiBlog.slug,
  excerpt: apiBlog.excerpt,
  content: apiBlog.content,
  featuredImage: apiBlog.featuredImage,
  author: apiBlog.author || 'Admin',
  category: apiBlog.category,
  tags: apiBlog.tags || [],
  status: apiBlog.status,
  publishedAt: apiBlog.publishedAt,
  createdAt: apiBlog.createdAt,
  updatedAt: apiBlog.updatedAt,
  readTime: apiBlog.readTime || '5 min read',
  views: apiBlog.views || 0,
  likes: apiBlog.likes || 0,
  metaTitle: apiBlog.metaTitle || apiBlog.title,
  metaDescription: apiBlog.metaDescription || apiBlog.excerpt,
  metaKeywords: apiBlog.metaKeywords || '',
  canonicalUrl: apiBlog.canonicalUrl || '',
  ogTitle: apiBlog.ogTitle || apiBlog.title,
  ogDescription: apiBlog.ogDescription || apiBlog.excerpt,
  ogImage: apiBlog.ogImage || apiBlog.featuredImage,
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

// Fetch blogs with filters and pagination
export const fetchBlogsData = () => async (dispatch: AppDispatch, getState: () => { blogs: BlogsState }) => {
  dispatch(setBlogsLoading());
  try {
    const { filters, pagination } = getState().blogs;
    const queryParams = new URLSearchParams();
    
    // Add pagination parameters
    queryParams.append('page', pagination.page.toString());
    queryParams.append('limit', pagination.limit.toString());

    // Add filter parameters if they exist and are not 'all'
    if (filters.category && filters.category !== 'all') {
      queryParams.append('category', filters.category);
    }
    if (filters.search) {
      queryParams.append('search', filters.search);
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/?${queryParams}`
    );

    if (response.data?.success) {
      // Map API response to our Blog interface
      const mappedBlogs = response.data.data.blogs.map((blog: ApiBlog) => mapApiBlogToBlog(blog));

      dispatch(setBlogsData({
        data: mappedBlogs,
        total: response.data.data.pagination.totalBlogs,
      }));
    } else {
      throw new Error(response.data?.message || "Failed to fetch blogs");
    }
    return true;
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setBlogsError(errorMessage));
    return false;
  }
};

export const fetchActiveBlogs = () => async (dispatch: AppDispatch, getState: () => { blogs: BlogsState }) => {
  dispatch(setBlogsLoading());
  try {
    const { filters, pagination } = getState().blogs;
    const queryParams = new URLSearchParams();
    
    // Add pagination parameters
    queryParams.append('page', pagination.page.toString());
    queryParams.append('limit', pagination.limit.toString());

    // Add filter parameters if they exist and are not 'all'
    if (filters.category && filters.category !== '') {
      queryParams.append('category', filters.category);
    }
    if (filters.search) {
      queryParams.append('search', filters.search);
    }

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/getActiveBlogs?${queryParams}`);
    if (response.data?.success) {
      // Map API response to our Blog interface
      const mappedBlogs = response.data.data.blogs.map((blog: ApiBlog) => mapApiBlogToBlog(blog));

      dispatch(setBlogsData({
        data: mappedBlogs,
        total: response.data.data.pagination.totalBlogs,
      }));
    } else {
      throw new Error(response.data?.message || "Failed to fetch blogs");
    }
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setBlogsError(errorMessage));
    return false;
  }
};


// Fetch blog by ID
export const fetchBlogById = (blogId: string) => async (dispatch: AppDispatch) => {
  dispatch(setBlogsLoading());
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/getBlogById/${blogId}`
    );
    if (response.data?.success) {
      const blog = response.data.data;
      const mappedBlog = {
        _id: blog._id,
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        content: blog.content,
        featuredImage: blog.featuredImage,
        author: blog.author || 'Admin',
        category: blog.category,
        tags: blog.tags || [],
        status: blog.status,
        publishedAt: blog.publishedAt,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
        readTime: blog.readTime || '5 min read',
        views: blog.views || 0,
        likes: blog.likes || 0,
        metaTitle: blog.metaTitle || blog.title,
        metaDescription: blog.metaDescription || blog.excerpt,
        metaKeywords: blog.metaKeywords || '',
        canonicalUrl: blog.canonicalUrl || '',
        ogTitle: blog.ogTitle || blog.title,
        ogDescription: blog.ogDescription || blog.excerpt,
        ogImage: blog.ogImage || blog.featuredImage,
      };
      dispatch(setSelectedBlog(mappedBlog));
      return true;
    } else {
      throw new Error(response.data?.message || "Failed to fetch blog");
    }
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setBlogsError(errorMessage));
    return false;
  }
};

// Fetch blog by slug
export const fetchBlogBySlug = (slug: string) => async (dispatch: AppDispatch) => {
  dispatch(setBlogsLoading());
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/getBlogBySlug/${slug}`
    );
    if (response.data?.success) {
      const blog = response.data.data;
      const mappedBlog = {
        _id: blog._id,
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        content: blog.content,
        featuredImage: blog.featuredImage,
        author: blog.author || 'Admin',
        category: blog.category,
        tags: blog.tags || [],
        status: blog.status,
        publishedAt: blog.publishedAt,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
        readTime: blog.readTime || '5 min read',
        views: blog.views || 0,
        likes: blog.likes || 0,
        metaTitle: blog.metaTitle || blog.title,
        metaDescription: blog.metaDescription || blog.excerpt,
        metaKeywords: blog.metaKeywords || '',
        canonicalUrl: blog.canonicalUrl || '',
        ogTitle: blog.ogTitle || blog.title,
        ogDescription: blog.ogDescription || blog.excerpt,
        ogImage: blog.ogImage || blog.featuredImage,
      };
      dispatch(setSelectedBlog(mappedBlog));
      return true;
    } else {
      throw new Error(response.data?.message || "Failed to fetch blog");
    }
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setBlogsError(errorMessage));
    return false;
  }
};

export const fetchLatestBlogs = () => async (dispatch: AppDispatch) => {
  dispatch(setBlogsLoading());
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/getLatestBlogs`
    );
    if (response.data?.success) {
      // Map API response to our Blog interface
      const mappedBlogs = response.data.data.blogs.map((blog: ApiBlog) => mapApiBlogToBlog(blog));

      dispatch(setBlogsData({
        data: mappedBlogs,
        total: response.data.data.pagination.totalBlogs,
      }));
    } else {
      throw new Error(response.data?.message || "Failed to fetch latest blogs");
    }
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setBlogsError(errorMessage));
    return false;
  }
};

// Add a new blog
export const createBlog = (newBlog: FormData) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/newBlog`,
      newBlog,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    if (response.data?.success) {
      dispatch(fetchBlogsData());
      return true;
    } else {
      const errorMessage = response.data?.message || "Failed to create blog";
      dispatch(setBlogsError(errorMessage));
      return false;
    }
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setBlogsError(errorMessage));
    return false;
  }
};

export const generateBlogs = (message: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/blogGenerate`, {
      message: message,
    });
    if (response.data?.success) {
      // Return the generated blog data in proper Redux fulfilled format
      return {
        type: 'blogs/generateBlogs/fulfilled',
        payload: response.data.reply, // Use .reply instead of .data based on your API response
      };
    } else {
      throw new Error(response.data?.message || "Failed to generate blogs");
    }
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setBlogsError(errorMessage));
    throw error;
  }
}

// update blog status
export const updateBlogStatus = (blogId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/updateBlogStatus/${blogId}`);
    if (response.data?.success) {
      dispatch(fetchBlogsData());
    } else {
      throw new Error(response.data?.message || "Failed to update blog status");
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    dispatch(setBlogsError(errorMessage));
  }
}

// Edit a blog
export const updateBlog = (blogId: string, updatedData: FormData) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/updateBlog/${blogId}`,
      updatedData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    if (response.data?.success) {
      dispatch(fetchBlogsData());
      return true;
    } else {
      throw new Error(response.data?.message || "Failed to update blog");
    }
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setBlogsError(errorMessage));
    return false;
  }
};

// Delete a blog
export const deleteBlog = (blogId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/deleteBlog/${blogId}`
    );
    if (response.data?.success) {
      dispatch(fetchBlogsData());
      return true;
    } else {
      throw new Error(response.data?.message || "Failed to delete blog");
    }
  } catch (error: unknown) {
    const errorMessage = handleApiError(error);
    dispatch(setBlogsError(errorMessage));
    return false;
  }
};

// Selectors
export const selectBlogsData = (state: { blogs: BlogsState }) => state.blogs.data;
export const selectBlogsLoading = (state: { blogs: BlogsState }) => state.blogs.isLoading;
export const selectBlogsError = (state: { blogs: BlogsState }) => state.blogs.error;
export const selectSelectedBlog = (state: { blogs: BlogsState }) => state.blogs.selectedBlog;
export const selectBlogsFilters = (state: { blogs: BlogsState }) => state.blogs.filters;
export const selectBlogsPagination = (state: { blogs: BlogsState }) => state.blogs.pagination;

// Export the reducer
export default blogsSlice.reducer;