import React, { useEffect, useCallback, useState, useRef } from "react";
import { Input } from "../ui/input";
import handleSearchNavbar from "@/lib/actions/search.action";
import Link from "next/link";

import { Bricolage_Grotesque } from "next/font/google";

import { RiSearchEyeLine } from "react-icons/ri";
import { BiRadioCircle } from "react-icons/bi";

const fontHeading = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

interface Product {
  _id: string;
  name: string;
  slug: string;
}

interface SearchBarProps {
  show: boolean;
  onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ show, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const fetchSearchResults = async (query: string) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    try {
      const res = await handleSearchNavbar(query);
      let results: Product[] | { error: string } = JSON.parse(res);
      if (Array.isArray(results)) {
        setSearchResults(results);
      } else {
        console.error(results.error);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSearch = useCallback(
    debounce((query: string) => {
      fetchSearchResults(query);
    }, 300),
    []
  );

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [searchTerm, handleSearch]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (show) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50  antialiased ${fontHeading.className} `}
    >
      <div
        ref={searchRef}
        className="bg-white rounded-lg shadow-lg px-5 py-3 sm:p-6 w-[90%] sm:w-full max-w-3xl"
      >
        <div className="relative">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Products..."
            className="text-start block w-full p-4 text-lg text-black bg-white focus:ring-[#000f1e] focus-border-[#000f1e] border focus-visible:ring-[#000f1e] border-none rounded-lg"
            onFocus={() => setShowDropdown(true)}
          />
          <RiSearchEyeLine className="absolute top-2 right-0 w-6 h-6 text-gray-500" />
        </div>
        {showDropdown && searchResults.length > 0 && (
          <div className="mt-4 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            <div className="px-4 py-3 space-y-2">
              {searchResults.map((result) => (
                <div
                  key={result._id}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-black transition-all hover:text-white text-gray-600 hover:scale-[1.02]  duration-300 hover:cursor-pointer"
                >
                  <BiRadioCircle className="w-5 h-5 " />
                  <div>
                    <Link
                      href={`/product/${result.slug}`}
                      className="font-medium"
                      onClick={onClose}
                    >
                      {result.name}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
