from django.contrib import admin
from .models import PantryItem


@admin.register(PantryItem)
class PantryItemAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "ingredient",
        "user",
        "quantity",
        "unit",
        "expiration_date",
    )

    autocomplete_fields = (
        "ingredient",
        "user",
    )

    list_filter = (
        "unit",
        "expiration_date",
    )

    search_fields = (
        "ingredient__name",
        "user__username",
    )
