import React, { useState } from "react";
import { connect } from "starknetkit";

const WalletConnectButton: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      const connection = await connect({ webWalletUrl: "https://web.argent.xyz" });

      if (connection && connection.isConnected) {
        setIsConnected(true);
        setWalletAddress(connection.selectedAddress);
        console.log("Connected to wallet:", connection.selectedAddress);
      } else {
        console.log("Failed to connect wallet.");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <button
      onClick={connectWallet}
      className={`px-4 py-2 rounded-md text-white font-medium ${
        isConnected ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
      }`}
    >
      {isConnected
        ? `Connected: ${walletAddress?.slice(0, 6)}...${walletAddress?.slice(-4)}`
        : "Connect Wallet"}
    </button>
  );
};

export default WalletConnectButton;
