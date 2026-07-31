import { CheckCircle2 } from "lucide-react";
import type { ShoppingItem as ServiceShoppingItem } from "@/services/shopping";

interface Props {
  item: ServiceShoppingItem;
}

export default function ShoppingItem({ item }: Props) {
  return (
    <div className="rounded-lg border p-4 bg-card text-card-foreground">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium text-base capitalize">{item.ingredient_name}</h4>
          <p className="text-muted-foreground text-sm">
            {item.quantity} {item.unit}
          </p>
        </div>

        {item.is_bought && (
          <CheckCircle2 className="text-green-500 w-5 h-5" />
        )}
      </div>

      <p className="mt-3 font-semibold text-primary">
        {Number(item.estimated_price).toLocaleString()} UZS
      </p>
    </div>
  );
}
