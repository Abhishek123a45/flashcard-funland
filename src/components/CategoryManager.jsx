import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCategoryAsync } from '../store/flashcardSlice';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const CategoryManager = () => {
  const [newCategory, setNewCategory] = useState('');
  const categories = useSelector(state => state.flashcards.categories);
  const dispatch = useDispatch();

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      dispatch(addCategoryAsync(newCategory.trim()));
      setNewCategory('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>
      <div className="flex space-x-2 mb-4">
        <Input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name"
        />
        <Button onClick={handleAddCategory}>Add Category</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(category => (
          <Card key={category.id} className="p-4">
            <h3 className="font-semibold">{category.name}</h3>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;
