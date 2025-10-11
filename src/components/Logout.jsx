import React, { useState, useEffect, useRef } from "react";
import { useUser } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

// Simple Avatar Component
const Avatar = ({ email }) => {
  const firstLetter = email ? email.charAt(0).toUpperCase() : "U";
  return (
    <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
      {firstLetter}
    </div>
  );
};

export const Logout = () => {
  const { user, loading, logout } = useUser();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout(); // context logout function
    navigate("/");
  };

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white/0 shadow-white px-2 lg:px-4 py-2 rounded-2xl max-w-7xl mx-auto mt-2">
      <div className="flex items-center justify-between">
        {/* User Section */}
        <div className="relative">
          {loading ? (
            <div className="w-24 h-10 bg-gray-200 rounded-lg animate-pulse" />
          ) : user ? (
            <div ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="focus:outline-none"
              >
                <Avatar email={user.email} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg z-50 py-1 border border-gray-100">
                  {/* Signed in info */}
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    <p className="text-xs text-gray-500">Signed in as</p>
                    <p className="font-semibold truncate">{user.email}</p>
                  </div>

                  {/* Dashboard Section */}
                  <Link
                    to="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Dashboard
                  </Link>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signup/login">
              <button className="bg-gray-900 text-white font-semibold py-2 px-5 rounded-full hover:bg-black transition-colors">
                Signup / Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
