from django.contrib import admin
from .models import Recipe, RecipeIngredient


@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "difficulty",
        "prep_time",
        "cook_time",
        "servings",
    )

    search_fields = (
        "title",
    )


@admin.register(RecipeIngredient)
class RecipeIngredientAdmin(admin.ModelAdmin):
    list_display = (
        "ingredient",
        "recipe",
        "quantity",
        "unit",
        "optional",
    )

    search_fields = (
        "ingredient__name",
        "recipe__title",
    )

    autocomplete_fields = (
        "ingredient",
        "recipe",
        "suggested_product",
    )
