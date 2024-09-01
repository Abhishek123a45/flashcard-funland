import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { PlusIcon, ArrowLeftIcon, ArrowRightIcon, RefreshCwIcon } from "lucide-react";

const FlashCardApp = () => {
  const [flashcards, setFlashcards] = useState([
    { id: 1, question: "What is React?", answer: "A JavaScript library for building user interfaces" },
    { id: 2, question: "What is JSX?", answer: "A syntax extension for JavaScript used with React" },
  ]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

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

  const handleAddCard = () => {
    if (newQuestion && newAnswer) {
      setFlashcards([...flashcards, { id: Date.now(), question: newQuestion, answer: newAnswer }]);
      setNewQuestion('');
      setNewAnswer('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Flash Card App</h1>
      
      <div className="mb-8">
        <Card className="p-6">
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
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add New Card</h2>
        <div className="flex space-x-4 mb-4">
          <Input
            placeholder="Question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <Input
            placeholder="Answer"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
        </div>
        <Button onClick={handleAddCard}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Card
        </Button>
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">All Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {flashcards.map((card) => (
            <Card key={card.id} className="p-4">
              <h3 className="font-semibold mb-2">{card.question}</h3>
              <p className="text-gray-600">{card.answer}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlashCardApp;