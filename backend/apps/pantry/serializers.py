from rest_framework import serializers

from .models import PantryItem


class PantryItemSerializer(serializers.ModelSerializer):
    ingredient_name = serializers.CharField(
        source="ingredient.name",
        read_only=True,
    )

    class Meta:
        model = PantryItem
        fields = (
            "id",
            "ingredient",
            "ingredient_name",
            "quantity",
            "unit",
            "expiration_date",
        )
