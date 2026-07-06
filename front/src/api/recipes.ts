import client from "./client";

import type { Recipe } from "../types/recipe";

export async function getRecipes(): Promise<Recipe[]> {
  const { data } = await client.get<Recipe[]>("recipes/");

  return data;
}

export async function getRecipe(id: number): Promise<Recipe> {
  const { data } = await client.get<Recipe>(`recipes/${id}/`);

  return data;
}
