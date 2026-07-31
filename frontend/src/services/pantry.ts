import { api } from "./api";

export interface PantryItemData {
  id?: number;
  ingredient: number;
  ingredient_name?: string;
  quantity: number;
  unit: string;
  expiration_date?: string | null;
}

export async function getPantryItems(): Promise<PantryItemData[]> {
  const response = await api.get<PantryItemData[]>("pantry/");
  return response.data;
}

export async function addPantryItem(item: {
  ingredient: number;
  quantity: number;
  unit: string;
  expiration_date?: string;
}): Promise<PantryItemData> {
  const response = await api.post<PantryItemData>("pantry/", item);
  return response.data;
}

export async function deletePantryItem(id: number): Promise<void> {
  await api.delete(`pantry/${id}/`);
}
