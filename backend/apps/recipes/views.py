from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import Recipe
from .serializers import RecipeSerializer


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.prefetch_related("ingredients").all()

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
