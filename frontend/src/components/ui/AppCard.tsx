import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AppCardProps {
    children: ReactNode;
    className?: string;
}

export function AppCard({
    children,
    className,
}: AppCardProps) {
    return (
        <div
            className={cn(
                "rounded-[28px] border border-white/40 bg-white/60 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,.08)]",
                className
            )}
        >
            {children}
        </div>
    );
}
