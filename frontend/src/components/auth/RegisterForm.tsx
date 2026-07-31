import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

import { useRegister } from "@/hooks/useRegister";
import { registerSchema, type RegisterFormData } from "@/lib/validation";

export function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const mutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate(
      {
        username: data.username,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess() {
          navigate("/login");
        },
      }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md"
    >
      <div className="bg-surface-container-lowest p-8 md:p-10 rounded-3xl artisanal-border sun-baked-shadow space-y-6">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Create an account
          </h2>
          <p className="font-body-md text-on-surface-variant italic mt-1">
            Start cooking smarter with your custom pantry & meal planner.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <div className="space-y-1">
            <label className="font-label-md text-label-md text-on-surface">
              Username
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                person
              </span>
              <input
                {...register("username")}
                type="text"
                placeholder="Choose a username"
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl py-3 pl-11 pr-4 text-body-md text-on-surface outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            {errors.username && (
              <p className="text-caption text-error font-semibold">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="font-label-md text-label-md text-on-surface">
              Email Address
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                mail
              </span>
              <input
                {...register("email")}
                type="email"
                placeholder="you@example.com"
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl py-3 pl-11 pr-4 text-body-md text-on-surface outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            {errors.email && (
              <p className="text-caption text-error font-semibold">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="font-label-md text-label-md text-on-surface">
              Password
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                lock
              </span>
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl py-3 pl-11 pr-11 text-body-md text-on-surface outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors p-1"
                aria-label="Toggle password visibility"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
            {errors.password && (
              <p className="text-caption text-error font-semibold">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="font-label-md text-label-md text-on-surface">
              Confirm Password
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                lock_reset
              </span>
              <input
                {...register("confirmPassword")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl py-3 pl-11 pr-4 text-body-md text-on-surface outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-caption text-error font-semibold">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {mutation.isError && (
            <div className="p-3 bg-error-container/40 rounded-xl border border-error/20 text-on-error-container text-caption font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">
                error
              </span>
              <span>Registration failed. Username or email may already be taken.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full mt-2 py-3.5 bg-primary text-surface rounded-full font-label-md text-label-md hover:bg-primary-container active:scale-[0.98] transition-all disabled:opacity-50 sun-baked-shadow flex items-center justify-center gap-2"
          >
            {mutation.isPending ? (
              <span>Creating account...</span>
            ) : (
              <>
                <span>Create Account</span>
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </>
            )}
          </button>
        </form>

        <p className="text-center text-body-md text-on-surface-variant pt-2 border-t border-outline-variant/30">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-bold text-primary hover:underline ml-1"
          >
            Sign in
          </button>
        </p>
      </div>
    </motion.div>
  );
}
