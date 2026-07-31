from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import ShoppingList, ShoppingListItem
from .serializers import ShoppingListSerializer, ShoppingListItemSerializer
from apps.recipes.models import Recipe
from apps.pantry.models import PantryItem


class ShoppingListViewSet(viewsets.ModelViewSet):
    serializer_class = ShoppingListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ShoppingList.objects.filter(user=self.request.user).prefetch_related("items__recipe")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=["post"], url_path="add-from-recipe")
    def add_from_recipe(self, request):
        recipe_id = request.data.get("recipe_id")
        if not recipe_id:
            return Response({"error": "recipe_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            recipe = Recipe.objects.get(id=recipe_id)
        except Recipe.DoesNotExist:
            return Response({"error": "Recipe not found"}, status=status.HTTP_404_NOT_FOUND)

        # Get or create active shopping list for user
        shopping_list, _ = ShoppingList.objects.get_or_create(
            user=request.user,
            is_completed=False,
            defaults={"name": f"Shopping List ({request.user.username})"}
        )

        # Check pantry items for user
        pantry_ingredient_ids = set(
            PantryItem.objects.filter(user=request.user).values_list("ingredient_id", flat=True)
        )

        added_items = []
        for ri in recipe.ingredients.all():
            # If ingredient is not in user's pantry, add to shopping list
            if ri.ingredient_id not in pantry_ingredient_ids:
                # Estimate price based on suggested product or default estimation
                estimated_price = (
                    ri.suggested_product.price if ri.suggested_product else 15000.00
                )
                item, created = ShoppingListItem.objects.get_or_create(
                    shopping_list=shopping_list,
                    ingredient=ri.ingredient,
                    defaults={
                        "ingredient_name": ri.ingredient.name,
                        "quantity": ri.quantity,
                        "unit": ri.unit,
                        "estimated_price": estimated_price,
                        "recipe": recipe,
                    }
                )
                added_items.append(item)

        serializer = ShoppingListSerializer(shopping_list)
        return Response(
            {
                "message": f"Added missing ingredients from {recipe.title} to shopping list.",
                "shopping_list": serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )


class ShoppingListItemViewSet(viewsets.ModelViewSet):
    serializer_class = ShoppingListItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ShoppingListItem.objects.filter(shopping_list__user=self.request.user)
