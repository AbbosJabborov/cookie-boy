import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { ScrollArea } from "@/components/ui/scroll-area";

import ShoppingItem from "./ShoppingItem";

import { useShopping } from "@/hooks/useShopping";

interface Props {
  recipeId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ShoppingSheet({ recipeId, open, onOpenChange }: Props) {
  const { data, isLoading } = useShopping(recipeId);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[430px]">
        <SheetHeader>
          <SheetTitle>Shopping List</SheetTitle>
        </SheetHeader>

        {isLoading && <p className="mt-8">Loading...</p>}

        {data && (
          <>
            <div className="bg-primary text-primary-foreground mt-8 rounded-lg p-5">
              <p className="text-sm">Estimated Cost</p>

              <h2 className="mt-2 text-3xl font-bold">
                {data.estimated_cost} {data.currency}
              </h2>
            </div>

            <ScrollArea className="mt-6 h-[70vh]">
              <div className="space-y-4">
                {data.items.map((item) => (
                  <ShoppingItem key={item.ingredient} item={item} />
                ))}
              </div>
            </ScrollArea>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
