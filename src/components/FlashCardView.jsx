import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeftIcon, ArrowRightIcon, RefreshCwIcon } from "lucide-react";
import { setCurrentCategory } from '../store/flashcardSlice';

const FlashCardView = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.flashcards.categories);
  const flashcards = useSelector(state => state.flashcards.flashcards);
  const currentCategory = useSelector(state => state.flashcards.currentCategory);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const filteredFlashcards = currentCategory
    ? flashcards.filter(card => card.categoryId === currentCategory)
    : flashcards;

  useEffect(() => {
    setCurrentCardIndex(0);
    setShowAnswer(false);
  }, [currentCategory]);

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % filteredFlashcards.length);
    setShowAnswer(false);
  };

  const handlePrevCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + filteredFlashcards.length) % filteredFlashcards.length);
    setShowAnswer(false);
  };

  const handleFlipCard = () => {
    setShowAnswer(!showAnswer);
  };

  const handleCategoryChange = (categoryId) => {
    dispatch(setCurrentCategory(categoryId === 'all' ? null : parseInt(categoryId)));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Flash Card View</h1>
      
      <div className="mb-4">
        <Select value={currentCategory?.toString()} onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {filteredFlashcards.length > 0 ? (
        <Card className="p-6 mb-8">
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold mb-2">
              {showAnswer ? 'Answer' : 'Question'}
            </h2>
            <p className="text-lg">
              {showAnswer
                ? filteredFlashcards[currentCardIndex].answer
                : filteredFlashcards[currentCardIndex].question}
            </p>
          </div>
          <div className="flex justify-center space-x-4">
            <Button onClick={handlePrevCard}>
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button onClick={handleFlipCard}>
              <RefreshCwIcon className="h-4 w-4 mr-2" />
              Flip
            </Button>
            <Button onClick={handleNextCard}>
              Next
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </Card>
      ) : (
        <p className="text-center text-lg">No flashcards available for this category.</p>
      )}
    </div>
  );
};

export default FlashCardView;
