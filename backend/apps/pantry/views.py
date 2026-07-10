from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from .models import PantryItem
from .serializers import PantryItemSerializer


class PantryItemViewSet(ModelViewSet):
    serializer_class = PantryItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return PantryItem.objects.filter(
            user=self.request.user
        ).select_related("ingredient")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
