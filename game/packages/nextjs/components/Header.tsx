"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// For burger and close icons
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useUserBalance } from "~~/context/UserBalanceContext";

export const Header = () => {
  const { deposit, stakeAmount, setDeposit, setStake,unstake } = useUserBalance();
  
  const total = deposit;

  // State for burger menu
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // State for add money dropdown
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [withdrawDropdown, setWithdrawDropdown] = useState(false);

  const handleAddMoney = async (amount: number) => {
    await stakeAmount(amount);
    setDeposit(prevDeposit => prevDeposit + amount);
    setStake(prevStake => prevStake + amount);
    setShowAddDropdown(false);
  };

  const handleWithdrawMoney = async (amount: number) => {
    await unstake(amount);
    setDeposit(prevDeposit => prevDeposit + amount);
    setStake(prevStake => prevStake + amount);
    setWithdrawDropdown(false);
  };

  const pathname = usePathname();
  const isGamePage = ["snake-game", "flappy-bird", "pin-needle", "pinball"].some(game => pathname.includes(game));

  // Define navigation items
  const navItems = [
    { name: "Snake Game", href: "/snake-game" },
    { name: "Flappy Bird Game", href: "/flappy-bird" },
    { name: "Pin Needle Game", href: "/pin-needle" },
    { name: "Pinball Game", href: "https://52zpfdr9cbsk83axbikqr7pha90lcpubjs8zz5u0a525tb4q8v.walrus.site" },
  ];

  // Define all navigation items including "Home" for mobile menu
  const allNavItems = [{ name: "Home", href: "/" }, ...navItems];

  return (
    <header className="sticky top-0 z-50 bg-base-100 dark:bg-neutral shadow-md">
      <nav className="navbar px-4 sm:px-6 lg:px-8">
        {/* Navbar Start: Logo and Mobile Burger Menu */}
        <div className="navbar-start flex items-center">
          {/* Mobile Dropdown Menu */}
          <div className="lg:hidden relative">
            <button
              type="button"
              className="btn btn-ghost p-2"
              onClick={() => setIsDrawerOpen(prev => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={isDrawerOpen}
              aria-controls="mobile-menu"
            >
              {isDrawerOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>

            {/* Mobile Menu Dropdown */}
            {isDrawerOpen && (
              <ul
                id="mobile-menu"
                className="menu menu-compact dropdown-content mt-2 p-2 shadow bg-base-100 rounded-box w-52 dark:bg-neutral dark:text-base-content absolute left-0 top-full z-50"
              >
                {allNavItems.map(item => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="block px-4 py-2 hover:bg-secondary rounded"
                      onClick={() => setIsDrawerOpen(false)} // Close menu on link click
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Logo */}
          <div className="ml-2">
            <Link
              href="/"
              className=" mt-3 w-40 text-xl font-bold font-sans uppercase hidden sm:block"
            >
              WINFINITY
            </Link>
          </div>
        </div>

        {/* Navbar Center: Conditionally show Add button on specific game pages (only on small screens) */}
        <div className="navbar-center flex ">
          {isGamePage && (
            <div className="flex items-center mx-1 bg-gray-800 text-white px-2 py-1 rounded-md gap-2 relative">
              <span className="text-sm font-bold mx-1">${total.toFixed(2)}</span>
              <button
                onClick={() => setShowAddDropdown(prev => !prev)}
                className="btn btn-sm btn-primary"
                aria-haspopup="true"
                aria-expanded={showAddDropdown}
                aria-label="Add money"
              >
                Add
              </button>
              <button
                onClick={() => setWithdrawDropdown(prev => !prev)}
                className="btn-sm bg-yellow-200 text-black font-bold rounded-lg"
                aria-haspopup="true"
                aria-expanded={withdrawDropdown}
                aria-label="Add money"
              >
                Withdraw
              </button>

              {showAddDropdown && (
                <div className="absolute top-full left-0 mt-2 bg-gray-700 text-white p-4 rounded-md shadow-lg z-50">
                  <p className="mb-2 text-sm font-semibold">Add money</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddMoney(10)}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded"
                    >
                      +$10
                    </button>
                    <button
                      onClick={() => handleAddMoney(15)}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded"
                    >
                      +$15
                    </button>
                    <button
                      onClick={() => handleAddMoney(20)}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded"
                    >
                      +$20
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navbar End: Connect and Faucet Buttons */}
        <div className="navbar-end flex items-center space-x-2">
          <RainbowKitCustomConnectButton />
          <FaucetButton />
        </div>
      </nav>
    </header>
  );
};
