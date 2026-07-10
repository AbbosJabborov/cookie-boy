from apps.pantry.models import PantryItem
from apps.recipes.models import Recipe


class RecommendationService:
    def __init__(self, user):
        self.user = user

    def recommend(
        self,
        min_score=0,
        difficulty=None,
        max_time=None,
    ):
        pantry_ids = set(
            PantryItem.objects.filter(user=self.user)
            .values_list("ingredient_id", flat=True)
        )

        recommendations = []

        recipes = Recipe.objects.prefetch_related(
            "ingredients__ingredient"
        )

        if difficulty:
            recipes = recipes.filter(
                difficulty=difficulty
            )

        for recipe in recipes:

            if (
                max_time is not None
                and recipe.total_time > max_time
            ):
                continue

            recipe_ingredients = list(
                recipe.ingredients.all()
            )

            total = len(recipe_ingredients)

            if total == 0:
                continue

            matched = 0
            missing = []
            matched_ingredients = []

            for item in recipe_ingredients:

                if item.ingredient_id in pantry_ids:
                    matched += 1
                    matched_ingredients.append(
                        item.ingredient.name
                    )
                else:
                    missing.append(
                        item.ingredient.name
                    )

            score = round(
                (matched / total) * 100
            )

            recommendations.append({
                "id": recipe.id,
                "title": recipe.title,
                "description": recipe.description,
                "difficulty": recipe.difficulty,
                "prep_time": recipe.prep_time,
                "cook_time": recipe.cook_time,
                "total_time": recipe.total_time,
                "score": score,
                "matched": matched,
                "total": total,
                "matched_ingredients": matched_ingredients,
                "missing": missing,
                "missing_count": len(missing),
                "can_cook": len(missing) == 0,
            })

        recommendations.sort(
            key=lambda r: r["score"],
            reverse=True,
        )

        return [
            recipe
            for recipe in recommendations
            if recipe["score"] >= min_score
        ]
