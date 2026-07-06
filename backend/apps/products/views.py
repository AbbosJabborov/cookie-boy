from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import Brand, Category, Product
from .serializers import (
    BrandSerializer,
    CategorySerializer,
    ProductSerializer,
)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.select_related("brand", "category").all()

    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    search_fields = [
        "name",
        "barcode",
        "brand__name",
        "category__name",
    ]

    ordering_fields = [
        "price",
        "name",
    ]


class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    permission_classes = [AllowAny]


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
