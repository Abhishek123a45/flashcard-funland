import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from "@/components/ui/card";

const AllFlashCards = () => {
  const flashcards = useSelector(state => state.flashcards.flashcards);
  const categories = useSelector(state => state.flashcards.categories);

  const groupedFlashcards = categories.map(category => ({
    ...category,
    cards: flashcards.filter(card => card.categoryId === category.id)
  }));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">All Flash Cards</h1>
      
      {groupedFlashcards.map(category => (
        <div key={category.id} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{category.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.cards.map((card) => (
              <Card key={card.id} className="p-4">
                <h3 className="font-semibold mb-2">{card.question}</h3>
                <p className="text-gray-600">{card.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllFlashCards;
