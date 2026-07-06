from rest_framework import serializers

from .models import Recipe, RecipeIngredient


class RecipeIngredientSerializer(serializers.ModelSerializer):
    suggested_product_name = serializers.CharField(
        source="suggested_product.name",
        read_only=True,
    )

    class Meta:
        model = RecipeIngredient
        fields = "__all__"


class RecipeSerializer(serializers.ModelSerializer):
    ingredients = RecipeIngredientSerializer(
        many=True,
        read_only=True,
    )

    total_time = serializers.ReadOnlyField()

    class Meta:
        model = Recipe
        fields = "__all__"
