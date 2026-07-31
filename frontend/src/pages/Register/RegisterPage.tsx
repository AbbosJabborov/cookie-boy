import { AppLogo } from "@/components/ui/AppLogo";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-surface flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-12 min-h-[640px] rounded-3xl overflow-hidden artisanal-border sun-baked-shadow bg-surface-container-low">
        {/* Left Side: Culinary Imagery & Quote */}
        <div className="lg:col-span-6 relative hidden lg:flex flex-col justify-between p-12 overflow-hidden bg-surface-container">
          <img
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80"
            alt="Artisanal Sourdough & Harvest"
            className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20"></div>

          <div className="relative z-10">
            <AppLogo />
          </div>

          <div className="relative z-10 text-white space-y-3">
            <blockquote className="font-display-lg text-3xl font-medium leading-snug italic">
              "Turn your daily pantry selection into an extraordinary culinary experience."
            </blockquote>
            <p className="font-caption text-caption text-white/80 uppercase tracking-widest font-semibold">
              — The Plate Artisanal Kitchen
            </p>
          </div>
        </div>

        {/* Right Side: Form View */}
        <div className="lg:col-span-6 p-6 sm:p-10 md:p-12 flex flex-col justify-center items-center bg-surface">
          <div className="w-full max-w-md space-y-6">
            <div className="lg:hidden flex justify-center mb-4">
              <AppLogo />
            </div>
            <RegisterForm />
          </div>
        </div>
      </div>
    </main>
  );
}
