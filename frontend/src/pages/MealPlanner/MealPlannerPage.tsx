import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface MealSlot {
  id: string;
  day: string;
  type: "Breakfast" | "Lunch" | "Dinner";
  title: string;
  calories?: number;
  tags?: string[];
}

const initialMealSlots: MealSlot[] = [
  { id: "b1", day: "MON", type: "Breakfast", title: "Overnight Oats", calories: 320 },
  { id: "b3", day: "WED", type: "Breakfast", title: "Shakshuka", calories: 450 },
  { id: "b5", day: "FRI", type: "Breakfast", title: "Greek Yogurt", calories: 280 },
  { id: "b6", day: "SAT", type: "Breakfast", title: "Sourdough Toast", calories: 210 },
  { id: "b7", day: "SUN", type: "Breakfast", title: "Pancakes", calories: 540 },
  { id: "l1", day: "MON", type: "Lunch", title: "Quinoa Salad", calories: 410 },
  { id: "l2", day: "TUE", type: "Lunch", title: "Tomato Soup", calories: 290 },
  { id: "l4", day: "THU", type: "Lunch", title: "Couscous Bowl", calories: 380 },
  { id: "l5", day: "FRI", type: "Lunch", title: "Avocado Wrap", calories: 460 },
  { id: "l6", day: "SAT", type: "Lunch", title: "Picnic Platter", calories: 520 },
  { id: "l7", day: "SUN", type: "Lunch", title: "Sunday Roast", calories: 680 },
  { id: "d1", day: "MON", type: "Dinner", title: "Lentil Dahl", calories: 510, tags: ["Vegetarian"] },
  { id: "d3", day: "WED", type: "Dinner", title: "Mushroom Pasta", calories: 620 },
  { id: "d4", day: "THU", type: "Dinner", title: "Taco Night", calories: 580 },
  { id: "d5", day: "FRI", type: "Dinner", title: "Grilled Salmon", calories: 540 },
  { id: "d6", day: "SAT", type: "Dinner", title: "Homemade Pizza", calories: 720 },
  { id: "d7", day: "SUN", type: "Dinner", title: "Leftovers", calories: 400 },
];

const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const mealTypes: ("Breakfast" | "Lunch" | "Dinner")[] = ["Breakfast", "Lunch", "Dinner"];

