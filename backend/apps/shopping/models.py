from django.db import models
from django.conf import settings
from apps.ingredients.models import Ingredient
from apps.recipes.models import Recipe
from apps.core.choices import Unit


class ShoppingList(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="shopping_lists",
    )
    name = models.CharField(max_length=255, default="My Shopping List")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_completed = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]

    @property
    def total_estimated_price(self):
        return sum(item.estimated_price for item in self.items.all())

    def __str__(self):
        return f"{self.name} ({self.user.username})"


class ShoppingListItem(models.Model):
    shopping_list = models.ForeignKey(
        ShoppingList,
        on_delete=models.CASCADE,
        related_name="items",
    )
    ingredient = models.ForeignKey(
        Ingredient,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="shopping_items",
    )
    ingredient_name = models.CharField(max_length=255)
    quantity = models.DecimalField(max_digits=10, decimal_places=2, default=1.00)
    unit = models.CharField(max_length=20, choices=Unit.choices, default=Unit.PIECE)
    estimated_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    is_bought = models.BooleanField(default=False)
    recipe = models.ForeignKey(
        Recipe,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="shopping_items",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["is_bought", "id"]

    def __str__(self):
        return f"{self.ingredient_name} ({self.quantity} {self.unit})"
