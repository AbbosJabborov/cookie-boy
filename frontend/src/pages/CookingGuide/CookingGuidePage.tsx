import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useRecipe } from "@/hooks/useRecipe";

interface Step {
  stepNumber: number;
  title: string;
  durationMinutes: number;
  instruction: string;
  chefSecret: string;
  equipment: string[];
  image: string;
}

const fallbackSteps: Step[] = [
  {
    stepNumber: 1,
    title: "Prepare the Ingredients",
    durationMinutes: 10,
    instruction:
      "Wash, chop, and measure out all fresh produce, spices, and proteins before applying heat.",
    chefSecret:
      "Having your mis en place completely ready ensures perfect timing and no burnt garlic or spices.",
    equipment: ["Cutting Board", "Chef's Knife"],
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80",
  },
  {
    stepNumber: 2,
    title: "Sauté & Sear",
    durationMinutes: 15,
    instruction:
      "Heat olive oil in a heavy-bottom skillet. Sear ingredients on medium-high until golden and fragrant.",
    chefSecret:
      "Do not overcrowd the pan; leave space so ingredients brown rather than steam.",
    equipment: ["Cast Iron Skillet", "Wooden Spoon"],
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    stepNumber: 3,
    title: "Simmer & Infuse",
    durationMinutes: 20,
    instruction:
      "Add stock or liquid, lower heat to a gentle simmer, cover, and let flavors meld deeply.",
    chefSecret:
      "Low and slow simmering breaks down tough fibers and concentrates natural umami.",
    equipment: ["Dutch Oven", "Lid"],
    image:
      "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=1000&q=80",
  },
  {
    stepNumber: 4,
    title: "Garnish & Plate",
    durationMinutes: 5,
    instruction:
      "Finish with fresh herbs, a splash of extra virgin olive oil, and sea salt flakes. Serve immediately warm.",
    chefSecret:
      "A touch of acid (lemon juice or vinegar) right at the end brightens all rich flavors.",
    equipment: ["Plating Dish", "Tongs"],
    image:
      "https://images.unsplash.com/photo-1590577976322-3d2d6e2130d5?auto=format&fit=crop&w=1000&q=80",
  },
];

