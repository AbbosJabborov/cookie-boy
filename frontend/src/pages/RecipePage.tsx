import { useState } from "react";
import { useParams } from "react-router-dom";

import { Clock, Users, ChefHat } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import ShoppingSheet from "@/components/shopping/ShoppingSheet";
import { useRecipe } from "@/hooks/useRecipe";

export default function RecipePage() {
  const { id } = useParams();

  const recipeId = Number(id);

  const [shoppingOpen, setShoppingOpen] = useState(false);

  const { data: recipe, isLoading, error } = useRecipe(recipeId);

  if (isLoading) {
    return (
      <main className="mx-auto max-w-6xl p-10">
        <Skeleton className="h-96 rounded-xl" />
      </main>
    );
  }

  if (error || !recipe) {
    return (
      <main className="p-10">
        <h1>Recipe not found.</h1>
      </main>
    );
  }

  return (
    <>
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="bg-muted overflow-hidden rounded-2xl">
          {recipe.image ? (
            <img
              src={recipe.image}
              alt={recipe.title}
              className="h-96 w-full object-cover"
            />
          ) : (
            <div className="flex h-96 items-center justify-center text-8xl">
              🍝
            </div>
          )}
        </div>

        <div className="mt-8">
          <h1 className="text-5xl font-bold">{recipe.title}</h1>

          <p className="text-muted-foreground mt-4">{recipe.description}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Badge variant="secondary">
              <Clock className="mr-2 h-4 w-4" />
              {recipe.total_time} min
            </Badge>

            <Badge variant="secondary">
              <Users className="mr-2 h-4 w-4" />
              {recipe.servings} servings
            </Badge>

            <Badge>
              <ChefHat className="mr-2 h-4 w-4" />
              {recipe.difficulty}
            </Badge>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <Card className="p-6">
            <h2 className="mb-6 text-xl font-bold">Ingredients</h2>

            <div className="space-y-3">
              {(recipe.ingredients ?? []).map((ingredient) => (
                <div
                  key={ingredient.id}
                  className="flex justify-between rounded-lg border p-3"
                >
                  <span>{ingredient.ingredient_name}</span>

                  <span className="text-muted-foreground">
                    {ingredient.amount}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="mb-6 text-xl font-bold">Instructions</h2>

              <div className="space-y-6">
                {recipe.instructions
                  .split("\n")
                  .filter(Boolean)
                  .map((step, index) => (
                    <div key={index} className="flex gap-5">
                      <div className="bg-primary text-primary-foreground flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-semibold">
                        {index + 1}
                      </div>

                      <p>{step}</p>
                    </div>
                  ))}
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-10 flex gap-4">
          <Button size="lg">Start Cooking</Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => setShoppingOpen(true)}
          >
            Shopping List
          </Button>
        </div>
      </main>

      <ShoppingSheet
        recipeId={recipeId}
        open={shoppingOpen}
        onOpenChange={setShoppingOpen}
      />
    </>
  );
}
