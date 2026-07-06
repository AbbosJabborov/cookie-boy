import Navbar from "@/components/layout/Navbar";
import QuickActions from "@/components/home/QuickActions";
import RecipeCard from "@/components/recipe/RecipeCard";
import SearchBar from "@/components/search/SearchBar";

import { Skeleton } from "@/components/ui/skeleton";

import { useRecipes } from "@/hooks/useRecipes";

export default function HomePage() {
  const { data: recipes, isLoading, error } = useRecipes();

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <section className="text-center">
          <h1 className="text-5xl font-bold tracking-tight">
            Cook smarter with <span className="text-primary">ShelfChef</span>
          </h1>

          <p className="text-muted-foreground mx-auto mt-5 max-w-2xl text-lg">
            Discover recipes using products available in your local supermarket,
            estimate costs, and receive AI-powered ingredient substitutions.
          </p>

          <SearchBar />

          <QuickActions />
        </section>

        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Popular Recipes</h2>

          {isLoading && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-72 rounded-xl" />
              ))}
            </div>
          )}

          {error && <p className="text-red-500">Failed to load recipes.</p>}

          {recipes && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  id={recipe.id}
                  title={recipe.title}
                  time={recipe.total_time}
                  difficulty={recipe.difficulty}
                  image={recipe.image}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
