import { api } from "./api";
import type { Recipe } from "@/types/recipe";

export interface RecommendationItem {
  recipe: Recipe;
  match_percentage: number;
  matching_ingredients_count: number;
  total_required_ingredients_count: number;
  missing_ingredients: Array<{
    id: number;
    name: string;
    suggested_product?: string;
  }>;
}

export async function getRecommendations(params?: {
  min_score?: number;
  difficulty?: string;
  max_time?: number;
}): Promise<RecommendationItem[]> {
  const response = await api.get<RecommendationItem[]>("recommendations/", {
    params,
  });
  return response.data;
}
