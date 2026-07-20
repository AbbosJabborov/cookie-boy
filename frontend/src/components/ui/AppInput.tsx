import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Props
    extends React.ComponentProps<typeof Input> {}

export function AppInput({
    className,
    ...props
}: Props) {
    return (
        <Input
        className={cn(
            "h-12 rounded-2xl bg-white/70 backdrop-blur-md border-neutral-200 focus-visible:ring-primary",
            className
        )}
            {...props}
        />
    );
}
