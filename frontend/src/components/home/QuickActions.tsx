import { Button } from "@/components/ui/button";

export default function QuickActions() {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-4">
      <Button variant="secondary">🍽️ Cook with what I have</Button>

      <Button variant="secondary">💰 Cook on a budget</Button>

      <Button variant="secondary">🛒 Browse recipes</Button>
    </div>
  );
}
