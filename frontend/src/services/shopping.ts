import { api } from "./api";

export interface ShoppingItem {
  id: number;
  shopping_list: number;
  ingredient: number | null;
  ingredient_name: string;
  quantity: string | number;
  unit: string;
  estimated_price: string | number;
  is_bought: boolean;
  recipe: number | null;
  recipe_title?: string;
  created_at: string;
}

export interface ShoppingList {
  id: number;
  user: number;
  name: string;
  created_at: string;
  updated_at: string;
  is_completed: boolean;
  total_estimated_price: number;
  items: ShoppingItem[];
}

export async function getShoppingLists(): Promise<ShoppingList[]> {
  const response = await api.get<ShoppingList[]>("shopping/lists/");
  return response.data;
}

export async function addMissingIngredientsFromRecipe(recipeId: number): Promise<{
  message: string;
  shopping_list: ShoppingList;
}> {
  const response = await api.post("shopping/lists/add-from-recipe/", {
    recipe_id: recipeId,
  });
  return response.data;
}

export async function toggleShoppingItemBought(
  itemId: number,
  isBought: boolean
): Promise<ShoppingItem> {
  const response = await api.patch<ShoppingItem>(`shopping/items/${itemId}/`, {
    is_bought: isBought,
  });
  return response.data;
}

export async function deleteShoppingItem(itemId: number): Promise<void> {
  await api.delete(`shopping/items/${itemId}/`);
}
