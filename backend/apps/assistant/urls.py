from django.urls import path
from .views import AskAssistantView, SubstituteIngredientView

urlpatterns = [
    path("ask/", AskAssistantView.as_view(), name="assistant-ask"),
    path("substitute/", SubstituteIngredientView.as_view(), name="assistant-substitute"),
]
