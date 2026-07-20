import { api } from "./api";
import type { Recipe } from "@/types/recipe";

export async function getRecipes(): Promise<Recipe[]> {
    const response = await api.get<Recipe[]>("recipes/");
    return response.data;
}

export async function getRecipe(
    id: number
): Promise<Recipe> {
    const response = await api.get<Recipe>(
        `recipes/${id}/`
    );

    return response.data;
}
