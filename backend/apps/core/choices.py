from django.db import models


class Unit(models.TextChoices):
    GRAM = "g", "Gram"
    KILOGRAM = "kg", "Kilogram"
    MILLILITER = "ml", "Milliliter"
    LITER = "l", "Liter"
    PIECE = "pc", "Piece"
    TABLESPOON = "tbsp", "Tablespoon"
    TEASPOON = "tsp", "Teaspoon"

class IngredientCategory(models.TextChoices):
    VEGETABLE = "vegetable", "Vegetable"
    FRUIT = "fruit", "Fruit"
    MEAT = "meat", "Meat"
    DAIRY = "dairy", "Dairy"
    GRAIN = "grain", "Grain"
    SPICE = "spice", "Spice"
    BEVERAGE = "beverage", "Beverage"
    SEAFOOD = "seafood", "Seafood"
    OTHER = "other", "Other"
