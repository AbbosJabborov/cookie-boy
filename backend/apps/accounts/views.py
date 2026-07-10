from django.contrib.auth.models import User

from rest_framework import generics
from rest_framework.permissions import AllowAny

from .serializers import RegisterSerializer
from .serializers import UserSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class MeView(generics.RetrieveAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
