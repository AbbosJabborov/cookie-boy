from apps.products.models import Product
from django.db import models

from apps.ingredients.models import Ingredient
from apps.pantry.models import PantryItem
from apps.core.choices import Unit


class Recipe(models.Model):
    class Difficulty(models.TextChoices):
        EASY = "easy", "Easy"
        MEDIUM = "medium", "Medium"
        HARD = "hard", "Hard"

    title = models.CharField(max_length=255)

    description = models.TextField(blank=True)

    servings = models.PositiveIntegerField(default=2)

    prep_time = models.PositiveIntegerField(help_text="Minutes")

    cook_time = models.PositiveIntegerField(help_text="Minutes")

    difficulty = models.CharField(
        max_length=10,
        choices=Difficulty.choices,
        default=Difficulty.EASY,
    )

    image = models.ImageField(
        upload_to="recipes/",
        blank=True,
        null=True,
    )

    instructions = models.TextField(default=list)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["title"]

    @property
    def total_time(self):
        return self.prep_time + self.cook_time

    def __str__(self):
        return self.title


class RecipeIngredient(models.Model):

    recipe = models.ForeignKey(
        Recipe,
        on_delete=models.CASCADE,
        related_name="ingredients",
    )

    ingredient = models.ForeignKey(
        Ingredient,
        on_delete=models.CASCADE,
        related_name="recipe_ingredients",
    )

    quantity = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    unit = models.CharField(
        max_length=10,
        choices=Unit.choices,
    )

    optional = models.BooleanField(default=False)

    suggested_product = models.ForeignKey(
        Product,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    def __str__(self):
        return f"{self.recipe.title} - {self.ingredient.name}"
