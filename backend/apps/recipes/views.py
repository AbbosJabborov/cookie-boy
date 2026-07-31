from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import filters

from .models import Recipe
from .models import RecipeIngredient
from .serializers import RecipeSerializer
from .serializers import RecipeIngredientSerializer


class RecipeViewSet(ModelViewSet):
    queryset = Recipe.objects.prefetch_related(
        "ingredients__ingredient"
    )
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

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
