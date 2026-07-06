from rest_framework import serializers

from .models import Recipe, RecipeIngredient


class RecipeIngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeIngredient
        fields = [
            "id",
            "ingredient_name",
            "amount",
            "optional",
        ]


class RecipeSerializer(serializers.ModelSerializer):
    ingredients = RecipeIngredientSerializer(
        many=True,
        read_only=True,
    )

    total_time = serializers.IntegerField(read_only=True)

    class Meta:
        model = Recipe
        fields = [
            "id",
            "title",
            "description",
            "servings",
            "prep_time",
            "cook_time",
            "total_time",
            "difficulty",
            "image",
            "instructions",
            "ingredients",
        ]
