from django.contrib import admin

from .models import Recipe, RecipeIngredient


class RecipeIngredientInline(admin.TabularInline):
    model = RecipeIngredient
    extra = 1


@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "difficulty",
        "servings",
        "prep_time",
        "cook_time",
    )

    search_fields = ("title",)

    list_filter = ("difficulty",)

    inlines = [
        RecipeIngredientInline,
    ]


@admin.register(RecipeIngredient)
class RecipeIngredientAdmin(admin.ModelAdmin):
    list_display = (
        "ingredient_name",
        "recipe",
        "amount",
    )
