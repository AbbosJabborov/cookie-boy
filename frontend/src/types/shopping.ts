export interface ShoppingItem {
  ingredient: string;
  amount: string;

  available: boolean;

  price: number | null;

  product: string | null;

  replacement: string | null;
}

export interface ShoppingResponse {
  estimated_cost: number;
  currency: string;
  items: ShoppingItem[];
}
