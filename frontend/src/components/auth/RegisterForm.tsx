    import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { User, Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useRegister } from "@/hooks/useRegister";

import {
    registerSchema,
} from "@/lib/validation";

import type {
    RegisterFormData,
} from "@/lib/validation";

import { AppCard } from "@/components/ui/AppCard";
import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";

export function RegisterForm() {

    const navigate = useNavigate();

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
        >
            <AppCard className="space-y-6 p-8 w-[460px]">

                <div>
                    <h1 className="text-3xl font-bold">
                        Create account
                    </h1>

                    <p className="text-muted-foreground mt-2">
                        Start cooking smarter.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >

                    <div className="relative">
                        <User
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                        />

                        <AppInput
                            {...register("username")}
                            placeholder="Username"
                            className="pl-11"
                        />
                    </div>

                    <p className="text-sm text-red-500">
                        {errors.username?.message}
                    </p>

                    <div className="relative">
                        <Mail
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                        />

                        <AppInput
                            {...register("email")}
                            placeholder="Email"
                            className="pl-11"
                        />
                    </div>

                    <p className="text-sm text-red-500">
                        {errors.email?.message}
                    </p>

                    <div className="relative">
                        <Lock
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                        />

                        <AppInput
                            type="password"
                            {...register("password")}
                            placeholder="Password"
                            className="pl-11"
                        />
                    </div>

                    <p className="text-sm text-red-500">
                        {errors.password?.message}
                    </p>

                    <div className="relative">
                        <Lock
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                        />

                        <AppInput
                            type="password"
                            {...register("confirmPassword")}
                            placeholder="Confirm password"
                            className="pl-11"
                        />
                    </div>

                    <p className="text-sm text-red-500">
                        {errors.confirmPassword?.message}
                    </p>

                    <AppButton
                        type="submit"
                        className="w-full"
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending
                            ? "Creating..."
                            : "Create account"}
                    </AppButton>

                </form>

                <button
                    onClick={() => navigate("/login")}
                    className="text-sm text-green-700 font-semibold"
                >
                    Already have an account? Sign in
                </button>

            </AppCard>
        </motion.div>
    );
}