export function CookingGuidePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const recipeId = id ? parseInt(id, 10) : 0;

  const { data: apiRecipe, isLoading } = useRecipe(recipeId);

  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  // If apiRecipe has instructions (which might be a string or list), parse steps
  const steps: Step[] = apiRecipe
    ? (() => {
        const rawInstructions = apiRecipe.instructions;
        let parsedList: string[] = [];
        if (Array.isArray(rawInstructions)) {
          parsedList = rawInstructions;
        } else if (typeof rawInstructions === "string") {
          parsedList = rawInstructions
            .split(/\n+|\d+\.\s+/)
            .map((s) => s.trim())
            .filter(Boolean);
        }
        if (parsedList.length === 0) parsedList = ["Follow general cooking instructions for this dish."];

        return parsedList.map((inst, index) => ({
          stepNumber: index + 1,
          title: `Step ${index + 1}: ${apiRecipe.title}`,
          durationMinutes: Math.max(5, Math.floor((apiRecipe.cook_time || 20) / parsedList.length)),
          instruction: inst,
          chefSecret: "Season each layer lightly as you cook rather than only at the end.",
          equipment: apiRecipe.ingredients?.slice(0, 3).map((i: any) => i.ingredient_name || "Utensil") || ["Skillet", "Knife"],
          image:
            apiRecipe.image ||
            "https://images.unsplash.com/photo-1590577976322-3d2d6e2130d5?auto=format&fit=crop&w=1000&q=80",
        }));
      })()
    : fallbackSteps;

  const currentStep = steps[currentStepIdx] || steps[0];

  const [timeLeft, setTimeLeft] = useState(currentStep.durationMinutes * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    setTimeLeft(currentStep.durationMinutes * 60);
    setIsTimerRunning(false);
  }, [currentStepIdx, currentStep.durationMinutes]);

  useEffect(() => {
    let timerId: ReturnType<typeof setInterval> | null = null;
    if (isTimerRunning) {
      timerId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerId!);
            setIsTimerRunning(false);
            alert(`Step ${currentStep.stepNumber} timer complete!`);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isTimerRunning, currentStep.stepNumber]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleNextStep = () => {
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx((prev) => prev - 1);
    }
  };

  const progressPercentage = ((currentStepIdx + 1) / steps.length) * 100;

  if (isLoading) {
    return (
      <div className="max-w-[1280px] mx-auto px-6 py-24 text-center font-body-lg text-on-surface-variant">
        Loading recipe instructions...
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-16 py-8 min-h-screen">
      <div className="grid grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual & Equipment Bento */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-8">
          {/* Dish Hero Image Card */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] shadow-sm group artisanal-border">
            <img
              src={currentStep.image}
              alt={currentStep.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <h1 className="font-headline-lg text-headline-lg text-white font-bold">
                {apiRecipe ? apiRecipe.title : "Artisanal Culinary Experience"}
              </h1>
              <p className="text-white/80 font-body-md">
                Step {currentStep.stepNumber} of {steps.length}: {currentStep.title}
              </p>
            </div>
            {/* Top Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-white/20">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Bento Equipment & Chef Secret Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Equipment / Ingredients Card */}
            <div className="bg-surface-container rounded-2xl p-6 flex flex-col gap-4 artisanal-border sun-baked-shadow">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-[24px]">
                  kitchen
                </span>
                <h3 className="font-headline-md text-headline-md text-secondary">
                  Key Ingredients
                </h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {currentStep.equipment.map((item, idx) => (
                  <li
                    key={idx}
                    className="bg-secondary-container/40 px-3.5 py-1.5 rounded-full text-on-secondary-container font-label-md text-caption flex items-center gap-2 capitalize"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      flatware
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Chef Secrets Card */}
            <div className="bg-surface-container-high rounded-2xl p-6 flex flex-col gap-4 artisanal-border sun-baked-shadow">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[24px]">
                  auto_awesome
                </span>
                <h3 className="font-headline-md text-headline-md text-primary">
                  Chef's Secret
                </h3>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed italic">
                "{currentStep.chefSecret}"
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Instruction & Timer Panel */}
        <aside className="col-span-12 lg:col-span-5 flex flex-col gap-8">
          <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 border border-outline-variant/30 flex flex-col gap-6 shadow-sm sticky top-28">
            <div className="flex justify-between items-start">
              <span className="font-display-lg text-primary/30 text-6xl font-bold leading-none">
                {currentStep.stepNumber < 10
                  ? `0${currentStep.stepNumber}`
                  : currentStep.stepNumber}
              </span>
              <div className="flex gap-2">
                <button
                  disabled={currentStepIdx === 0}
                  onClick={handlePrevStep}
                  className="w-10 h-10 rounded-full border border-outline flex items-center justify-center text-outline hover:bg-primary-fixed hover:text-primary transition-colors active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Previous step"
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button
                  disabled={currentStepIdx === steps.length - 1}
                  onClick={handleNextStep}
                  className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-container transition-colors active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                  aria-label="Next step"
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.stepNumber}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col gap-4"
              >
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                  {currentStep.title}
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  {currentStep.instruction}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Step Timer Widget */}
            <div className="mt-2 p-6 md:p-8 bg-surface-container rounded-2xl flex flex-col items-center gap-4 border border-primary/10 sun-baked-shadow">
              <span className="font-label-md uppercase tracking-widest text-secondary opacity-70 text-caption font-semibold">
                Step Duration
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-display-lg text-5xl md:text-6xl text-primary font-bold tracking-tight">
                  {formatTime(timeLeft)}
                </span>
                <span className="font-headline-md text-primary/40">min</span>
              </div>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`mt-2 w-full py-3.5 rounded-xl font-label-md flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xs ${
                  isTimerRunning
                    ? "bg-error text-white hover:bg-error/90"
                    : "bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container"
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">
                  {isTimerRunning ? "pause" : "play_arrow"}
                </span>
                <span>{isTimerRunning ? "Pause Timer" : "Start Timer"}</span>
              </button>
            </div>

            {/* Panel Links */}
            <div className="flex justify-between items-center pt-4 border-t border-outline-variant/20">
              <button
                onClick={() => navigate("/")}
                className="font-label-md text-on-surface-variant flex items-center gap-2 hover:text-primary transition-colors text-label-md"
              >
                <span className="material-symbols-outlined text-[18px]">
                  list_alt
                </span>
                Full Recipe
              </button>
              <button
                onClick={() => alert("Recipe progress shared!")}
                className="font-label-md text-on-surface-variant flex items-center gap-2 hover:text-primary transition-colors text-label-md"
              >
                <span className="material-symbols-outlined text-[18px]">
                  share
                </span>
                Share Progress
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
