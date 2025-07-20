'use client';
import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MainNavbar() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const categories = [
    "Technology",
    "Art",
    "Music",
    "Design",
    "Publishing",
    "Education",
    "Health",
    "Gaming",
    "Environment",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    if (inputValue) {
      router.push(`/search?query=${inputValue}`);
    } else {
      router.push('/');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") return handleSearch();
  };

  function handleMouseEnter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowDropdown(true);
  }

  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  }

  const handleExploreCategory = (category: string) => {
    setIsOpen(false);
    setShowDropdown(false);
    router.push(`/explore-click?category=${category}`);
  };

  return (
    <nav role="navigation" className="w-full px-4 py-4 md:py-5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Logo + Mobile menu */}
        <div className="flex w-full md:w-auto items-center justify-between">
          <Link href="/">
            <Image src="/logo.png" alt="FundSpark Logo" width={120} height={50} priority />
          </Link>
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Search bar */}
        <div className="w-full md:w-1/3">
          <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="relative">
            <label htmlFor="project" className="sr-only">Search</label>
            <input
              type="text"
              id="project"
              placeholder="Search projects, creators, categories"
              className="w-full pl-4 pr-10 py-2 text-sm rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z" />
              </svg>
            </button>
          </form>
        </div>

        {/* Navigation links */}
        <div className={`w-full md:w-auto flex-col md:flex-row items-center gap-6 md:flex ${isOpen ? "flex mt-4" : "hidden md:flex"}`}>
          <div
            className="relative group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/explore" className="text-gray-700 hover:text-blue-500 font-medium">
              Explore
            </Link>

            {showDropdown && (
              <ul className="absolute mt-3 p-4 w-64 grid grid-cols-2 gap-3 z-40
                bg-white/30 backdrop-blur-md border border-white/20
                rounded-xl shadow-lg transition-all duration-300 animate-fade-in"
              >
                {categories.map((category) => (
                  <button key={category} onClick={() => handleExploreCategory(category)}>
                    <li className="text-sm text-gray-800 hover:text-blue-600 cursor-pointer">
                      {category}
                    </li>
                  </button>
                ))}
              </ul>
            )}
          </div>

          <Link href="/create" className="text-gray-700 hover:text-blue-500 font-medium">
            Start a Project
          </Link>

          {/* "How it works" is removed from MainNavbar */}

          <Link href="/login" className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 font-medium">
            Log In
          </Link>
        </div>
      </div>
    </nav>
  );
}
