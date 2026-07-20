import { AppLogo } from "@/components/ui/AppLogo";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-background">

            <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-2">

                {/* Left */}

                <div className="hidden items-center justify-center p-12 lg:flex">

                    <img
                        src="/images/login-food.jpg"
                        alt="Food"
                        className="h-[85%] w-full rounded-[36px] object-cover shadow-2xl"
                    />

                </div>

                {/* Right */}

                <div className="flex items-center justify-center p-8">

                    <div className="w-full max-w-md space-y-8">

                        <AppLogo />

                        <LoginForm />

                    </div>

                </div>

            </div>

        </main>
    );
}
