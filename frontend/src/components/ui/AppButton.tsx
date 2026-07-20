import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props
    extends React.ComponentProps<typeof Button> {}

export function AppButton({
    className,
    ...props
}: Props) {
    return (
        <Button
        className={cn(
            "h-12 rounded-2xl bg-primary text-white hover:opacity-90 transition-all duration-200",
            className
        )}
            {...props}
        />
    );
}
