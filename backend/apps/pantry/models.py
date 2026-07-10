from django.conf import settings
from django.db import models
from apps.core.choices import Unit
from ..ingredients.models import Ingredient


class PantryItem(models.Model):

    class Unit(models.TextChoices):
            GRAM = "g", "Gram"
            KILOGRAM = "kg", "Kilogram"
            MILLILITER = "ml", "Milliliter"
            LITER = "l", "Liter"
            PIECE = "pc", "Piece"
            TABLESPOON = "tbsp", "Tablespoon"
            TEASPOON = "tsp", "Teaspoon"

    user = models.ForeignKey(
            settings.AUTH_USER_MODEL,
            on_delete=models.CASCADE,
            related_name="pantry_items",
        )

    ingredient = models.ForeignKey(
            Ingredient,
            on_delete=models.CASCADE,
            related_name="pantry_items",
        )

    quantity = models.DecimalField(
            max_digits=10,
            decimal_places=2,
        )

    unit = models.CharField(
            max_length=10,
            choices=Unit.choices,
        )

    expiration_date = models.DateField(
            blank=True,
            null=True,
        )

    created_at = models.DateTimeField(
            auto_now_add=True,
        )

    updated_at = models.DateTimeField(
            auto_now=True,
        )

    class Meta:
            ordering = ["expiration_date"]

    def __str__(self):
            return f"{self.ingredient.name} ({self.quantity} {self.unit})"
