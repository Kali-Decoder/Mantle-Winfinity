"use client";

import { useState, useEffect } from "react";
import type { NextPage } from "next";
import GameCard from "~~/components/GameCard";
import { useUserBalance } from "~~/context/UserBalanceContext";

const Home: NextPage = () => {
 
  const [highlightedGameId, setHighlightedGameId] = useState<number | null>(null);
  const {yieldAmount} = useUserBalance();
  const games = [
    {
      title: "OnChain Snake",
      views: 12,
      imageUrl: "https://i.ytimg.com/vi/yHx8KdY81BE/maxresdefault.jpg",
      postedDate: "",
      price: "10",
      redirectUrl: "/snake-game",
      gameId: 1,
    },
    {
      title: "Onchain Flappy Bird",
      views: 5,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEviYDs5zwoHiLpW6hPWipmsULZaE9L7LJQ&s",
      postedDate: "5 days ago",
      price: "20",
      redirectUrl: "/flappy-bird",
      gameId: 2,
    },
    {
      title: "OnChain Pin The Needle",
      views: 10,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgQlFJZR2Ubl-c7KKykJRiIfUs7xhOiLgAfRxFIKMqlbUzx029NcFXWIis7tqYOf1-7-M&usqp=CAU",
      postedDate: "12 days ago",
      price: "30",
      redirectUrl: "/pin-needle",
      gameId: 3,
    },
    {
      title: "Onchain Pin Ball",
      views: 10,
      imageUrl:
        "https://quantfury.com/wp-content/uploads/2023/03/alien-pinball-machines-international-game-technology-nyse-igt.jpg",
      postedDate: "12 days ago",
      price: "40",
      redirectUrl: "https://52zpfdr9cbsk83axbikqr7pha90lcpubjs8zz5u0a525tb4q8v.walrus.site/",
      gameId: 4,
    },
  ];




  useEffect(() => {
    // Optional: Logic when highlightedGameId changes
  }, [highlightedGameId]);

  return (
    <div className="container mx-auto flex justify-center items-center py-10 dark:bg-base-100">
     

      <div className="w-full max-w-5xl">
        <h1 className="text-2xl uppercase font-bold mb-6 text-center text-blue-400 dark:text-neutral-content">Arcade Games {yieldAmount ? "   Yield Amount  " + yieldAmount : null}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-12 sm:mx-auto">
          {games.map((game, index) => (
            <GameCard
              key={index}
              title={game.title}
              views={game.views}
              imageUrl={game.imageUrl}
              postedDate={game.postedDate}
              price={game.price}
              redirectUrl={game.redirectUrl}
              isHighlighted={highlightedGameId == game.gameId} // Highlight the game if it matches the response
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
