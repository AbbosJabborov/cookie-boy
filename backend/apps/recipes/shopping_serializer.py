from rest_framework import serializers


class ShoppingIngredientSerializer(serializers.Serializer):
    ingredient = serializers.CharField()
    amount = serializers.CharField()

    available = serializers.BooleanField()

    price = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        allow_null=True,
    )

    product = serializers.CharField(
        allow_null=True,
    )

    replacement = serializers.CharField(
        allow_null=True,
    )


class ShoppingSerializer(serializers.Serializer):
    estimated_cost = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    currency = serializers.CharField()

    items = ShoppingIngredientSerializer(
        many=True,
    )
