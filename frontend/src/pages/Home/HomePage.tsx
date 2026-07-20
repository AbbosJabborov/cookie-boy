import Hero from "@/components/layout/Hero";

import QuickActions from "@/components/home/QuickActions";
import RecipeCard from "@/components/recipe/RecipeCard";

import { Skeleton } from "@/components/ui/skeleton";

import { useRecipes } from "@/hooks/useRecipes";
import { motion } from "motion/react";

export default function HomePage() {
  const { data: recipes, isLoading, error } = useRecipes();

  return (
    <>
      <section className="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <Hero />
        </div>

        <div className="hidden justify-center lg:flex">
          <div className="relative">
            <div className="absolute top-10 -left-12 animate-bounce text-5xl">
              🥬
            </div>

            <div className="absolute right-0 animate-pulse text-5xl">🧀</div>

            <div className="absolute bottom-0 left-10 animate-bounce text-5xl">
              🍗
            </div>

            <div className="rounded-full bg-orange-100 p-20 text-[180px] shadow-xl">
              🛒
            </div>
          </div>
        </div>
      </section>

      <motion.main
        className="mx-auto max-w-7xl px-6 py-12"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
        }}
      >
        {/* Quick Actions */}
        <section className="-mt-6 mb-14">
          <QuickActions />
        </section>

        {/* Recipes */}
        <section>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-primary text-sm font-semibold tracking-widest uppercase">
                Explore
              </p>

              <h2 className="mt-2 text-3xl font-bold">Popular Recipes</h2>

              <p className="text-muted-foreground mt-2">
                Discover delicious recipes with smart ingredient substitutions.
              </p>
            </div>
          </div>

          {isLoading && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-80 rounded-2xl" />
              ))}
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
              Failed to load recipes.
            </div>
          )}

          {recipes && (
            <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
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
      </motion.main>
    </>
  );
}
