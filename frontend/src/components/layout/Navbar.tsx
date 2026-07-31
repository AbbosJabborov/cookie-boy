import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const navLinks = [
  { to: "/ingredients", label: "Ingredients" },
  { to: "/", label: "Discover" },
  { to: "/planner", label: "Planner" },
  { to: "/cooking-guide", label: "Cookbook" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        </div>
      </div>
    </header>
  );
}
