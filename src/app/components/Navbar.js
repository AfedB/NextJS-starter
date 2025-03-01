// src/app/components/Navbar.js
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <header className="bg-gray-100 p-4">
      <nav className="container mx-auto flex items-center justify-between">
        {/* Logo/Brand */}
        <Link href="/" className="font-bold text-xl">
          My App
        </Link>

        {/* Mobile Navigation (Drawer Button) */}
        <div className="md:hidden">
          <button onClick={toggleDrawer} className="text-gray-700 hover:text-gray-900">
            {isDrawerOpen ? 'X' : '☰'} {/* Simple X for close, hamburger for open */}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/login" className="hover:underline">
            Login
          </Link>
          <Link href="/register" className="hover:underline">
            Register
          </Link>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <div
        className={`md:hidden fixed top-0 left-0 w-64 h-full bg-gray-100 p-4 z-50 transition-transform ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-end mb-4">
          <button onClick={toggleDrawer} className="text-gray-700 hover:text-gray-900">
            X {/* Simple X for close */}
          </button>
        </div>
        <ul className="flex flex-col gap-4">
          <li>
            <Link href="/" onClick={closeDrawer} className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={closeDrawer} className="hover:underline">
              About
            </Link>
          </li>
          <li>
            <Link href="/login" onClick={closeDrawer} className="hover:underline">
              Login
            </Link>
          </li>
          <li>
            <Link href="/register" onClick={closeDrawer} className="hover:underline">
              Register
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
