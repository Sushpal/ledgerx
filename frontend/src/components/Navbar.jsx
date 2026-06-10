import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useAuthContext } from "../context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

const Navbar = () => {
  const location                        = useLocation();
  const { user }                        = useAuthContext();
  const { handleLogout, loading }       = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef                     = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = (path) => location.pathname === path;

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
  <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#151515] border-b border-[#272727] flex items-center px-6">
      {/* Logo */}
      <Link to="/home" className="font-mono text-sm font-medium text-[#f0ede8] mr-10 tracking-tight">
        Ledger<span className="text-[#c8a96e]">X</span>
      </Link>

      {/* Nav links */}
      <div className="flex items-center gap-1">
        <Link
          to="/home"
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            isActive("/home")
              ? "text-[#f0ede8] bg-[#272727]"
              : "text-[#8a8480] hover:text-[#f0ede8] hover:bg-[#1a1a1a]"
          }`}
        >
          Home
        </Link>
        <Link
          to="/transfer"
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            isActive("/transfer")
              ? "text-[#f0ede8] bg-[#272727]"
              : "text-[#8a8480] hover:text-[#f0ede8] hover:bg-[#1a1a1a]"
          }`}
        >
          Transfer
        </Link>
        <Link
          to="/history"
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            isActive("/history")
              ? "text-[#f0ede8] bg-[#272727]"
              : "text-[#8a8480] hover:text-[#f0ede8] hover:bg-[#1a1a1a]"
          }`}
        >
          History
        </Link>
      </div>

      {/* Right — profile dropdown */}
      <div className="ml-auto relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="w-8 h-8 rounded-full bg-[#c8a96e1a] border border-[#c8a96e30] flex items-center justify-center text-xs font-semibold text-[#c8a96e] hover:opacity-80 transition-opacity cursor-pointer"
        >
          {initials}
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 top-10 w-52 bg-[#1a1a1a] border border-[#272727] rounded-xl shadow-xl overflow-hidden z-50">

            {/* User info */}
            <div className="px-4 py-3 border-b border-[#272727]">
              <p className="text-sm font-medium text-[#f0ede8] truncate">
                {user?.name}
              </p>
              <p className="text-xs text-[#8a8480] truncate mt-0.5">
                {user?.email}
              </p>
            </div>

            {/* Links */}
            <div className="py-1">
              <Link
                to="/profile"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#8a8480] hover:text-[#f0ede8] hover:bg-[#272727] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="4"/>
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                </svg>
                Profile
              </Link>

              <button
                onClick={() => { setDropdownOpen(false); handleLogout(); }}
                disabled={loading}
                className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-[#f87171] hover:bg-[#272727] transition-colors disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16,17 21,12 16,7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                )}
                {loading ? "Signing out..." : "Sign out"}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;