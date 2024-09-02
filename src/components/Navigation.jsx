import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">Flash Card App</Link>
        <div className="space-x-4">
          <Button asChild variant="ghost">
            <Link to="/" className="text-white">View Cards</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/add" className="text-white">Add Card</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/all" className="text-white">All Cards</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/categories" className="text-white">Manage Categories</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
