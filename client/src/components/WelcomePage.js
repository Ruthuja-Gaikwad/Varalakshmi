import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
// Ensure you're importing Tailwind CSS file

export default function WelcomePage() {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  // Handle the animation completion
  useEffect(() => {
    setTimeout(() => {
      setIsAnimationComplete(true);
    }, 4000); // Timing based on your animation duration
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500">
      <div className={`flex justify-center items-center ${isAnimationComplete ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
        <h1 className="text-5xl md:text-6xl text-white font-handwriting animate-letter-spacing">
          V
        </h1>
        <h1 className="text-5xl md:text-6xl text-white font-handwriting animate-letter-spacing delay-100">
          a
        </h1>
        <h1 className="text-5xl md:text-6xl text-white font-handwriting animate-letter-spacing delay-200">
          r
        </h1>
        <h1 className="text-5xl md:text-6xl text-white font-handwriting animate-letter-spacing delay-300">
          a
        </h1>
        <h1 className="text-5xl md:text-6xl text-white font-handwriting animate-letter-spacing delay-400">
          l
        </h1>
        <h1 className="text-5xl md:text-6xl text-white font-handwriting animate-letter-spacing delay-500">
          a
        </h1>
        <h1 className="text-5xl md:text-6xl text-white font-handwriting animate-letter-spacing delay-600">
          k
        </h1>
        <h1 className="text-5xl md:text-6xl text-white font-handwriting animate-letter-spacing delay-700">
          s
        </h1>
        <h1 className="text-5xl md:text-6xl text-white font-handwriting animate-letter-spacing delay-800">
          h
        </h1>
        <h1 className="text-5xl md:text-6xl text-white font-handwriting animate-letter-spacing delay-900">
          m
        </h1>
        <h1 className="text-5xl md:text-6xl text-white font-handwriting animate-letter-spacing delay-1000">
          i
        </h1>
      </div>
      {/* Button or Redirect to Home Page after Animation */}
      {isAnimationComplete && (
        <div className="absolute bottom-8 text-center w-full">
          <Link to="/home">
            <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-xl transition duration-300 transform hover:scale-105">
              Enter Shop
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
