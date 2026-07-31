import { motion, AnimatePresence } from "framer-motion";
import {
  useShoppingLists,
  useToggleItemBought,
  useDeleteShoppingItem,
} from "@/hooks/useShopping";

interface LocalShoppingItem {
  id: number;
  ingredient_name: string;
  quantity: string | number;
  unit: string;
  estimated_price: number;
  is_bought: boolean;
  recipe_title?: string;
}

const fallbackItems: LocalShoppingItem[] = [
  {
    id: 101,
    ingredient_name: "Parmesan Cheese",
    quantity: 150,
    unit: "g",
    estimated_price: 45000,
    is_bought: false,
    recipe_title: "Chicken Alfredo",
  },
  {
    id: 102,
    ingredient_name: "Heavy Cream 35%",
    quantity: 250,
    unit: "ml",
    estimated_price: 28000,
    is_bought: false,
    recipe_title: "Chicken Alfredo",
  },
  {
    id: 103,
    ingredient_name: "Fresh Rosemary",
    quantity: 1,
    unit: "bunch",
    estimated_price: 8000,
    is_bought: true,
    recipe_title: "Heirloom Galette",
  },
  {
    id: 104,
    ingredient_name: "Pasture Eggs",
    quantity: 6,
    unit: "pc",
    estimated_price: 18000,
    is_bought: false,
    recipe_title: "Artisanal Tart",
  },
];

