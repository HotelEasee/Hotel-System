import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Hotel {
  id: string;
  name: string;
  description: string;
  location: string;
  price: number;
  rating: number;
  images: string[];
  amenities: string[];
  rooms: number;
  availableRooms: number;
}

interface HotelState {
  hotels: Hotel[];
  selectedHotel: Hotel | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  filters: {
    minPrice: number;
    maxPrice: number;
    rating: number;
    amenities: string[];
  };
}

const initialState: HotelState = {
  hotels: [],
  selectedHotel: null,
  loading: false,
  error: null,
  searchQuery: '',
  filters: {
    minPrice: 0,
    maxPrice: 1000,
    rating: 0,
    amenities: [],
  },
};

const hotelSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    setHotels: (state, action: PayloadAction<Hotel[]>) => {
      state.hotels = action.payload;
    },
    setSelectedHotel: (state, action: PayloadAction<Hotel>) => {
      state.selectedHotel = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<HotelState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setHotels,
  setSelectedHotel,
  setLoading,
  setError,
  setSearchQuery,
  setFilters,
  clearError,
} = hotelSlice.actions;
export default hotelSlice.reducer;