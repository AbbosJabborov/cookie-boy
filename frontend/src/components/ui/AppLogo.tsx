import { Link } from "react-router-dom";

export function AppLogo() {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <div className="w-12 h-12 rounded-2xl bg-primary text-surface flex items-center justify-center font-display-lg text-2xl font-bold shadow-sm group-hover:scale-105 transition-transform">
        p.
      </div>
      <div>
        <h1 className="font-display-lg text-3xl font-bold text-primary tracking-tight leading-none">
          plate.
        </h1>
        <p className="text-caption text-on-surface-variant font-body-md mt-0.5">
          Artisanal Culinary Experience
        </p>
      </div>
    </Link>
  );
}
