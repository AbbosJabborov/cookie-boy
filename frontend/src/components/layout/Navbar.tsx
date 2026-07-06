import { ChefHat, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="bg-background border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-primary-foreground round  ed-lg p-2">
            <ChefHat className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-xl font-bold">ShelfChef</h1>
            <p className="text-muted-foreground text-xs">
              Smart cooking assistant
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>

          <Button>Login</Button>
        </div>
      </div>
    </header>
  );
}
