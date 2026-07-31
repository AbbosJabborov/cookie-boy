import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [preferences, setPreferences] = useState(["Vegetarian", "Low Sugar"]);

  const displayName = user
    ? user.first_name || user.username
    : "Oliver Sand";

  const email = user ? user.email : "oliver.sand@example.com";

  const handleAddPreference = () => {
    const input = prompt("Enter a new dietary preference (e.g. Gluten-Free, Nut-Free):");
    if (input && input.trim()) {
      setPreferences((prev) => Array.from(new Set([...prev, input.trim()])));
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-16 py-12 min-h-screen">
      {/* Profile Header Section */}
      <section className="mb-14 flex flex-col md:flex-row items-center md:items-end gap-8 border-b border-outline-variant/30 pb-10">
        <div className="relative group cursor-pointer">
          <div className="w-36 h-36 md:w-40 md:h-40 rounded-3xl overflow-hidden border-4 border-surface-container-highest shadow-md">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80"
              alt={displayName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div
            onClick={() => alert("Upload new profile photo")}
            className="absolute -bottom-2 -right-2 bg-secondary p-2.5 rounded-full text-white shadow-lg hover:scale-110 active:scale-95 transition-all"
            title="Edit Photo"
          >
            <span className="material-symbols-outlined text-[20px]">edit</span>
          </div>
        </div>

        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <h1 className="font-display-lg text-display-lg text-primary font-bold capitalize">
              {displayName}
            </h1>
            <span className="bg-tertiary-fixed text-on-tertiary-fixed text-caption px-3 py-1 rounded-full font-label-md">
              Pro Home Chef
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-on-surface-variant font-body-md">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-tertiary text-[20px]">
                location_on
              </span>
              <span className="font-label-md">Portland, Oregon</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
            <span className="font-label-md">Home Cook since 2018</span>
            <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
            <span className="text-caption italic">{email}</span>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => alert("Profile link copied to clipboard!")}
            className="px-6 py-3 rounded-full bg-primary text-surface font-label-md hover:bg-primary-container active:scale-95 transition-all flex items-center gap-2 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">share</span>
            <span>Share Profile</span>
          </button>
          {isAuthenticated && (
            <button
              onClick={logout}
              className="px-5 py-3 rounded-full border border-error/40 text-error font-label-md hover:bg-error-container/30 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              <span>Log Out</span>
            </button>
          )}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Sidebar: Stats & Preferences */}
        <aside className="md:col-span-4 space-y-8">
          {/* Kitchen Stats Card */}
          <div className="bg-surface-container-low p-8 rounded-3xl artisanal-border sun-baked-shadow">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-tertiary text-[28px]">
                countertops
              </span>
              <h2 className="font-headline-md text-headline-md text-tertiary font-bold">
                Kitchen Stats
              </h2>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-outline-variant/30">
                <span className="text-on-surface-variant font-body-md">
                  Recipes Cooked
                </span>
                <span className="font-headline-md text-primary font-bold text-2xl">
                  124
                </span>
              </div>
              <div>
                <span className="text-on-surface-variant font-body-md block mb-3 font-semibold">
                  Favorite Ingredients
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Rosemary",
                    "Heirloom Garlic",
                    "Sourdough Starter",
                    "Olive Oil",
                  ].map((ing) => (
                    <span
                      key={ing}
                      className="px-4 py-1.5 rounded-full bg-surface-container text-tertiary text-caption font-label-md border border-tertiary/15"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Dietary Preferences Card */}
          <div className="bg-surface-container-low p-8 rounded-3xl artisanal-border sun-baked-shadow">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-secondary text-[28px]">
                restaurant_menu
              </span>
              <h2 className="font-headline-md text-headline-md text-secondary font-bold">
                Dietary Preferences
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {preferences.map((pref) => (
                <div
                  key={pref}
                  className="px-4 py-2 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md flex items-center gap-2 text-caption font-semibold shadow-xs"
                >
                  <span>{pref}</span>
                  <button
                    onClick={() =>
                      setPreferences((prev) => prev.filter((p) => p !== pref))
                    }
                    className="hover:text-error transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      check_circle
                    </span>
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddPreference}
                className="px-4 py-2 rounded-full border border-secondary text-secondary font-label-md hover:bg-secondary/10 transition-colors text-caption"
              >
                + Add Preference
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content: Saved Recipes Grid */}
        <main className="md:col-span-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-display-lg text-headline-lg text-primary font-bold">
              Saved Recipes
            </h2>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">
                  tune
                </span>
                <span className="font-label-md">Filter</span>
              </button>
              <div className="w-px h-6 bg-outline-variant"></div>
              <span className="text-on-surface-variant font-body-md font-semibold">
                48 Items
              </span>
            </div>
          </div>

          {/* Bento Grid Layout for Recipes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Large Feature Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="md:col-span-2 group relative h-80 rounded-3xl overflow-hidden shadow-sm border border-outline-variant/30 artisanal-border"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Artisanal Vegetable Tart"
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80"
              />
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full flex justify-between items-end">
                <div>
                  <span className="px-3.5 py-1 bg-tertiary-container text-on-tertiary-container rounded-full text-caption mb-3 inline-block font-label-md">
                    Weekly Favorite
                  </span>
                  <h3 className="font-headline-lg text-white mb-1 font-bold">
                    Artisanal Vegetable Tart
                  </h3>
                  <p className="text-white/80 font-body-md">
                    45 mins • Intermediate • Vegetarian
                  </p>
                </div>
                <button
                  onClick={() => navigate("/cooking-guide")}
                  className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-md"
                >
                  <span
                    className="material-symbols-outlined text-[22px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    favorite
                  </span>
                </button>
              </div>
            </motion.div>

            {/* Regular Card 1 */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-surface-container-low rounded-3xl overflow-hidden flex flex-col artisanal-border sun-baked-shadow"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  alt="Roasted Pumpkin Soup"
                  src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
                />
              </div>
              <div className="p-6">
                <h3 className="font-headline-md text-primary mb-1 font-bold">
                  Roasted Pumpkin Soup
                </h3>
                <p className="text-on-surface-variant font-caption mb-4">
                  30 mins • Simple • Vegan
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full border-2 border-surface bg-secondary-fixed"></div>
                    <div className="w-6 h-6 rounded-full border-2 border-surface bg-tertiary-fixed"></div>
                  </div>
                  <button className="text-outline hover:text-primary transition-colors">
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      bookmark
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Regular Card 2 */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-surface-container-low rounded-3xl overflow-hidden flex flex-col artisanal-border sun-baked-shadow"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  alt="Peach & Arugula Salad"
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80"
                />
              </div>
              <div className="p-6">
                <h3 className="font-headline-md text-primary mb-1 font-bold">
                  Peach & Arugula Salad
                </h3>
                <p className="text-on-surface-variant font-caption mb-4">
                  15 mins • Quick • Gluten-Free
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full border-2 border-surface bg-primary-fixed"></div>
                  </div>
                  <button className="text-outline hover:text-primary transition-colors">
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      bookmark
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
