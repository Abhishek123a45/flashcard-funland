import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeftIcon, ArrowRightIcon, RefreshCwIcon } from "lucide-react";
import { setCurrentCategory } from '../store/flashcardSlice';
import { useSpring, animated } from '@react-spring/web';
import Speech from 'react-speech';

const FlashCardView = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.flashcards.categories);
  const flashcards = useSelector(state => state.flashcards.flashcards);
  const currentCategory = useSelector(state => state.flashcards.currentCategory);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const speechRef = useRef(null);
 

  const filteredFlashcards = currentCategory
    ? flashcards.filter(card => card.categoryId === currentCategory)
    : flashcards;

  useEffect(() => {
    setCurrentCardIndex(0);
    setFlipped(false);
  }, [currentCategory]);

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % filteredFlashcards.length);
    setFlipped(false);
  };

  const handlePrevCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + filteredFlashcards.length) % filteredFlashcards.length);
    setFlipped(false);
  };

  const handleFlipCard = () => {
    setFlipped(state => !state);
    if (speechRef.current && flipped == false) {
      speechRef.current.play(); // Trigger the speech
    }
  };

  const handleCategoryChange = (categoryId) => {
    dispatch(setCurrentCategory(categoryId === 'all' ? null : parseInt(categoryId)));
  };

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

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
        <div className="mb-8">
          <div className="relative" style={{ height: '200px' }}>
            <animated.div
              className="absolute w-full h-full bg-white rounded-lg shadow-md p-6 flex items-center justify-center  max-md:font-semibold lg:font-extrabold max-sm:font-bold"
              style={{
                opacity: opacity.to(o => 1 - o),
                rotateX: '0deg',
                transform: 'perspective(600px) rotateX(0deg)',
                backgroundColor: 'red',
                
              }}
            >
              
              <p className=" mt-2 md:text-4xl max-sm:text-4xl lg:text-6xl">{filteredFlashcards[currentCardIndex].question}</p>
            </animated.div>
            <animated.div
              className="absolute w-0 h-full bg-white rounded-lg shadow-md p-6 flex items-center justify-center"
              style={{
                opacity,
                transform,
                rotateX: '180deg',
                backgroundColor: 'green',
                width: '100%',
              }}
            >
              
                <animated.p
                 className="answerText max-sm:text-4xl max-md:text-4xl text-6xl mt-2 flex items-center justify-center  w-full h-full font-extrabold"
                 style={{
                  transform,
                  rotateX: '180deg',
                  backgroundColor: 'green',
                  
                  
                }}
                >
                 

                  {filteredFlashcards[currentCardIndex].answer}
                 
                </animated.p>

                
             

            </animated.div>
            <Speech
                  ref={speechRef}
                  text={filteredFlashcards[currentCardIndex].answer}
                  voice="Google UK English Male"
                  rate="1"
                  pitch="3"
                  volume="2"
                  />
          </div>
          <div className="flex justify-center space-x-4 mt-4">
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
        </div>
      ) : (
        <p className="text-center text-lg">No flashcards available for this category.</p>
      )}
    </div>
  );
};

export default FlashCardView;