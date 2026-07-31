import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { to: "/ingredients", label: "Ingredients" },
  { to: "/", label: "Discover" },
  { to: "/planner", label: "Planner" },
  { to: "/shopping", label: "Shopping List" },
  { to: "/cooking-guide", label: "Cookbook" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName = user
    ? user.first_name || user.username
    : "Profile";

  return (
    <header
      id="top-nav"
      className={`sticky top-0 z-50 w-full bg-surface transition-all duration-300 border-b border-outline-variant/30 ${
        isScrolled ? "bg-surface/95 backdrop-blur-md shadow-sm" : ""
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-6 md:px-16">
        <div className="flex items-center gap-8 md:gap-12">
          <NavLink
            to="/"
            className="font-display-lg text-3xl md:text-4xl text-primary font-bold tracking-tight hover:opacity-90 transition-opacity"
          >
            plate.
          </NavLink>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-body-md text-body-md">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? "text-primary font-bold border-b-2 border-primary pb-1 font-body-md"
                    : "text-on-surface-variant hover:text-primary transition-colors font-body-md"
                }
                end={link.to === "/"}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4 lg:gap-6">
          <div className="relative group hidden sm:block w-48 lg:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search recipes, ingredients..."
              className="w-full bg-surface-container-low border border-outline-variant/40 rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
          </div>

          <button
            aria-label="Notifications"
            className="p-2 text-on-surface-variant hover:text-primary active:scale-95 transition-transform rounded-full hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-[24px]">
              notifications
            </span>
          </button>

          {/* Auth Action or Profile Button */}
          {isAuthenticated ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-3 p-1.5 pl-3 pr-2 bg-surface-container hover:bg-surface-container-high border border-outline-variant/40 rounded-full transition-all active:scale-95 shadow-xs"
              >
                <span className="font-label-md text-label-md text-on-surface capitalize">
                  {displayName}
                </span>
                <div className="w-8 h-8 rounded-full overflow-hidden border border-primary-container bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                    alt={displayName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl shadow-lg py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-2 border-b border-outline-variant/20">
                    <p className="font-label-md text-label-md text-on-surface capitalize">
                      {displayName}
                    </p>
                    <p className="text-caption text-on-surface-variant truncate">
                      {user?.email}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/profile");
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-on-surface hover:bg-surface-container flex items-center gap-2 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px] text-tertiary">
                      account_circle
                    </span>
                    <span>My Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-error hover:bg-error-container/30 flex items-center gap-2 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      logout
                    </span>
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <NavLink
                to="/login"
                className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors hidden sm:block"
              >
                Log In
              </NavLink>
              <NavLink
                to="/register"
                className="px-4 py-2 rounded-full bg-primary text-on-primary text-sm font-semibold hover:bg-primary-container active:scale-95 transition-all shadow-sm"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
