from rest_framework.routers import DefaultRouter
from .views import ShoppingListViewSet, ShoppingListItemViewSet

router = DefaultRouter()
router.register("lists", ShoppingListViewSet, basename="shopping-list")
router.register("items", ShoppingListItemViewSet, basename="shopping-item")

urlpatterns = router.urls
