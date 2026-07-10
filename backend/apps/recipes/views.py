from rest_framework.viewsets import ModelViewSet

from .models import Recipe
from .models import RecipeIngredient

from .serializers import RecipeSerializer
from .serializers import RecipeIngredientSerializer


class RecipeViewSet(ModelViewSet):
    queryset = Recipe.objects.prefetch_related(
        "ingredients__ingredient"
    )

    serializer_class = RecipeSerializer


class RecipeIngredientViewSet(ModelViewSet):
    queryset = RecipeIngredient.objects.select_related(
        "recipe",
        "ingredient",
        "suggested_product",
    )

    serializer_class = RecipeIngredientSerializer
