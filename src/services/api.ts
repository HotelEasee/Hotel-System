import axios, { AxiosInstance, AxiosError } from 'axios';
import toast from 'react-hot-toast';

// ---------------------- CONFIG ----------------------
// Use environment variable for production; fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

if (!API_BASE_URL) {
  console.warn(
    'VITE_API_URL is not set. Frontend will fail to connect to backend in production.'
  );
}

// ---------------------- AXIOS INSTANCE ----------------------
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout for requests
});

// ---------------------- REQUEST INTERCEPTOR ----------------------
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ---------------------- RESPONSE INTERCEPTOR ----------------------
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    console.error('API Error:', {
      message: error.message,
      url: error.config?.url,
      method: error.config?.method,
      baseURL: error.config?.baseURL,
      status: error.response?.status,
      data: error.response?.data,
      request: error.request,
    });

    if (error.response) {
      const message =
        error.response.data?.message || error.response.data?.error || 'An error occurred';

      // 401 Unauthorized
      if (error.response.status === 401) {
        const errorCode = error.response.data?.code;
        localStorage.removeItem('token');

        if (errorCode === 'TOKEN_EXPIRED') {
          toast.error('Your session has expired. Please login again.');
        } else if (errorCode === 'INVALID_TOKEN') {
          toast.error('Invalid session. Please login again.');
        } else {
          toast.error(message || 'Please login to continue');
        }

        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
      }

      // 403 Forbidden
      else if (error.response.status === 403) {
        toast.error(message || 'Access forbidden');

        if (message.includes('authorized') || message.includes('login')) {
          localStorage.removeItem('token');
          setTimeout(() => {
            window.location.href = '/login';
          }, 1500);
        }
      }

      // Other HTTP errors
      else {
        toast.error(message);
      }
    } else if (error.request) {
      const baseURL = error.config?.baseURL || 'the server';
      toast.error(
        `Cannot connect to backend server. Please check:
1. Backend is running at ${baseURL}
2. Backend URL is correct in .env file
3. Check Render dashboard for backend status`,
        { duration: 6000 }
      );
    } else {
      toast.error('Unexpected error: ' + error.message);
    }

    return Promise.reject(error);
  }
);

// ---------------------- AUTH API ----------------------
export const authAPI = {
  register: async (data: {
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
  }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  updateProfile: async (data: {
    first_name?: string;
    last_name?: string;
    phone?: string;
    avatar_url?: string;
  }) => {
    const response = await api.put('/auth/profile', data);
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (token: string, password: string) => {
    const response = await api.post('/auth/reset-password', { token, password });
    return response.data;
  },
};

// ---------------------- HOTELS API ----------------------
export const hotelsAPI = {
  getAll: async (filters?: {
    page?: number;
    limit?: number;
    city?: string;
    country?: string;
    min_price?: number;
    max_price?: number;
    min_rating?: number;
    search?: string;
  }) => {
    const response = await api.get('/hotels', { params: filters });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/hotels/${id}`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/hotels', data);
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await api.put(`/hotels/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/hotels/${id}`);
    return response.data;
  },

  addImages: async (hotelId: string, images: string[]) => {
    const response = await api.post(`/hotels/${hotelId}/images`, { images });
    return response.data;
  },
};

// ---------------------- BOOKINGS API ----------------------
export const bookingsAPI = {
  create: async (data: any) => {
    const response = await api.post('/bookings', data);
    return response.data;
  },

  getMyBookings: async (filters?: { status?: string; page?: number; limit?: number }) => {
    const response = await api.get('/bookings/my-bookings', { params: filters });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  cancel: async (id: string, reason?: string) => {
    const response = await api.put(`/bookings/${id}/cancel`, { reason });
    return response.data;
  },

  createPaymentIntent: async (bookingId: string) => {
    const response = await api.post('/bookings/payment-intent', { bookingId });
    return response.data;
  },

  confirmPayment: async (paymentIntentId: string, bookingId: string) => {
    const response = await api.post('/bookings/confirm-payment', { paymentIntentId, bookingId });
    return response.data;
  },
};

// ---------------------- USER API ----------------------
export const userAPI = {
  addFavorite: async (hotelId: string) => {
    const response = await api.post('/users/favorites', { hotelId });
    return response.data;
  },

  removeFavorite: async (hotelId: string) => {
    const response = await api.delete(`/users/favorites/${hotelId}`);
    return response.data;
  },

  getFavorites: async (page?: number, limit?: number) => {
    const response = await api.get('/users/favorites', { params: { page, limit } });
    return response.data;
  },

  checkFavorite: async (hotelId: string) => {
    const response = await api.get(`/users/favorites/check/${hotelId}`);
    return response.data;
  },

  createReview: async (
    hotelId: string,
    data: { rating: number; title?: string; comment?: string; booking_id?: string }
  ) => {
    const response = await api.post(`/users/hotels/${hotelId}/reviews`, data);
    return response.data;
  },

  getHotelReviews: async (hotelId: string, page?: number, limit?: number) => {
    const response = await api.get(`/users/hotels/${hotelId}/reviews`, { params: { page, limit } });
    return response.data;
  },

  getNotifications: async (unreadOnly?: boolean, page?: number, limit?: number) => {
    const response = await api.get('/users/notifications', { params: { unreadOnly, page, limit } });
    return response.data;
  },

  markNotificationRead: async (id: string) => {
    const response = await api.put(`/users/notifications/${id}/read`);
    return response.data;
  },
};

// ---------------------- ADMIN API ----------------------
export const adminAPI = {
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },

  getAllUsers: async (page?: number, limit?: number) => {
    const response = await api.get('/admin/users', { params: { page, limit } });
    return response.data;
  },

  getAllHotels: async (filters?: { status?: string; page?: number; limit?: number }) => {
    const response = await api.get('/admin/hotels', { params: filters });
    return response.data;
  },

  updateHotel: async (id: string, data: any) => {
    const response = await api.put(`/admin/hotels/${id}`, data);
    return response.data;
  },

  deleteHotel: async (id: string) => {
    const response = await api.delete(`/admin/hotels/${id}`);
    return response.data;
  },

  getAllBookings: async (
    filters?: { status?: string; hotel_id?: string; user_id?: string; page?: number; limit?: number }
  ) => {
    const response = await api.get('/admin/bookings', { params: filters });
    return response.data;
  },

  updateBookingStatus: async (id: string, status: string, cancellation_reason?: string) => {
    const response = await api.put(`/admin/bookings/${id}/status`, { status, cancellation_reason });
    return response.data;
  },

  approveReview: async (id: string) => {
    const response = await api.put(`/admin/reviews/${id}/approve`);
    return response.data;
  },

  processRefund: async (bookingId: string, amount?: number, reason?: string) => {
    const response = await api.post(`/admin/refunds/${bookingId}`, { amount, reason });
    return response.data;
  },
};

// ---------------------- EXPORT DEFAULT ----------------------
export default api;
