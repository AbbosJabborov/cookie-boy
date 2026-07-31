import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useIngredients } from "@/hooks/useIngredients";

interface DisplayIngredient {
  id: string | number;
  name: string;
  category: string;
  tagline: string;
  image: string;
}

const fallbackDatabase: DisplayIngredient[] = [
  {
    id: "1",
    name: "Heirloom Tomato",
    category: "Vegetables",
    tagline: "Juicy & Sweet",
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "2",
    name: "Curly Kale",
    category: "Vegetables",
    tagline: "Crisp & Earthy",
    image:
      "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "3",
    name: "White Garlic",
    category: "Vegetables",
    tagline: "Aromatic",
    image:
      "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "4",
    name: "King Carrots",
    category: "Vegetables",
    tagline: "Sweet & Crunchy",
    image:
      "https://images.unsplash.com/photo-1598170845058-12ef4a457539?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "5",
    name: "Pasture Eggs",
    category: "Proteins",
    tagline: "Farm Fresh",
    image:
      "https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "6",
    name: "Wild Salmon",
    category: "Proteins",
    tagline: "Rich in Omega-3",
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "7",
    name: "Extra Virgin Olive Oil",
    category: "Pantry",
    tagline: "Cold Pressed",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "8",
    name: "Fresh Rosemary",
    category: "Pantry",
    tagline: "Fragrant Herb",
    image:
      "https://images.unsplash.com/photo-1515586838455-8f8f940d6853?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "9",
    name: "Artisanal Mozzarella",
    category: "Dairy & Eggs",
    tagline: "Soft & Creamy",
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=500&q=80",
  },
];

const categoryImages: Record<string, string> = {
  vegetables:
    "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80",
  proteins:
    "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=500&q=80",
  pantry:
    "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80",
  dairy:
    "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=500&q=80",
};

