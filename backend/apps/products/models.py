from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Brand(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Product(models.Model):
    class Unit(models.TextChoices):
        GRAM = "g", "Gram"
        KILOGRAM = "kg", "Kilogram"
        MILLILITER = "ml", "Milliliter"
        LITER = "l", "Liter"
        PIECE = "pcs", "Piece"

    name = models.CharField(max_length=255)

    brand = models.ForeignKey(
        Brand,
        on_delete=models.CASCADE,
        related_name="products",
    )

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="products",
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    quantity = models.DecimalField(
        max_digits=8,
        decimal_places=2,
    )

    unit = models.CharField(
        max_length=5,
        choices=Unit.choices,
    )

    barcode = models.CharField(
        max_length=64,
        blank=True,
    )

    image = models.ImageField(
        upload_to="products/",
        blank=True,
        null=True,
    )

    is_available = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]
        indexes = [
            models.Index(fields=["name"]),
        ]

    def __str__(self):
        return self.name