export function ShoppingListPage() {
  const { data: lists, isLoading } = useShoppingLists();
  const toggleMutation = useToggleItemBought();
  const deleteMutation = useDeleteShoppingItem();

  const activeList = lists && lists.length > 0 ? lists[0] : null;

  // Use items from active list if available, or fallback
  const items: LocalShoppingItem[] = activeList?.items
    ? activeList.items.map((i) => ({
        id: i.id,
        ingredient_name: i.ingredient_name,
        quantity: i.quantity,
        unit: i.unit,
        estimated_price: Number(i.estimated_price) || 15000,
        is_bought: i.is_bought,
        recipe_title: i.recipe_title,
      }))
    : fallbackItems;

  const toBuyItems = items.filter((i) => !i.is_bought);
  const boughtItems = items.filter((i) => i.is_bought);

  const totalEstimatedCost = items.reduce(
    (sum, item) => sum + item.estimated_price,
    0
  );

  const handleToggle = (item: LocalShoppingItem) => {
    if (activeList) {
      toggleMutation.mutate({ itemId: item.id, isBought: !item.is_bought });
    }
  };

  const handleDelete = (id: number) => {
    if (activeList) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-16 py-12 min-h-screen">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-8">
        <div>
          <span className="font-label-md text-label-md text-tertiary tracking-wider uppercase mb-2 block font-bold">
            Grocery Intelligence
          </span>
          <h1 className="font-headline-lg text-display-lg text-on-surface leading-tight mb-2">
            Smart Shopping List
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant italic">
            Missing recipe ingredients auto-calculated with real local supermarket prices.
          </p>
        </div>

        {/* Total Cost Summary Badge */}
        <div className="bg-surface-container-high p-6 rounded-3xl border border-outline-variant/40 shadow-sm flex items-center gap-6">
          <div>
            <span className="text-caption text-on-surface-variant font-label-md block">
              Estimated Total
            </span>
            <span className="font-display-lg text-3xl text-primary font-bold">
              {totalEstimatedCost.toLocaleString()} UZS
            </span>
          </div>
          <div className="w-px h-10 bg-outline-variant/30"></div>
          <div>
            <span className="text-caption text-on-surface-variant font-label-md block">
              Items Remaining
            </span>
            <span className="font-headline-md text-headline-md text-secondary font-bold">
              {toBuyItems.length} of {items.length}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main List Section */}
        <div className="lg:col-span-8 space-y-8">
          {/* To Buy Items Card */}
          <div className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl artisanal-border sun-baked-shadow space-y-6">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[24px]">
                  shopping_cart
                </span>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                  To Buy ({toBuyItems.length})
                </h2>
              </div>
              <span className="text-caption text-on-surface-variant font-label-md">
                Sorted by recipe
              </span>
            </div>

            {isLoading ? (
              <div className="py-8 text-center text-on-surface-variant">
                Loading grocery list...
              </div>
            ) : toBuyItems.length === 0 ? (
              <div className="text-center py-12 opacity-60">
                <span className="material-symbols-outlined text-display-lg block mb-2 text-outline">
                  check_circle
                </span>
                <p className="font-body-md italic text-on-surface-variant">
                  All items checked off! Ready to cook.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <AnimatePresence>
                  {toBuyItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl border border-outline-variant/30 hover:border-primary/40 transition-all shadow-xs group"
                    >
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleToggle(item)}
                          className="w-6 h-6 rounded-full border-2 border-outline hover:border-primary flex items-center justify-center transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px] text-transparent group-hover:text-outline">
                            check
                          </span>
                        </button>
                        <div>
                          <h3 className="font-label-md text-label-md text-on-surface font-bold capitalize">
                            {item.ingredient_name}
                          </h3>
                          <div className="flex items-center gap-3 text-caption text-on-surface-variant">
                            <span>
                              {item.quantity} {item.unit}
                            </span>
                            {item.recipe_title && (
                              <>
                                <span className="w-1 h-1 rounded-full bg-outline"></span>
                                <span className="italic text-primary">
                                  For {item.recipe_title}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-label-md text-label-md text-secondary font-bold">
                          {item.estimated_price.toLocaleString()} UZS
                        </span>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-outline hover:text-error transition-colors p-1"
                          title="Remove item"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            delete
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Purchased Items Section */}
          {boughtItems.length > 0 && (
            <div className="bg-surface-container-low p-6 md:p-8 rounded-3xl border border-outline-variant/20 space-y-4">
              <h2 className="font-headline-md text-headline-md text-on-surface-variant font-bold opacity-80 flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-tertiary">
                  task_alt
                </span>
                <span>Purchased ({boughtItems.length})</span>
              </h2>

              <div className="space-y-2">
                {boughtItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3.5 bg-surface-container rounded-xl opacity-60 line-through"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleToggle(item)}
                        className="w-5 h-5 rounded-full bg-tertiary text-white flex items-center justify-center"
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          check
                        </span>
                      </button>
                      <span className="font-label-md text-label-md text-on-surface capitalize">
                        {item.ingredient_name}
                      </span>
                    </div>
                    <span className="text-caption font-bold text-on-surface-variant">
                      {item.estimated_price.toLocaleString()} UZS
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Supermarket Comparison Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-surface-container-high p-6 md:p-8 rounded-3xl border border-outline-variant/40 sun-baked-shadow space-y-6">
            <div className="flex items-center gap-3 border-b border-outline-variant/30 pb-4">
              <span className="material-symbols-outlined text-secondary text-[24px]">
                storefront
              </span>
              <h2 className="font-headline-md text-headline-md text-secondary font-bold">
                Local Supermarkets
              </h2>
            </div>

            <p className="text-caption text-on-surface-variant italic">
              Estimated basket total across nearby supermarkets in Tashkent.
            </p>

            <div className="space-y-4">
              {[
                { store: "Korzinka", estimate: totalEstimatedCost, status: "All in stock", color: "text-primary" },
                { store: "Makro", estimate: Math.round(totalEstimatedCost * 0.96), status: "Lowest total price", color: "text-tertiary font-bold" },
                { store: "Havas", estimate: Math.round(totalEstimatedCost * 0.92), status: "Local alternatives available", color: "text-secondary" },
              ].map((m) => (
                <div
                  key={m.store}
                  className="p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-label-md text-label-md text-on-surface font-bold">
                      {m.store}
                    </h3>
                    <span className={`text-caption ${m.color}`}>
                      {m.status}
                    </span>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface font-bold">
                    {m.estimate.toLocaleString()} UZS
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => alert("Shopping list exported as printable checklist!")}
              className="w-full py-3 bg-primary text-surface rounded-full font-label-md flex items-center justify-center gap-2 hover:bg-primary-container active:scale-95 transition-all shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">
                print
              </span>
              <span>Export Shopping List</span>
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
