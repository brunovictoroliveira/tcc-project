import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Customer } from "@/lib/definitions"; // Importando a interface que definimos

interface CustomerState {
  data: Customer[];
  loading: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchCustomers = createAsyncThunk<Customer[]>(
  "customers/fetchCustomers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/customers");

      if (!response.ok) {
        throw new Error("Não foi possível carregar a lista de clientes.");
      }

      const data: Customer[] = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(
        "Ocorreu um erro inesperado ao carregar os clientes."
      );
    }
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCustomers.fulfilled,
        (state, action: PayloadAction<Customer[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default customerSlice.reducer;
