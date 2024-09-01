import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeftIcon, ArrowRightIcon, RefreshCwIcon } from "lucide-react";

const FlashCardView = () => {
  const flashcards = useSelector(state => state.flashcards.flashcards);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setShowAnswer(false);
  };

  const handlePrevCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    setShowAnswer(false);
  };

  const handleFlipCard = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Flash Card View</h1>
      
      <Card className="p-6 mb-8">
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold mb-2">
            {showAnswer ? 'Answer' : 'Question'}
          </h2>
          <p className="text-lg">
            {showAnswer
              ? flashcards[currentCardIndex].answer
              : flashcards[currentCardIndex].question}
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
    </div>
  );
};

export default FlashCardView;