import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch Products (paginated + category filter)
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page = 1, category = '' }) => {
    const limit = 10;
    const skip = (page - 1) * limit;
    const url = category 
      ? `https://dummyjson.com/products/category/${category}`
      : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  }
);

// Fetch Product Categories
export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const response = await fetch('https://dummyjson.com/products/categories');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json();
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    categories: [],
    loading: false,
    categoriesLoading: false,
    error: null,
    categoriesError: null,
    total: 0,
  },
  reducers: {
    clearProducts: (state) => {
      state.items = [];
      state.total = 0;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesLoading = true;
        state.categoriesError = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoriesLoading = false;
        state.categoriesError = action.error.message;
      });
  },
});

export const { clearProducts } = productsSlice.actions;
export default productsSlice.reducer;