export function MealPlannerPage() {
  const navigate = useNavigate();
  const [meals, setMeals] = useState<MealSlot[]>(initialMealSlots);

  const handleAddMeal = (day: string, type: "Breakfast" | "Lunch" | "Dinner") => {
    const mealTitle = prompt(`Enter ${type} for ${day}:`);
    if (mealTitle && mealTitle.trim()) {
      const newSlot: MealSlot = {
        id: `${day}-${type}-${Date.now()}`,
        day,
        type,
        title: mealTitle.trim(),
        calories: Math.floor(Math.random() * 300) + 250,
      };
      setMeals((prev) => [...prev, newSlot]);
    }
  };

  const handleRemoveMeal = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMeals((prev) => prev.filter((m) => m.id !== id));
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all planned meals for this week?")) {
      setMeals([]);
    }
  };

  const totalCalories = meals.reduce((sum, m) => sum + (m.calories || 0), 0);

  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-16 py-12 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-surface-container-high rounded-2xl flex items-center justify-center artisanal-border shadow-xs">
            <span className="material-symbols-outlined text-primary text-[32px]">
              calendar_month
            </span>
          </div>
          <div>
            <h1 className="font-headline-lg text-headline-lg text-primary">
              Weekly Meal Planner
            </h1>
            <p className="text-on-surface-variant italic font-body-md">
              November 18th — November 24th, 2026
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => window.print()}
            className="px-5 py-2.5 border border-tertiary text-tertiary rounded-full font-label-md hover:bg-tertiary/10 transition-colors active:scale-95 flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>{" "}
            Print
          </button>
          <button
            onClick={() => alert("Generating personalized seasonal recipes!")}
            className="px-6 py-2.5 bg-primary text-surface rounded-full font-label-md sun-baked-shadow hover:bg-primary-container transition-all active:scale-95 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">
              auto_awesome
            </span>{" "}
            Generate Ideas
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Calendar Grid Container */}
        <div className="flex-grow space-y-6">
          <div className="bg-surface-container-low rounded-2xl overflow-hidden artisanal-border sun-baked-shadow">
            {/* Week Days Row Header */}
            <div className="grid grid-cols-7 border-b border-outline-variant/30 text-center">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="py-3 text-center border-r border-outline-variant/30 bg-surface-container-high last:border-r-0"
                >
                  <span className="font-label-md text-tertiary font-bold tracking-wider">
                    {day}
                  </span>
                </div>
              ))}
            </div>

            {/* Calendar Slots Grid (Mapped by Meal Types) */}
            <div className="divide-y divide-outline-variant/30">
              {mealTypes.map((type) => (
                <div key={type} className="grid grid-cols-7">
                  {daysOfWeek.map((day) => {
                    const slotMeal = meals.find(
                      (m) => m.day === day && m.type === type
                    );
                    return (
                      <div
                        key={`${day}-${type}`}
                        className={`p-2.5 min-h-[140px] border-r border-outline-variant/30 last:border-r-0 flex flex-col justify-between transition-colors ${
                          slotMeal ? "bg-surface-container/40" : "bg-surface"
                        }`}
                      >
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-outline block mb-1">
                          {type}
                        </span>

                        {slotMeal ? (
                          <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="p-3 bg-surface-container rounded-xl artisanal-border hover:border-primary transition-all group relative cursor-pointer shadow-xs"
                          >
                            <button
                              onClick={(e) => handleRemoveMeal(slotMeal.id, e)}
                              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-outline hover:text-error transition-opacity p-0.5"
                              title="Remove meal"
                            >
                              <span className="material-symbols-outlined text-[14px]">
                                close
                              </span>
                            </button>
                            <p className="text-body-md font-medium text-on-surface line-clamp-2 leading-snug">
                              {slotMeal.title}
                            </p>
                            {slotMeal.calories && (
                              <span className="text-caption text-on-surface-variant block mt-1">
                                {slotMeal.calories} kcal
                              </span>
                            )}
                          </motion.div>
                        ) : (
                          <button
                            onClick={() => handleAddMeal(day, type)}
                            className="p-3 border-2 border-dashed border-outline-variant/40 rounded-xl flex flex-col items-center justify-center text-outline hover:border-primary/50 hover:text-primary transition-all cursor-pointer h-20 w-full group"
                          >
                            <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">
                              add_circle
                            </span>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center bg-surface-container-high/60 p-6 rounded-2xl artisanal-border gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-body-md font-medium text-tertiary">
                Quick Actions:
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => alert("Copied previous week's schedule!")}
                  className="px-3.5 py-1.5 bg-surface-container-lowest text-on-surface-variant text-caption font-semibold rounded-full artisanal-border cursor-pointer hover:bg-surface transition-colors"
                >
                  Copy Previous Week
                </button>
                <button
                  onClick={handleClearAll}
                  className="px-3.5 py-1.5 bg-surface-container-lowest text-error text-caption font-semibold rounded-full artisanal-border cursor-pointer hover:bg-error/10 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>
            <button
              onClick={() => navigate("/ingredients")}
              className="text-primary font-label-md text-label-md flex items-center hover:underline"
            >
              View Groceries List{" "}
              <span className="material-symbols-outlined text-[18px] ml-1">
                arrow_forward
              </span>
            </button>
          </div>
        </div>

        {/* Sidebar Summary */}
        <aside className="w-full lg:w-80 flex flex-col gap-6">
          <div className="bg-surface-container p-6 md:p-8 rounded-2xl artisanal-border sun-baked-shadow space-y-6">
            <h2 className="font-headline-md text-headline-md text-secondary border-b border-outline-variant/30 pb-4">
              Weekly Summary
            </h2>

            {/* Metrics */}
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-caption text-on-surface-variant uppercase tracking-widest font-semibold">
                    Total Calories
                  </p>
                  <p className="font-headline-md text-headline-md text-primary font-bold">
                    {totalCalories.toLocaleString()}{" "}
                    <span className="text-body-md font-normal text-on-surface-variant">
                      kcal
                    </span>
                  </p>
                </div>
                <span className="material-symbols-outlined text-tertiary text-[28px]">
                  nutrition
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-caption text-on-surface-variant uppercase tracking-widest font-semibold">
                    Recipes Planned
                  </p>
                  <p className="font-headline-md text-headline-md text-primary font-bold">
                    {meals.length}{" "}
                    <span className="text-body-md font-normal text-on-surface-variant">
                      planned
                    </span>
                  </p>
                </div>
                <span className="material-symbols-outlined text-tertiary text-[28px]">
                  menu_book
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-caption text-on-surface-variant uppercase tracking-widest font-semibold">
                    Budget Status
                  </p>
                  <p className="font-label-md text-label-md text-tertiary font-bold">
                    $142.50 / $180
                  </p>
                </div>
                <div className="w-full h-2.5 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary w-[78%] rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Dietary Tags */}
            <div className="pt-4 border-t border-outline-variant/30">
              <p className="text-caption text-on-surface-variant mb-3 uppercase tracking-widest font-semibold">
                Dietary Profile
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-tertiary/10 text-tertiary text-caption font-semibold rounded-full">
                  Vegetarian (55%)
                </span>
                <span className="px-3 py-1 bg-secondary/10 text-secondary text-caption font-semibold rounded-full">
                  Low Sugar
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-caption font-semibold rounded-full">
                  Organic
                </span>
              </div>
            </div>
          </div>

          {/* Recipe Promotion Card */}
          <div className="bg-primary/5 rounded-2xl p-6 artisanal-border border-primary/20 space-y-4">
            <div
              className="w-full h-32 rounded-xl bg-cover bg-center mb-2 shadow-xs"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80')",
              }}
            ></div>
            <h3 className="font-headline-md text-headline-md text-primary">
              Missing a recipe?
            </h3>
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              Browse our artisan collection of seasonal stews and organic
              bakes.
            </p>
            <button
              onClick={() => navigate("/")}
              className="w-full py-3 bg-secondary text-surface rounded-full font-label-md hover:bg-secondary-container transition-all shadow-xs"
            >
              Explore Recipes
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
