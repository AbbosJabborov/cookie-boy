import { NavLink } from "react-router-dom";
import { ChefHat } from "lucide-react";

const links = [
    { to: "/", label: "Home" },
    { to: "/recipes", label: "Recipes" },
    { to: "/pantry", label: "Pantry" },
    { to: "/recommendations", label: "Recommendations" },
];

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-neutral-200/60 bg-white/70 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                <NavLink
                    to="/"
                    className="flex items-center gap-2"
                >
                    <ChefHat className="text-green-700" />
                    <span className="text-xl font-bold">
                        CookieBoy
                    </span>
                </NavLink>

                <nav className="flex items-center gap-8">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                isActive
                                    ? "font-semibold text-green-700"
                                    : "text-neutral-600 hover:text-black transition"
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    );
}
