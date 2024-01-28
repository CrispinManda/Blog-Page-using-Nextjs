// src/app/Component/Navbar.tsx
import Link from "next/link";
import React, { useState } from "react";

interface NavbarProps {
  onSearchQueryChange: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearchQueryChange }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    console.log("I am searching ", query);
    onSearchQueryChange(query);
  };

  return (
    <nav
      className="flex justify-between p-4 text-dark"
      style={{ backgroundColor: "#D9D9D9" }}
    >
      {/* First div with logo */}
      <div className="flex items-center">
        <img src="/path/to/your/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
        <span className="text-lg font-bold">Blog</span>
      </div>

      {/* Second div with Blog, search bar, and create blog post button */}
      <div className="flex items-center space-x-4">
        <h3 className="text-lg">Blogs</h3>

        <div className="relative">
          <input
            onChange={handleSearchChange}
            type="text"
            placeholder="Search"
            className="text-dark border-2 border-gray-600 rounded pl-8 pr-4 py-2 focus:outline-none focus:border-blue-500"
          />
          <span className="absolute left-2 top-2">
            {/* You can replace the icon with your desired search icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M13 11a6 6 0 111-11 6 6 0 01-1 11zm8 8l-5.143-5.144a7 7 0 10-2.121 2.12L18 18l3 3 2-2zm-2-4a8 8 0 11-16 0 8 8 0 0116 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>

        <button
          className="text-white px-4 py-2 rounded"
          style={{ backgroundColor: "#454545" }}
        >
          <Link href={`/createpost`}>Create Blog Post</Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
