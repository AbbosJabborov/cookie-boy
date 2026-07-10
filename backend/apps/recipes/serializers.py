from rest_framework import serializers

from .models import Recipe
from .models import RecipeIngredient


class RecipeIngredientSerializer(serializers.ModelSerializer):
    ingredient_name = serializers.CharField(
        source="ingredient.name",
        read_only=True,
    )

    class Meta:
        model = RecipeIngredient
        fields = (
            "id",
            "ingredient",
            "ingredient_name",
            "quantity",
            "unit",
            "optional",
            "suggested_product",
        )


class RecipeSerializer(serializers.ModelSerializer):
    ingredients = RecipeIngredientSerializer(
        many=True,
        read_only=True,
    )

    total_time = serializers.ReadOnlyField()

    class Meta:
        model = Recipe
        fields = (
            "id",
            "title",
            "description",
            "servings",
            "prep_time",
            "cook_time",
            "total_time",
            "difficulty",
            "instructions",
            "image",
            "ingredients",
        )
