import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useLogin } from "@/hooks/useLogin";
import {
    loginSchema,
    type LoginFormData,
} from "@/lib/validation";

import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppInput } from "@/components/ui/AppInput";

export function LoginForm() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] =
        useState(false);

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
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.4,
            }}
        >
            <AppCard className="space-y-6 p-8">
                <div>
                    <h1 className="text-3xl font-bold">
                        Welcome back
                    </h1>

                    <p className="mt-2 text-muted-foreground">
                        Cook with ingredients you already have.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    {/* Username */}

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Username
                        </label>

                        <div className="relative">
                            <User
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                                size={18}
                            />

                            <AppInput
                                {...register("username")}
                                className="pl-11"
                                placeholder="Enter username"
                            />
                        </div>

                        {errors.username && (
                            <p className="text-sm text-red-500">
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Password
                        </label>

                        <div className="relative">
                            <Lock
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                                size={18}
                            />

                            <AppInput
                                {...register("password")}
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                className="pl-11 pr-11"
                                placeholder="••••••••"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors"
                            >
                                {showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>

                        {errors.password && (
                            <p className="text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {loginMutation.isError && (
                        <p className="text-sm text-red-500">
                            Invalid username or password.
                        </p>
                    )}

                    <AppButton
                        type="submit"
                        className="w-full"
                        disabled={
                            loginMutation.isPending
                        }
                    >
                        {loginMutation.isPending
                            ? "Signing in..."
                            : "Sign In"}
                    </AppButton>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <button
                        type="button"
                        onClick={() =>
                            navigate("/register")
                        }
                        className="font-semibold text-green-700 hover:underline"
                    >
                        Register
                    </button>
                </p>
            </AppCard>
        </motion.div>
    );
}
