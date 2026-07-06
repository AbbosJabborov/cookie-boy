import { CheckCircle2, AlertTriangle } from "lucide-react";

import type { ShoppingItem as Item } from "@/types/shopping";

interface Props {
  item: Item;
}

export default function ShoppingItem({ item }: Props) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium">{item.ingredient}</h4>

          <p className="text-muted-foreground text-sm">{item.amount}</p>
        </div>

        {item.available ? (
          <CheckCircle2 className="text-green-500" />
        ) : (
          <AlertTriangle className="text-yellow-500" />
        )}
      </div>

      {item.product && <p className="mt-2 text-sm">Product: {item.product}</p>}

      {!item.available && item.replacement && (
        <div className="bg-muted mt-3 rounded-lg p-3">
          <p className="text-sm font-medium">🤖 Suggested replacement</p>

          <p>{item.replacement}</p>
        </div>
      )}

      {item.price && <p className="mt-3 font-semibold">{item.price} UZS</p>}
    </div>
  );
}
