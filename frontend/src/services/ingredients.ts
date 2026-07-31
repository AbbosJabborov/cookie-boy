import { api } from "./api";

export interface IngredientItem {
  id: number;
  name: string;
  category: string;
}

export async function getIngredients(): Promise<IngredientItem[]> {
  const response = await api.get<IngredientItem[]>("ingredients/");
  return response.data;
}
