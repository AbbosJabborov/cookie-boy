from decimal import Decimal

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Recipe
from .serializers import RecipeSerializer
from .shopping_serializer import ShoppingSerializer


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.prefetch_related("ingredients__suggested_product").all()

    serializer_class = RecipeSerializer

    permission_classes = [AllowAny]

    search_fields = [
        "title",
        "description",
    ]

    ordering_fields = [
        "prep_time",
        "cook_time",
        "title",
    ]

    @action(detail=True, methods=["get"])
    def shopping(self, request, pk=None):
        recipe = self.get_object()

        items = []
        estimated_cost = Decimal("0.00")

        for ingredient in recipe.ingredients.all():
            product = ingredient.suggested_product

            if product:
                estimated_cost += product.price

            items.append(
                {
                    "ingredient": ingredient.ingredient_name,
                    "amount": ingredient.amount,
                    "available": product.is_available if product else False,
                    "price": product.price if product else None,
                    "product": product.name if product else None,
                    "replacement": (
                        product.name if product and not product.is_available else None
                    ),
                }
            )

        data = {
            "estimated_cost": estimated_cost,
            "currency": "UZS",
            "items": items,
        }

        serializer = ShoppingSerializer(data)
        return Response(serializer.data)
