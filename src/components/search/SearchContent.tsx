"use client";

import { useState, useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import axiosService from "@/services/api";
import SuccessButton from "../button/SuccessButton";
import CreatePostModal from "../modal/CreatePostModal";
import { PostCategory } from "@/types/category";

interface SearchContentProps {
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: PostCategory | null) => void;
}

const SearchContent = ({
  onSearchChange,
  onCategoryChange,
}: SearchContentProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<PostCategory | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const formatCategory = (category: PostCategory): string => {
    return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(e.target.value);
    onSearchChange(newQuery);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleCategorySelect = (category: PostCategory) => {
    setSelectedCategory(category);
    onCategoryChange(category);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node) &&
        isSearchOpen
      ) {
        setIsSearchOpen(false);
      }

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const SearchIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-neutral-500"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );

  const ChevronIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`ml-1 transition-transform duration-200 ${
        isDropdownOpen ? "rotate-180" : ""
      }`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );

  const handleCreateClick = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/account");
      setIsLoading(false);
      return;
    }

    try {
      await axiosService.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching profile:", error);
      localStorage.removeItem("token");
      router.push("/account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-16 w-full items-center justify-between">
      <div
        ref={searchContainerRef}
        className="relative flex w-full max-w-screen-sm items-center"
      >
        {!isSearchOpen && (
          <button
            onClick={toggleSearch}
            className="md:hidden"
            aria-label="Toggle search"
          >
            <SearchIcon />
          </button>
        )}

        <div
          className={`
            absolute left-0 right-0 flex h-10 items-center
            transition-all duration-300 ease-out
            md:relative md:flex md:w-full
            ${
              isSearchOpen
                ? "scale-x-100 opacity-100"
                : "scale-x-0 opacity-0 md:scale-x-100 md:opacity-100"
            }
            origin-left
          `}
        >
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              {isSearchOpen ? (
                <button onClick={toggleSearch} className="md:hidden">
                  <SearchIcon />
                </button>
              ) : (
                <div className="hidden md:block">
                  <SearchIcon />
                </div>
              )}
            </div>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
              className="h-10 w-full rounded-md border border-neutral-200 bg-transparent pl-10 pr-4 text-sm text-neutral-900 placeholder-neutral-500 outline-none focus:border-neutral-300"
            />
          </div>
        </div>
      </div>

      <nav
        className={`ml-4 flex items-center space-x-4 ${
          isSearchOpen ? "hidden md:flex" : "flex"
        }`}
      >
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center text-sm font-semibold text-neutral-600 hover:text-neutral-900"
          >
            {selectedCategory ? formatCategory(selectedCategory) : "Community"}
            <ChevronIcon />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 rounded-md border border-neutral-200 bg-white py-1 shadow-lg">
              {Object.values(PostCategory).map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-green-100 font-normal flex items-center justify-between
            ${
              selectedCategory === category
                ? "text-neutral-900 bg-green-100"
                : "text-neutral-600"
            }`}
                >
                  <span>{formatCategory(category)}</span>
                  {selectedCategory === category && (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <SuccessButton
          onClick={handleCreateClick}
          className="px-4 py-2 text-sm"
          isLoading={isLoading}
        >
          Create&nbsp;+
        </SuccessButton>
      </nav>
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default SearchContent;
