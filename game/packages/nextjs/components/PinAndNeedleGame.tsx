/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useUserBalance } from "~~/context/UserBalanceContext";

/* eslint-disable react/no-unescaped-entities */

// Game constants
const CIRCLE_RADIUS = 100; // radius of the main circle
const PIN_LENGTH = 40; // length of each pin line
const MIN_ANGLE_DIFF = 15; // minimum angle difference to avoid collisions
const ROTATION_SPEED = 1; // degrees per frame
const COST_TO_PLAY = 5; // cost to play the game

type PinData = {
  angle: number; // absolute angle at which the pin is placed
};

const PinAndNeedleGame: React.FC = () => {
  const { deposit, stake, setDeposit } = useUserBalance();
  const total = deposit + stake;

  const [pinTarget, setPinTarget] = useState(0); // random target between 15 and 30
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [pins, setPins] = useState<PinData[]>([]);
  const [score, setScore] = useState(0);
  const [gameResult, setGameResult] = useState<"win" | "lose" | null>(null);

  // Modals
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [confirmPlayModalOpen, setConfirmPlayModalOpen] = useState(false);

  // Rotation management
  const rotationRef = useRef<HTMLDivElement>(null);
  const requestIdRef = useRef<number>();
  const rotationAngle = useRef(0);

  // Helper function to normalize angles between 0 and 360
  const normalizeAngle = (angle: number) => {
    return ((angle % 360) + 360) % 360;
  };

  // Animation function
  const animate = () => {
    try {
      rotationAngle.current = (rotationAngle.current + ROTATION_SPEED) % 360;
      if (rotationRef.current) {
        rotationRef.current.style.transform = `rotate(${rotationAngle.current}deg)`;
      }
      requestIdRef.current = requestAnimationFrame(animate);
    } catch (error) {
      console.error("Error during animation:", error);
      stopAnimation();
      toast.error("An animation error occurred.");
    }
  };

  // Start the rotation animation
  const startAnimation = () => {
    requestIdRef.current = requestAnimationFrame(animate);
  };

  // Stop the rotation animation
  const stopAnimation = () => {
    if (requestIdRef.current) {
      cancelAnimationFrame(requestIdRef.current);
    }
  };

  // Handle pressing space to place a pin
  const handleKeyUp = (e: KeyboardEvent) => {
    if (gameState === "playing" && e.code === "Space") {
      placePin();
    }
  };

  // Place a pin at the current rotation angle
  const placePin = () => {
    try {
      const pinAngle = normalizeAngle(rotationAngle.current);

      // Check collision with existing pins
      for (const p of pins) {
        const diff = Math.abs(p.angle - pinAngle);
        const angleDifference = diff > 180 ? 360 - diff : diff;
        if (angleDifference < MIN_ANGLE_DIFF) {
          handleGameOver(false);
          return;
        }
      }

      // Place the pin
      const newPin: PinData = { angle: pinAngle };
      setPins(prevPins => [...prevPins, newPin]);
      setScore(prevScore => prevScore + 1);

      // Check if target reached
      if (pins.length + 1 >= pinTarget) {
        handleGameOver(true);
      }
    } catch (error) {
      console.error("Error while placing a pin:", error);
      toast.error("An error occurred while placing the pin.");
    }
  };

  // Handle game over
  const handleGameOver = (won: boolean) => {
    setGameState("gameover");
    setGameResult(won ? "win" : "lose");
    stopAnimation();
  };

  // Start the game
  const startGame = () => {
    try {
      if (deposit >= COST_TO_PLAY) {
        setDeposit(deposit - COST_TO_PLAY);
        // Reset states
        setPins([]);
        setScore(0);
        setGameResult(null);
        setGameState("playing");

        // Set random target between 15 and 30
        const randomTarget = Math.floor(Math.random() * 16) + 15;
        setPinTarget(randomTarget);

        // Start rotation
        startAnimation();
      } else {
        toast.error("Not enough deposit to play.");
      }
    } catch (error) {
      console.error("Error starting the game:", error);
      toast.error("An error occurred while starting the game.");
    }
  };

  // Handle tapping/clicking for mobile or desktop
  const handleGameClick = () => {
    if (gameState === "playing") {
      placePin();
    }
  };

  // User chooses deposit amount
  const handleSelectAmount = (amount: number) => {
    try {
      setDeposit(deposit + amount);
      setDepositModalOpen(false);
      setConfirmPlayModalOpen(true);
    } catch (error) {
      console.error("Error selecting deposit amount:", error);
      toast.error("An error occurred while selecting the deposit amount.");
    }
  };

  // Confirm play
  const handleConfirmPlay = () => {
    startGame();
    setConfirmPlayModalOpen(false);
  };

  // Cancel play
  const handleCancelPlay = () => {
    setConfirmPlayModalOpen(false);
  };

  // Play again after game over
  const handlePlayAgain = () => {
    try {
      setGameState("idle");
      setGameResult(null);
      setConfirmPlayModalOpen(true);
    } catch (error) {
      console.error("Error resetting the game:", error);
      toast.error("An error occurred while restarting the game.");
    }
  };

  // Effects
  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameState, pins]);

  useEffect(() => {
    // If no funds, show deposit modal
    if (deposit === 0 && stake === 0) {
      setDepositModalOpen(true);
    } else {
      setDepositModalOpen(false);
    }
  }, [deposit, stake]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      stopAnimation();
    };
  }, []);

  // Inner Modal Component
  const Modal: React.FC<{
    title: string;
    isOpen: boolean;
    children: React.ReactNode;
    onClose?: () => void;
  }> = ({ title, isOpen, children, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
        <div className="bg-neutral p-6 rounded-lg shadow-lg max-w-sm w-full text-neutral-content">
          <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
          {children}
          {onClose && (
            <button onClick={onClose} className="mt-4 btn btn-secondary w-full">
              Close
            </button>
          )}
        </div>
      </div>
    );
  };

  // Inner Pin Component
  const PinComponent: React.FC<{ angle: number }> = ({ angle }) => {
    const normalizedAngle = normalizeAngle(angle);
    const angleRad = (normalizedAngle * Math.PI) / 180;
    const pinX = Math.sin(angleRad) * CIRCLE_RADIUS;
    const pinY = -Math.cos(angleRad) * CIRCLE_RADIUS;

    return (
      <>
        {/* Pin line */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 2,
            height: PIN_LENGTH,
            backgroundColor: "white",
            transform: `translate(${pinX}px, ${pinY}px) rotate(${normalizedAngle}deg)`,
            transformOrigin: "bottom center",
          }}
        ></div>

        {/* Pin head */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "white",
            transform: `translate(${
              pinX + Math.sin(angleRad) * PIN_LENGTH
            }px, ${pinY + Math.cos(angleRad) * PIN_LENGTH}px)`,
          }}
        ></div>
      </>
    );
  };

  return (
    <div
      data-theme="dark"
      className="flex h-screen overflow-hidden flex-col items-center justify-center p-4"
      style={{ background: "linear-gradient(to bottom, #16161a, #1e1e1e)" }}
    >
      {/* Game Title */}
      <h1 className="text-4xl font-bold mb-4 text-center text-primary drop-shadow-lg">Pin & Needle</h1>

      {/* Game Info */}
      <div className="mb-4 flex gap-6 text-center">
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-300">Deposit</span>
          <span className="text-lg font-semibold text-success">{deposit} USD</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-300">Stake</span>
          <span className="text-lg font-semibold text-accent">{stake} USD</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-300">Score</span>
          <span className="text-lg font-semibold text-info">{score}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-300">Target</span>
          <span className="text-lg font-semibold text-warning">{pinTarget > 0 ? pinTarget : "?"}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-300">Total Funds</span>
          <span className="text-lg font-semibold text-yellow-300">{total} USD</span>
        </div>
      </div>

      {/* Game Board */}
      <div
        onClick={handleGameClick}
        className="relative rounded-md flex items-center justify-center"
        style={{
          width: 300,
          height: 300,
          border: "4px solid #4ade80",
          overflow: "hidden",
          cursor: gameState === "playing" ? "pointer" : "default",
          position: "relative",
          background: "linear-gradient(to bottom, #2a2a2a, #1f1f1f)",
        }}
      >
        {/* Rotating Container */}
        <div
          ref={rotationRef}
          className="rotating-container"
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            transition: "transform 0.016s linear", // roughly 60fps
          }}
        >
          {/* Central Circle */}
          <div
            style={{
              position: "relative",
              left: "50%",
              top: "50%",
              width: CIRCLE_RADIUS * 2,
              height: CIRCLE_RADIUS * 2,
              marginLeft: -CIRCLE_RADIUS,
              marginTop: -CIRCLE_RADIUS,
              borderRadius: "50%",
              backgroundColor: "#000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: "1.2rem",
              }}
            >
              {pinTarget > 0 ? pinTarget - pins.length : ""}
            </span>
          </div>

          {/* Pins */}
          {pins.map((pin, index) => (
            <PinComponent key={index} angle={pin.angle} />
          ))}
        </div>

        {/* Instructions Overlay */}
        {gameState === "playing" && pins.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-neutral-content text-center px-4">
            <h2 className="text-2xl font-bold mb-2">Get Ready!</h2>
            <p className="mb-2">
              Press <span className="font-bold">SPACE</span> or Tap to shoot pins
            </p>
            <p className="text-sm text-gray-300">Place all pins without collisions to win!</p>
          </div>
        )}
      </div>

      {/* Deposit Modal: Choose Deposit */}
      <Modal title="Choose Deposit Amount" isOpen={depositModalOpen}>
        <p className="text-center mb-4">Select an amount to deposit:</p>
        <div className="flex flex-col gap-2">
          <button onClick={() => handleSelectAmount(100)} className="btn btn-primary w-full">
            $100
          </button>
          <button onClick={() => handleSelectAmount(500)} className="btn btn-primary w-full">
            $500
          </button>
          <button onClick={() => handleSelectAmount(1000)} className="btn btn-primary w-full">
            $1000
          </button>
        </div>
      </Modal>

      {/* Confirm Play Modal: Pay to Start */}
      <Modal title="Ready to Play?" isOpen={confirmPlayModalOpen}>
        <p className="text-center mb-4">
          Pay <span className="font-bold">{COST_TO_PLAY} USD</span> from your deposit to start.
        </p>
        <div className="flex justify-center gap-4">
          <button onClick={handleConfirmPlay} className="btn btn-success px-4 py-2 rounded-lg">
            Confirm
          </button>
          <button onClick={handleCancelPlay} className="btn btn-secondary px-4 py-2 rounded-lg">
            Cancel
          </button>
        </div>
      </Modal>

      {/* Game Over Modal */}
      <Modal
        title={gameResult === "win" ? "You Win!" : "Game Over"}
        isOpen={gameState === "gameover"}
        onClose={handlePlayAgain}
      >
        <p className="text-center mb-4">
          Your final score: {score}/{pinTarget}
        </p>
        <div className="flex flex-col items-center gap-4">
          <button onClick={handlePlayAgain} className="btn btn-primary px-4 py-2 rounded-lg w-full">
            Play Again
          </button>
        </div>
      </Modal>

      {/* Play Button */}
      {gameState === "idle" && deposit >= COST_TO_PLAY && (
        <button
          onClick={() => setConfirmPlayModalOpen(true)}
          className="btn btn-accent px-4 py-2 rounded-lg w-1/2 mt-7 shadow-md"
        >
          Play
        </button>
      )}
    </div>
  );
};

export default PinAndNeedleGame;
