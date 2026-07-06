from django.urls import include, path
from rest_framework.routers import DefaultRouter

from ..recipes.views import RecipeViewSet
from .views import (
    BrandViewSet,
    CategoryViewSet,
    ProductViewSet,
)

router = DefaultRouter()

router.register("products", ProductViewSet)
router.register("brands", BrandViewSet)
router.register("categories", CategoryViewSet)
router.register(
    "recipes",
    RecipeViewSet,
)

urlpatterns = [
    path("", include(router.urls)),
]
