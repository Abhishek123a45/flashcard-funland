import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFlashcard } from '../store/flashcardSlice';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";

const AddFlashCard = () => {
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const dispatch = useDispatch();

  const handleAddCard = () => {
    if (newQuestion && newAnswer) {
      dispatch(addFlashcard({ question: newQuestion, answer: newAnswer }));
      setNewQuestion('');
      setNewAnswer('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Flash Card</h1>
      
      <div className="mb-8">
        <div className="flex flex-col space-y-4 mb-4">
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
    </div>
  );
};

export default AddFlashCard;