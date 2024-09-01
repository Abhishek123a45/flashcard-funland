import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/store';
import FlashCardView from './components/FlashCardView';
import AddFlashCard from './components/AddFlashCard';
import AllFlashCards from './components/AllFlashCards';
import Navigation from './components/Navigation';

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<FlashCardView />} />
            <Route path="/add" element={<AddFlashCard />} />
            <Route path="/all" element={<AllFlashCards />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
