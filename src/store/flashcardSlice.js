import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  flashcards: [
    { id: 1, question: "What is React?", answer: "A JavaScript library for building user interfaces" },
    { id: 2, question: "What is JSX?", answer: "A syntax extension for JavaScript used with React" },
  ],
};

export const flashcardSlice = createSlice({
  name: 'flashcards',
  initialState,
  reducers: {
    addFlashcard: (state, action) => {
      state.flashcards.push({
        id: Date.now(),
        ...action.payload
      });
    },
  },
});

export const { addFlashcard } = flashcardSlice.actions;

export default flashcardSlice.reducer;