import { useState, useEffect } from "react";

export const LikeButton = ({ isLiked, onLikeChange }) => {
  const [animating, setAnimating] = useState(false);

  const handleClick = () => {
    setAnimating(true);
    onLikeChange();
  };

  useEffect(() => {
    if (animating) {
      const timer = setTimeout(() => setAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [animating]);

  return (
    <button
      onClick={handleClick}
      aria-label="Toggle Like"
      className="focus:outline-none mt-1 mr-2 hover:cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={`
          w-9 h-9
          transition-colors duration-300 ease-in-out
          ${!!isLiked ? "fill-red-500 text-red-600" : "fill-transparent text-gray-400"}
          transform transition-transform duration-300 ease-in-out
          ${animating ? "scale-125" : "scale-100"}
        `}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </button>
  );
};
