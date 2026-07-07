import { ChefHat, Search, ShoppingBasket, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="bg-background/80 sticky top-0 z-50 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="rounded-xl bg-orange-500 p-2 text-white">
            <ChefHat size={22} />
          </div>

          <div>
            <h1 className="text-lg font-bold">ShelfChef</h1>

            <p className="text-muted-foreground text-xs">
              AI Grocery Assistant
            </p>
          </div>
        </Link>

        <nav className="hidden gap-8 md:flex">
          <Link to="/">Recipes</Link>

          <Link to="/">Pantry</Link>

          <Link to="/">Shopping</Link>

          <Link to="/">Assistant</Link>
        </nav>

        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Search size={18} />
          </Button>

          <Button variant="ghost" size="icon">
            <ShoppingBasket size={18} />
          </Button>

          <Button size="sm">
            <Sparkles className="mr-2 h-4 w-4" />
            AI
          </Button>
        </div>
      </div>
    </header>
  );
}
