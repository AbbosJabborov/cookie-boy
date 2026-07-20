import { ChefHat } from "lucide-react";

export function AppLogo() {
    return (
        <div className="flex items-center gap-3">

            <div className="rounded-2xl bg-green-600 p-3">

                <ChefHat
                    className="text-white"
                    size={22}
                />

            </div>

            <div>

                <h1 className="text-xl font-bold">
                    CookieBoy
                </h1>

                <p className="text-sm text-muted-foreground">
                    Smart Cooking
                </p>

            </div>

        </div>
    );
}
