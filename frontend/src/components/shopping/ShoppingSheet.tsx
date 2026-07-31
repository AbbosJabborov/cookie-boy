import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import ShoppingItem from "./ShoppingItem";
import { useShoppingLists } from "@/hooks/useShopping";

interface Props {
  recipeId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ShoppingSheet({ recipeId: _recipeId, open, onOpenChange }: Props) {
  const { data: lists, isLoading } = useShoppingLists();
  const activeList = lists && lists.length > 0 ? lists[0] : null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[430px]">
        <SheetHeader>
          <SheetTitle>Shopping List</SheetTitle>
        </SheetHeader>

        {isLoading && <p className="mt-8">Loading...</p>}

        {activeList && (
          <>
            <div className="bg-primary text-primary-foreground mt-8 rounded-lg p-5">
              <p className="text-sm">Estimated Cost</p>

              <h2 className="mt-2 text-3xl font-bold">
                {activeList.total_estimated_price.toLocaleString()} UZS
              </h2>
            </div>

            <ScrollArea className="mt-6 h-[70vh]">
              <div className="space-y-4">
                {activeList.items.map((item) => (
                  <ShoppingItem key={item.id} item={item} />
                ))}
              </div>
            </ScrollArea>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
