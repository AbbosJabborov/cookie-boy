from apps.products.models import Product
from django.db import models


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

    instructions = models.TextField()

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

    ingredient_name = models.CharField(max_length=255)

    amount = models.CharField(max_length=50)

    suggested_product = models.ForeignKey(
        Product,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    optional = models.BooleanField(default=False)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return f"{self.ingredient_name} ({self.amount})"
