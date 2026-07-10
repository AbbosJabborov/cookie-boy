from rest_framework.viewsets import ModelViewSet

from .models import Recipe
from .models import RecipeIngredient

from .serializers import RecipeSerializer
from .serializers import RecipeIngredientSerializer


from rest_framework import filters
from rest_framework.viewsets import ModelViewSet


class RecipeViewSet(ModelViewSet):
    queryset = Recipe.objects.prefetch_related(
        "ingredients__ingredient"
    )

    serializer_class = RecipeSerializer

    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    search_fields = [
        "title",
        "description",
    ]

    ordering_fields = [
        "prep_time",
        "cook_time",
        "title",
    ]

class RecipeIngredientViewSet(ModelViewSet):
    queryset = RecipeIngredient.objects.select_related(
        "recipe",
        "ingredient",
        "suggested_product",
    )

    serializer_class = RecipeIngredientSerializer
