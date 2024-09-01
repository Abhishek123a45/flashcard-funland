import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [
    { id: 1, name: 'Default' },
  ],
  flashcards: [
    { id: 1, question: "What is React?", answer: "A JavaScript library for building user interfaces", categoryId: 1 },
    { id: 2, question: "What is JSX?", answer: "A syntax extension for JavaScript used with React", categoryId: 1 },
  ],
  currentCategory: null,
};

export const flashcardSlice = createSlice({
  name: 'flashcards',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push({
        id: Date.now(),
        name: action.payload,
      });
    },
    addFlashcard: (state, action) => {
      state.flashcards.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    updateFlashcard: (state, action) => {
      const index = state.flashcards.findIndex(card => card.id === action.payload.id);
      if (index !== -1) {
        state.flashcards[index] = action.payload;
      }
    },
    deleteFlashcard: (state, action) => {
      state.flashcards = state.flashcards.filter(card => card.id !== action.payload);
    },
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },
});

export const { addCategory, addFlashcard, updateFlashcard, deleteFlashcard, setCurrentCategory } = flashcardSlice.actions;

export default flashcardSlice.reducer;