export function IngredientChooserPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [basket, setBasket] = useState<string[]>(["Heirloom Tomato", "White Garlic"]);

  const { data: apiIngredients, isLoading } = useIngredients();

  const categories = [
    "All",
    "Vegetables",
    "Proteins",
    "Pantry",
    "Dairy & Eggs",
  ];

  const toggleIngredient = (name: string) => {
    setBasket((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  const ingredientsList: DisplayIngredient[] =
    apiIngredients && apiIngredients.length > 0
      ? apiIngredients.map((item) => ({
          id: item.id,
          name: item.name,
          category: item.category || "Pantry",
          tagline: "Organic & Fresh",
          image:
            categoryImages[item.category?.toLowerCase()] ||
            "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80",
        }))
      : fallbackDatabase;

  const filteredIngredients =
    selectedCategory === "All"
      ? ingredientsList
      : ingredientsList.filter(
          (ing) => ing.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  const matchedDishesCount = basket.length > 0 ? Math.min(12, basket.length * 4) : 0;

  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-16 py-12 min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-8">
        <div className="max-w-2xl">
          <span className="font-label-md text-label-md text-tertiary tracking-wider uppercase mb-2 block">
            Craft your menu
          </span>
          <h1 className="font-headline-lg text-display-lg text-on-surface leading-tight mb-4">
            What's in your kitchen today?
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant italic">
            Select ingredients from your pantry to discover custom recipes crafted just for you.
          </p>
        </div>
        <div className="flex items-center bg-surface-container-high px-5 py-2.5 rounded-full border border-outline-variant/50 shadow-sm">
          <span
            className="material-symbols-outlined text-primary mr-2 text-[20px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            restaurant
          </span>
          <span className="font-label-md text-label-md text-on-surface">
            {ingredientsList.length} Ingredients Loaded
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Main Ingredient Browser */}
        <div className="flex-1 space-y-10 w-full">
          {/* Category Pills */}
          <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full font-label-md text-label-md whitespace-nowrap active:scale-95 transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-on-primary shadow-sm"
                    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                {cat === "All" ? "All Ingredients" : cat}
              </button>
            ))}
          </div>

          {/* Ingredient Grid */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline-md text-headline-md text-secondary">
                {selectedCategory === "All"
                  ? "Pantry Essentials"
                  : selectedCategory}
              </h2>
              <span className="text-caption text-on-surface-variant font-label-md">
                Showing {filteredIngredients.length} items
              </span>
            </div>

            {isLoading ? (
              <div className="py-12 text-center text-on-surface-variant font-body-md">
                Loading pantry ingredients...
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredIngredients.map((item) => {
                  const isSelected = basket.includes(item.name);
                  return (
                    <motion.div
                      key={item.id}
                      whileHover={{ y: -4 }}
                      onClick={() => toggleIngredient(item.name)}
                      className={`group cursor-pointer bg-surface-container-lowest border rounded-2xl overflow-hidden transition-all duration-300 ${
                        isSelected
                          ? "selected-glow border-primary bg-primary-fixed/10"
                          : "border-outline-variant/30 hover:border-primary/40"
                      }`}
                    >
                      <div className="h-36 overflow-hidden relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div
                          className={`absolute top-3 right-3 p-1 rounded-full backdrop-blur-sm transition-all ${
                            isSelected
                              ? "bg-primary text-white"
                              : "bg-surface/90 text-primary opacity-0 group-hover:opacity-100"
                          }`}
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {isSelected ? "check" : "add_circle"}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors capitalize">
                          {item.name}
                        </h3>
                        <p className="text-caption text-on-surface-variant mt-0.5 italic">
                          {item.tagline}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        {/* Selection Sidebar Basket */}
        <aside className="w-full lg:w-80 sticky top-28">
          <div className="bg-surface-container rounded-3xl p-6 md:p-8 border border-outline-variant/30 flex flex-col min-h-[420px] sun-baked-shadow">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-outline-variant/30">
              <h2 className="font-headline-md text-headline-md text-on-surface">
                Your Basket
              </h2>
              <span className="bg-secondary text-on-secondary w-7 h-7 flex items-center justify-center rounded-full text-caption font-bold">
                {basket.length}
              </span>
            </div>

            {/* Basket Items List */}
            <div className="flex-1 space-y-3 mb-6 min-h-[160px] custom-scrollbar overflow-y-auto max-h-[260px] pr-1">
              <AnimatePresence>
                {basket.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-10 opacity-50"
                  >
                    <span className="material-symbols-outlined text-display-lg block mb-2 text-outline">
                      shopping_basket
                    </span>
                    <p className="font-body-md italic text-on-surface-variant">
                      No items selected yet
                    </p>
                  </motion.div>
                ) : (
                  basket.map((item) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center justify-between bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/30 shadow-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-secondary rounded-full"></span>
                        <span className="font-label-md text-label-md text-on-surface capitalize">
                          {item}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleIngredient(item)}
                        className="text-outline hover:text-error transition-colors p-1"
                        aria-label={`Remove ${item}`}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          close
                        </span>
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            <div className="pt-6 border-t border-outline-variant/40">
              <div className="flex justify-between items-center mb-6">
                <span className="text-on-surface-variant font-label-md">
                  Matched Dishes
                </span>
                <span className="font-headline-md text-headline-md text-primary">
                  {matchedDishesCount}
                </span>
              </div>
              <button
                disabled={basket.length === 0}
                onClick={() => navigate("/")}
                className="w-full bg-primary text-on-primary py-3.5 rounded-xl font-label-md flex items-center justify-center gap-2 hover:bg-primary-container active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                <span>Find Recipes</span>
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>

          {/* Chef Tip Callout */}
          <div className="mt-6 p-6 bg-tertiary-fixed text-on-tertiary-fixed rounded-2xl border border-tertiary/20 shadow-xs">
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-tertiary text-[22px]">
                lightbulb
              </span>
              <div>
                <h3 className="font-label-md text-label-md mb-1 font-bold">
                  Chef's Tip
                </h3>
                <p className="text-caption leading-relaxed">
                  Combine fresh tomatoes and garlic with salmon for a quick Mediterranean traybake!
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
