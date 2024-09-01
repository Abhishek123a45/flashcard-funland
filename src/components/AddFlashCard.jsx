import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFlashcardAsync } from '../store/flashcardSlice';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusIcon } from "lucide-react";

const AddFlashCard = () => {
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const dispatch = useDispatch();
  const categories = useSelector(state => state.flashcards.categories);

  const handleAddCard = () => {
    if (newQuestion && newAnswer && selectedCategory) {
      dispatch(addFlashcardAsync({ 
        question: newQuestion, 
        answer: newAnswer, 
        categoryId: parseInt(selectedCategory)
      }));
      setNewQuestion('');
      setNewAnswer('');
      setSelectedCategory('');
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
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
