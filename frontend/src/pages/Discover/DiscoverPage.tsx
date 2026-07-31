import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRecipes } from "@/hooks/useRecipes";
import { useAddFromRecipe } from "@/hooks/useShopping";

const categoryCards = [
  {
    title: "Autumn Harvest",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Handmade Pasta",
    image:
      "https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Slow Baking",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Plant-Based",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Comfort Food",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
  },
];

const featuredRecipes = [
  {
    id: "1",
    title: "One-Pot Moroccan Lentils",
    time: "30 min",
    difficulty: "Beginner",
    match: "100% Match",
    status: "Ready to cook",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    tags: ["Lentils", "Spices", "Herbs"],
  },
  {
    id: "2",
    title: "Wild Mushroom Risotto",
    time: "50 min",
    difficulty: "Intermediate",
    match: "2 items missing",
    missing: "Need: Cream, Parmesan",
    image:
      "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80",
    tags: ["Mushrooms", "Arborio", "Thyme"],
  },
  {
    id: "3",
    title: "Lemon Herb Chicken Plate",
    time: "25 min",
    difficulty: "Beginner",
    match: "100% Match",
    status: "Ready to cook",
    image:
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80",
    tags: ["Chicken", "Lemon", "Garlic"],
  },
];

export function DiscoverPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const { data: apiRecipes } = useRecipes();
  const addFromRecipeMutation = useAddFromRecipe();

  const filterOptions = ["All", "Pantry Matches", "Quick Meals", "Vegan", "Gluten-Free"];

  const rawRecipes = (apiRecipes && apiRecipes.length > 0)
    ? apiRecipes.map((r) => ({
        id: String(r.id),
        title: r.title,
        time: `${r.total_time} min`,
        difficulty: r.difficulty || "Easy",
        match: r.match_percentage ? `${r.match_percentage}% Match` : "100% Match",
        status: r.match_percentage === 100 ? "Ready to cook" : "1 missing",
        missing: r.match_percentage !== 100 ? "Missing 1 item" : undefined,
        image: r.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
        tags: [r.difficulty || "Easy", `${r.prep_time || 15}m prep`],
      }))
    : featuredRecipes;

  const displayRecipes = rawRecipes.filter((r) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Pantry Matches") return r.match.includes("100%");
    if (activeFilter === "Quick Meals") return parseInt(r.time) <= 30;
    if (activeFilter === "Vegan") return r.tags.some((t) => t.toLowerCase().includes("vegan")) || r.title.toLowerCase().includes("veg");
    if (activeFilter === "Gluten-Free") return r.tags.some((t) => t.toLowerCase().includes("gluten")) || r.title.toLowerCase().includes("salad");
    return true;
  });

  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-16 py-10 min-h-screen">
      {/* Header & Filter Controls */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-tertiary text-[22px]">
                local_florist
              </span>
              <span className="font-label-md text-label-md text-tertiary tracking-wider uppercase">
                Explore the flavors
              </span>
            </div>
            <h1 className="font-display-lg text-display-lg text-primary">
              Discover New Recipes
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveFilter("All")}
              className={`px-5 py-2 rounded-full font-label-md text-label-md transition-all active:scale-95 flex items-center gap-2 ${
                activeFilter === "All"
                  ? "bg-primary text-surface shadow-sm"
                  : "artisanal-border text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                filter_list
              </span>
              Filters
            </button>
            {filterOptions.slice(1).map((filter) => (
              <button
                key={filter}
                onClick={() =>
                  setActiveFilter(activeFilter === filter ? "All" : filter)
                }
                className={`px-5 py-2 rounded-full font-label-md text-label-md transition-colors ${
                  activeFilter === filter
                    ? "bg-primary text-surface"
                    : "bg-surface-container-high text-on-surface-variant hover:bg-secondary-container"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Feature Match Card */}
      <section className="mb-16">
        <div className="relative rounded-3xl overflow-hidden sun-baked-shadow bg-surface-container-lowest flex flex-col lg:flex-row h-auto lg:h-[480px] artisanal-border">
          <div className="lg:w-7/12 relative overflow-hidden h-64 lg:h-full">
            <img
              src="https://images.unsplash.com/photo-1590577976322-3d2d6e2130d5?auto=format&fit=crop&w=1200&q=80"
              alt="Rustic Heirloom Carrot & Thyme Galette"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-surface/90 backdrop-blur-md font-label-md text-label-md text-primary flex items-center gap-2 shadow-sm">
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              Top Match For You
            </div>
          </div>
          <div className="lg:w-5/12 p-8 lg:p-12 flex flex-col justify-center bg-surface-container-high">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 rounded-full bg-secondary-container/50 text-secondary font-label-md text-label-md">
                Seasonal Favorite
              </span>
              <div className="flex items-center text-on-surface-variant font-caption text-caption">
                <span className="material-symbols-outlined text-[16px] mr-1">
                  schedule
                </span>{" "}
                45 min
              </div>
            </div>

            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4 leading-tight">
              Rustic Heirloom Carrot & Thyme Galette
            </h2>
            <p className="text-on-surface-variant font-body-md text-body-md mb-6 line-clamp-3">
              A beautifully imperfect, hand-folded pastry filled with
              caramelized garden carrots, whipped goat cheese, and a
              honey-balsamic drizzle. Perfectly balanced for your recent pantry
              updates.
            </p>

            <div className="flex items-center justify-between mt-auto">
              <div className="flex -space-x-2">
                <div className="w-9 h-9 rounded-full border-2 border-surface bg-surface-container flex items-center justify-center text-[16px]">
                  🥕
                </div>
                <div className="w-9 h-9 rounded-full border-2 border-surface bg-surface-container flex items-center justify-center text-[16px]">
                  🧀
                </div>
                <div className="w-9 h-9 rounded-full border-2 border-surface bg-surface-container flex items-center justify-center text-[16px]">
                  🍯
                </div>
                <div className="w-9 h-9 rounded-full border-2 border-surface bg-surface-container-high flex items-center justify-center text-[11px] font-bold text-on-surface">
                  +2
                </div>
              </div>

              <button
                onClick={() => navigate("/cooking-guide")}
                className="bg-primary text-surface px-7 py-3 rounded-full font-label-md text-label-md hover:bg-primary-container active:scale-95 transition-all shadow-sm"
              >
                View Recipe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Recipes Grid Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-tertiary text-[26px]">
              inventory_2
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Matching Your Ingredients
            </h2>
          </div>
          <Link
            to="/ingredients"
            className="text-primary font-label-md text-label-md flex items-center gap-1 hover:underline"
          >
            Manage Pantry{" "}
            <span className="material-symbols-outlined text-[18px]">
              chevron_right
            </span>
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayRecipes.map((recipe, index) => (
            <motion.article
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-surface-container-lowest rounded-2xl overflow-hidden artisanal-border recipe-card-hover group cursor-pointer flex flex-col"
              onClick={() => navigate(`/recipes/${recipe.id}`)}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className={`absolute top-4 right-4 text-surface px-3 py-1 rounded-full font-label-md text-caption flex items-center gap-1 backdrop-blur-sm ${
                    recipe.match.includes("100%")
                      ? "bg-tertiary/90"
                      : "bg-secondary/90"
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {recipe.match.includes("100%")
                      ? "check_circle"
                      : "shopping_cart"}
                  </span>
                  {recipe.match}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">
                      {recipe.title}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      aria-label="Bookmark recipe"
                      className="text-outline hover:text-primary transition-colors p-1"
                    >
                      <span className="material-symbols-outlined">
                        bookmark
                      </span>
                    </button>
                  </div>

                  <div className="flex gap-4 text-on-surface-variant font-caption text-caption mb-6">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">
                        timer
                      </span>{" "}
                      {recipe.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">
                        signal_cellular_alt
                      </span>{" "}
                      {recipe.difficulty}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
                  <span
                    className={`font-label-md text-label-md ${
                      recipe.status ? "text-tertiary" : "text-secondary"
                    }`}
                  >
                    {recipe.status || recipe.missing}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addFromRecipeMutation.mutate(Number(recipe.id), {
                          onSuccess: () => {
                            alert(`Added missing ingredients from "${recipe.title}" to your Shopping List!`);
                          },
                        });
                      }}
                      className="p-1.5 rounded-full hover:bg-secondary/15 text-secondary transition-colors"
                      title="Add missing ingredients to Smart Shopping List"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        add_shopping_cart
                      </span>
                    </button>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                      <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          recipe.status ? "bg-tertiary" : "bg-outline-variant"
                        }`}
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Seasonal Categories Horizontal Scroll */}
      <section className="mb-20">
        <h2 className="font-headline-md text-headline-md text-on-surface mb-8">
          Browse by Category
        </h2>
        <div className="flex overflow-x-auto gap-6 pb-4 custom-scrollbar">
          {categoryCards.map((cat, idx) => (
            <div
              key={idx}
              className="min-w-[220px] aspect-[4/5] relative rounded-2xl overflow-hidden group cursor-pointer artisanal-border shadow-sm flex-shrink-0"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span className="text-white font-headline-md text-headline-md">
                  {cat.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Action Button: Add Ingredient */}
      <button
        onClick={() => navigate("/ingredients")}
        aria-label="Add Ingredient"
        className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-surface rounded-full sun-baked-shadow flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group"
      >
        <span className="material-symbols-outlined text-[32px]">add</span>
        <span className="absolute right-full mr-4 px-4 py-2 rounded-lg bg-surface text-on-surface artisanal-border font-label-md text-label-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
          Add Ingredient
        </span>
      </button>
    </div>
  );
}
