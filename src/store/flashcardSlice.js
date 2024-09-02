import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as db from '../utils/db';

const initialState = {
  categories: [],
  flashcards: [],
  currentCategory: null,
  status: 'idle',
  error: null,
};

const fetchCategories = createAsyncThunk('flashcards/fetchCategories', async () => {
  return await db.getCategories();
});

const fetchFlashcards = createAsyncThunk('flashcards/fetchFlashcards', async () => {
  return await db.getFlashcards();
});

const addCategoryAsync = createAsyncThunk('flashcards/addCategory', async (category) => {
  const id = await db.addCategory(category);
  return { id, name: category };
});

const addFlashcardAsync = createAsyncThunk('flashcards/addFlashcard', async (flashcard) => {
  const id = await db.addFlashcard(flashcard);
  return { id, ...flashcard };
});

 const updateFlashcardAsync = createAsyncThunk('flashcards/updateFlashcard', async (flashcard) => {
  await db.updateFlashcard(flashcard);
  return flashcard;
});

const deleteFlashcardAsync = createAsyncThunk('flashcards/deleteFlashcard', async (id) => {
  await db.deleteFlashcard(id);
  return id;
});

export const flashcardSlice = createSlice({
  name: 'flashcards',
  initialState,
  reducers: {
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchFlashcards.fulfilled, (state, action) => {
        state.flashcards = action.payload;
      })
      .addCase(addCategoryAsync.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(addFlashcardAsync.fulfilled, (state, action) => {
        state.flashcards.push(action.payload);
      })
      .addCase(updateFlashcardAsync.fulfilled, (state, action) => {
        const index = state.flashcards.findIndex(card => card.id === action.payload.id);
        if (index !== -1) {
          state.flashcards[index] = action.payload;
        }
      })
      .addCase(deleteFlashcardAsync.fulfilled, (state, action) => {
        state.flashcards = state.flashcards.filter(card => card.id !== action.payload);
      });
  },
});

export const { setCurrentCategory } = flashcardSlice.actions;

export { addCategoryAsync, addFlashcardAsync, updateFlashcardAsync, deleteFlashcardAsync, fetchCategories, fetchFlashcards };

export default flashcardSlice.reducer;
