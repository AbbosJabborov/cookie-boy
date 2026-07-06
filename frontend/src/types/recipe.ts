export interface Ingredient {
  id: number;
  ingredient_name: string;
  amount: string;
}

export interface Recipe {
  id: number;
  title: string;
  description: string;
  prep_time: number;
  cook_time: number;
  total_time: number;
  servings: number;
  difficulty: string;
  image: string | null;

  instructions: string;

  ingredients: Ingredient[];
}
