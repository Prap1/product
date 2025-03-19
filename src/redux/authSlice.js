import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials) => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
          expiresInMins: 30,
        }),
        mode: 'cors',
        credentials: 'omit'
      });
      
      const data = await response.json();
      console.log('Login attempt with:', credentials.username);
      console.log('API Response:', data);
      
      if (!response.ok) {
        const errorMessage = data.message || 'Invalid credentials';
        console.error('Login failed:', errorMessage);
        throw new Error(errorMessage);
      }
      
      // Store specific user data instead of the entire response
      const userData = {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        token: data.token
      };
      
      localStorage.setItem('token', data.token);
      return userData; // Return structured user data
    } catch (error) {
      console.error('Login Error:', error);
      if (error.message === 'Failed to fetch') {
        throw new Error('Network error: Please check your internet connection');
      }
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: !!localStorage.getItem('token'),
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Invalid username or password';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;