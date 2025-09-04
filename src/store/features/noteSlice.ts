import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Note } from "@/lib/definitions";

interface NoteState {
  data: Note[];
  loading: boolean;
  error: string | null;
}

const initialState: NoteState = {
  data: [],
  loading: false,
  error: null,
};

const API_URL = "http://localhost:3001/notes";

// --- THUNKS ASSÍNCRONOS COM TIPAGEM E TRATAMENTO DE ERRO ---

export const fetchNotes = createAsyncThunk<Note[], string>(
  "notes/fetchNotes",
  async (customerId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3001/notes?customerId=${customerId}`
      );
      if (!response.ok) throw new Error("Erro ao buscar anotações.");
      return await response.json();
    } catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("Erro inesperado ao buscar anotações.");
    }
  }
);

export const addNote = createAsyncThunk<Note, Omit<Note, "id">>(
  "notes/addNote",
  async (newNote, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
      });
      if (!response.ok) throw new Error("Falha ao adicionar a anotação.");
      return await response.json();
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

export const updateNote = createAsyncThunk<Note, Note>(
  "notes/updateNote",
  async (note, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${note.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      });
      if (!response.ok) throw new Error("Falha ao atualizar a anotação.");
      return await response.json();
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

// --- O SLICE ---

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // Casos para fetchNotes
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action: PayloadAction<Note[]>) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Casos para addNote
      .addCase(addNote.fulfilled, (state, action: PayloadAction<Note>) => {
        state.data.push(action.payload);
      })
      .addCase(addNote.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Casos para updateNote
      .addCase(updateNote.fulfilled, (state, action: PayloadAction<Note>) => {
        const index = state.data.findIndex(
          (note) => note.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default noteSlice.reducer;
