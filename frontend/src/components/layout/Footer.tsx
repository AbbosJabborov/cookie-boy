import { NavLink } from "react-router-dom";

export function Footer() {
  return (
    <footer className="w-full mt-auto bg-surface-container-highest dark:bg-surface-container border-t border-outline-variant/30">
      <div className="flex flex-col md:flex-row justify-between items-center py-12 px-6 md:px-16 gap-8 max-w-[1280px] mx-auto">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <NavLink to="/" className="font-headline-md text-headline-md text-secondary mb-2">
            plate.
          </NavLink>
          <p className="font-caption text-caption text-on-surface-variant max-w-xs">
            Cultivating a deeper connection with your kitchen, one ingredient at a time.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          <a href="#" className="text-on-surface-variant hover:text-secondary transition-colors font-caption text-caption">
            About Us
          </a>
          <a href="#" className="text-on-surface-variant hover:text-secondary transition-colors font-caption text-caption">
            Sustainability
          </a>
          <a href="#" className="text-on-surface-variant hover:text-secondary transition-colors font-caption text-caption">
            Privacy Policy
          </a>
          <a href="#" className="text-on-surface-variant hover:text-secondary transition-colors font-caption text-caption">
            Contact
          </a>
        </div>

        <p className="font-caption text-caption text-tertiary">
          © 2026 plate. Cooking. Crafted with care.
        </p>
      </div>
    </footer>
  );
}
