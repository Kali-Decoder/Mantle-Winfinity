"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface GameCardProps {
  title: string;
  views: number;
  imageUrl: string;
  postedDate: string;
  price: string;
  redirectUrl: string; // Add redirect URL as a prop
  isHighlighted: boolean; //
}

const GameCard: React.FC<GameCardProps> = ({
  title,
  views,
  imageUrl,
  postedDate,
  price,
  redirectUrl,
  isHighlighted,
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(redirectUrl); // Redirect to the specified URL
  };

  return (
    <div
      onClick={handleCardClick}
      className={`${
        isHighlighted ? "border-yellow-200" : "border-gray-200"
      } bg-white shadow-lg rounded-lg overflow-hidden border flex flex-col dark:bg-neutral dark:border-gray-700 mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg cursor-pointer hover:shadow-xl transition duration-200`}
    >
      <div className="relative">
        <img src={imageUrl} alt={title} className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover" />
        <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs sm:text-sm px-2 py-1 rounded">
          Amount : {price}
        </div>
        <div className="absolute top-2 right-2 text-white text-xs sm:text-sm px-2 py-1 bg-black/50 rounded">
          {views} players
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">{title}</h3>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">Enter {price} Dollars</button>
      </div>
    </div>
  );
};

export default GameCard;
