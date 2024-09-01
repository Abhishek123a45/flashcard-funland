import React, { useEffect } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider, useDispatch } from 'react-redux';
import { store } from './store/store';
import { fetchCategories, fetchFlashcards } from './store/flashcardSlice';
import FlashCardView from './components/FlashCardView';
import AddFlashCard from './components/AddFlashCard';
import AllFlashCards from './components/AllFlashCards';
import CategoryManager from './components/CategoryManager';
import Navigation from './components/Navigation';

const queryClient = new QueryClient();

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchFlashcards());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<FlashCardView />} />
        <Route path="/add" element={<AddFlashCard />} />
        <Route path="/all" element={<AllFlashCards />} />
        <Route path="/categories" element={<CategoryManager />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
