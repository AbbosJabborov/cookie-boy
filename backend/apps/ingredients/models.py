from django.db import models
from apps.core.choices import IngredientCategory

class Ingredient(models.Model):


    name = models.CharField(
        max_length=150,
        unique=True,
    )

    category = models.CharField(
        max_length=20,
        choices=IngredientCategory.choices,
        default=IngredientCategory.OTHER,
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]
