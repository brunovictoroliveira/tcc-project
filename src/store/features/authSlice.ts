import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User, LoginData } from "@/lib/definitions";
import { login } from "@/lib/services/authService";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Thunk assíncrono para lidar com o processo de login
export const loginUser = createAsyncThunk<User, LoginData>(
  "auth/loginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const user = await login(loginData);
      return user;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Ocorreu um erro inesperado durante o login.");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  // Reducers síncronos: para ações que não precisam de chamadas de API
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
  // Reducers assíncronos: para lidar com os estados do createAsyncThunk
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload as string;
      });
  },
});

// Exporta a action síncrona de logout
export const { logout } = authSlice.actions;

// Exporta o reducer para ser usado na store
export default authSlice.reducer;
