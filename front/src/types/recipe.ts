export interface RecipeIngredient {
  id: number;
  ingredient_name: string;
  amount: string;
  suggested_product_name?: string;
}

export interface Recipe {
  id: number;

  title: string;

  description: string;

  servings: number;

  prep_time: number;

  cook_time: number;

  total_time: number;

  difficulty: string;

  image: string | null;

  instructions: string;

  ingredients: RecipeIngredient[];
}
