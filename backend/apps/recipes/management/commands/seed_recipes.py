from django.core.management.base import BaseCommand

from apps.ingredients.models import Ingredient
from apps.recipes.models import Recipe
from apps.recipes.models import RecipeIngredient

RECIPES = [
    {
        "title": "Scrambled Eggs",
        "description": "Simple creamy scrambled eggs.",
        "servings": 2,
        "prep_time": 5,
        "cook_time": 5,
        "difficulty": "easy",
        "instructions": "Whisk eggs. Melt butter. Cook while stirring.",
        "ingredients": [
            ("Egg", 4, "pc"),
            ("Butter", 15, "g"),
            ("Salt", 1, "tsp"),
            ("Black Pepper", 0.5, "tsp"),
        ],
    },
    {
        "title": "French Toast",
        "description": "Golden breakfast toast.",
        "servings": 2,
        "prep_time": 10,
        "cook_time": 10,
        "difficulty": "easy",
        "instructions": "Mix eggs and milk. Dip bread. Fry in butter.",
        "ingredients": [
            ("Bread", 4, "pc"),
            ("Egg", 2, "pc"),
            ("Milk", 100, "ml"),
            ("Butter", 20, "g"),
            ("Cinnamon", 1, "tsp"),
        ],
    },
    {
        "title": "Oatmeal",
        "description": "Healthy breakfast.",
        "servings": 1,
        "prep_time": 2,
        "cook_time": 8,
        "difficulty": "easy",
        "instructions": "Cook oats with milk. Serve warm.",
        "ingredients": [
            ("Oats", 80, "g"),
            ("Milk", 250, "ml"),
            ("Honey", 1, "tbsp"),
        ],
    },
    {
        "title": "Avocado Toast",
        "description": "Healthy toast with avocado.",
        "servings": 1,
        "prep_time": 5,
        "cook_time": 2,
        "difficulty": "easy",
        "instructions": "Toast bread. Mash avocado. Season.",
        "ingredients": [
            ("Bread", 2, "pc"),
            ("Avocado", 1, "pc"),
            ("Salt", 0.5, "tsp"),
            ("Black Pepper", 0.5, "tsp"),
        ],
    },
    {
        "title": "Spaghetti Carbonara",
        "description": "Classic Italian pasta.",
        "servings": 2,
        "prep_time": 15,
        "cook_time": 20,
        "difficulty": "medium",
        "instructions": "Cook pasta. Fry bacon. Mix with egg and parmesan.",
        "ingredients": [
            ("Spaghetti", 250, "g"),
            ("Bacon", 150, "g"),
            ("Egg", 2, "pc"),
            ("Parmesan", 60, "g"),
            ("Black Pepper", 1, "tsp"),
        ],
    },
    {
        "title": "Mac and Cheese",
        "description": "Creamy baked pasta.",
        "servings": 3,
        "prep_time": 15,
        "cook_time": 20,
        "difficulty": "easy",
        "instructions": "Cook pasta. Make cheese sauce. Combine.",
        "ingredients": [
            ("Pasta", 300, "g"),
            ("Cheddar Cheese", 200, "g"),
            ("Milk", 250, "ml"),
            ("Butter", 30, "g"),
        ],
    },
    {
        "title": "Alfredo Pasta",
        "description": "Creamy Alfredo.",
        "servings": 2,
        "prep_time": 10,
        "cook_time": 20,
        "difficulty": "medium",
        "instructions": "Cook pasta. Make Alfredo sauce.",
        "ingredients": [
            ("Pasta", 250, "g"),
            ("Cream", 200, "ml"),
            ("Parmesan", 80, "g"),
            ("Butter", 20, "g"),
            ("Garlic", 2, "pc"),
        ],
    },
    {
        "title": "Egg Fried Rice",
        "description": "Quick fried rice.",
        "servings": 2,
        "prep_time": 10,
        "cook_time": 15,
        "difficulty": "easy",
        "instructions": "Cook eggs. Fry rice. Mix together.",
        "ingredients": [
            ("Rice", 300, "g"),
            ("Egg", 3, "pc"),
            ("Soy Sauce", 2, "tbsp"),
            ("Peas", 80, "g"),
        ],
    },
    {
        "title": "Vegetable Fried Rice",
        "description": "Rice with vegetables.",
        "servings": 2,
        "prep_time": 10,
        "cook_time": 15,
        "difficulty": "easy",
        "instructions": "Cook vegetables. Add rice. Season.",
        "ingredients": [
            ("Rice", 300, "g"),
            ("Carrot", 1, "pc"),
            ("Peas", 100, "g"),
            ("Corn", 100, "g"),
            ("Soy Sauce", 2, "tbsp"),
        ],
    },
    {
        "title": "Uzbek Plov",
        "description": "Traditional Uzbek rice dish.",
        "servings": 6,
        "prep_time": 25,
        "cook_time": 60,
        "difficulty": "hard",
        "instructions": "Cook meat. Add carrots and onions. Add rice and simmer.",
        "ingredients": [
            ("Rice", 500, "g"),
            ("Beef", 500, "g"),
            ("Carrot", 3, "pc"),
            ("Onion", 2, "pc"),
            ("Garlic", 1, "pc"),
            ("Vegetable Oil", 100, "ml"),
            ("Cumin", 2, "tsp"),
        ],
    },
    {
        "title": "Achichuk Salad",
        "description": "Fresh Uzbek tomato salad.",
        "servings": 2,
        "prep_time": 10,
        "cook_time": 0,
        "difficulty": "easy",
        "instructions": "Slice vegetables and mix.",
        "ingredients": [
            ("Tomato", 3, "pc"),
            ("Onion", 1, "pc"),
            ("Salt", 1, "tsp"),
            ("Black Pepper", 0.5, "tsp"),
        ],
    },
]


class Command(BaseCommand):
    help = "Seed recipes"

    def handle(self, *args, **kwargs):

        created = 0

        for recipe_data in RECIPES:

            ingredients = recipe_data["ingredients"]

            recipe_defaults = {
                k: v
                for k, v in recipe_data.items()
                if k != "ingredients"
            }

            recipe, created = Recipe.objects.update_or_create(
                title=recipe_data["title"],
                defaults=recipe_defaults,
            )

            recipe.ingredients.all().delete()

            for ingredient_name, quantity, unit in ingredients:

                try:
                    ingredient = Ingredient.objects.get(name=ingredient_name)
                except Ingredient.DoesNotExist:
                    self.stdout.write(
                        self.style.ERROR(f"Missing ingredient: {ingredient_name}")
                    )
                    continue

                RecipeIngredient.objects.create(
                    recipe=recipe,
                    ingredient=ingredient,
                    quantity=quantity,
                    unit=unit,
                )


        self.stdout.write(
            self.style.SUCCESS(
                f"Created {created} recipes."
            )
        )
