import { Search, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b bg-linear-to-b from-orange-50 via-white to-white">
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
          duration: 0.5,
        }}
      >
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 shadow-sm">
              <Sparkles className="text-orange-500" size={16} />

              <span className="text-sm font-medium">
                AI-powered grocery assistant
              </span>
            </div>

            <h1 className="text-6xl leading-tight font-black tracking-tight">
              Cook smarter.
              <br />
              Spend less.
            </h1>

            <p className="text-muted-foreground mt-8 text-xl">
              Find recipes using products available in your local supermarket,
              discover alternatives instantly, and never waste time searching
              shelves again.
            </p>

            <div className="mt-10 flex gap-3">
              <Input
                placeholder="I have chicken, butter and pasta..."
                className="h-14 rounded-xl text-lg"
              />

              <Button size="lg" className="h-14 px-8">
                <Search size={18} />
              </Button>
            </div>
          </div>
        </div>
      </motion.section>
    </section>
  );
}
