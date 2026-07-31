import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

import { useLogin } from "@/hooks/useLogin";
import { loginSchema, type LoginFormData } from "@/lib/validation";

export function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <div className="bg-surface-container-lowest p-8 md:p-10 rounded-3xl artisanal-border sun-baked-shadow space-y-6">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Welcome back
          </h2>
          <p className="font-body-md text-on-surface-variant italic mt-1">
            Cook with seasonal ingredients you already have.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username Input */}
          <div className="space-y-1.5">
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
                placeholder="Enter your username"
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl py-3 pl-11 pr-4 text-body-md text-on-surface outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            {errors.username && (
              <p className="text-caption text-error font-semibold">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="font-label-md text-label-md text-on-surface">
                Password
              </label>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Password reset instructions will be sent to your registered email.");
                }}
                className="text-caption text-primary hover:underline font-label-md"
              >
                Forgot password?
              </a>
            </div>
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

          {loginMutation.isError && (
            <div className="p-3 bg-error-container/40 rounded-xl border border-error/20 text-on-error-container text-caption font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">
                error
              </span>
              <span>Invalid username or password. Please try again.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full py-3.5 bg-primary text-surface rounded-full font-label-md text-label-md hover:bg-primary-container active:scale-[0.98] transition-all disabled:opacity-50 sun-baked-shadow flex items-center justify-center gap-2"
          >
            {loginMutation.isPending ? (
              <span>Signing in...</span>
            ) : (
              <>
                <span>Sign In</span>
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </>
            )}
          </button>
        </form>

        <p className="text-center text-body-md text-on-surface-variant pt-2 border-t border-outline-variant/30">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="font-bold text-primary hover:underline ml-1"
          >
            Create an account
          </button>
        </p>
      </div>
    </motion.div>
  );
}
