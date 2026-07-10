from rest_framework.routers import DefaultRouter

from .views import RecipeViewSet
from .views import RecipeIngredientViewSet

router = DefaultRouter()

router.register("recipes", RecipeViewSet)
router.register(
    "recipe-ingredients",
    RecipeIngredientViewSet,
)

urlpatterns = router.urls
