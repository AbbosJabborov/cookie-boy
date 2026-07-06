import { api } from "@/lib/axios";
import type { ShoppingResponse } from "@/types/shopping";

export async function getShopping(recipeId: number) {
  const { data } = await api.get<ShoppingResponse>(
    `recipes/${recipeId}/shopping/`,
  );

  return data;
}
