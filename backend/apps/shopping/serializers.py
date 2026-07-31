from rest_framework import serializers
from .models import ShoppingList, ShoppingListItem


class ShoppingListItemSerializer(serializers.ModelSerializer):
    recipe_title = serializers.CharField(source="recipe.title", read_only=True)

    class Meta:
        model = ShoppingListItem
        fields = (
            "id",
            "shopping_list",
            "ingredient",
            "ingredient_name",
            "quantity",
            "unit",
            "estimated_price",
            "is_bought",
            "recipe",
            "recipe_title",
            "created_at",
        )
        read_only_fields = ("id", "created_at")


class ShoppingListSerializer(serializers.ModelSerializer):
    items = ShoppingListItemSerializer(many=True, read_only=True)
    total_estimated_price = serializers.ReadOnlyField()

    class Meta:
        model = ShoppingList
        fields = (
            "id",
            "user",
            "name",
            "created_at",
            "updated_at",
            "is_completed",
            "total_estimated_price",
            "items",
        )
        read_only_fields = ("id", "user", "created_at", "updated_at")
