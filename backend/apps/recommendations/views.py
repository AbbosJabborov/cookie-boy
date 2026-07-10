from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import RecommendationSerializer
from .services import RecommendationService


class RecommendationView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        try:
            min_score = int(
                request.query_params.get(
                    "min_score",
                    0,
                )
            )
        except ValueError:
            min_score = 0

        min_score = max(
            0,
            min(100, min_score),
        )

        difficulty = request.query_params.get(
            "difficulty"
        )

        max_time = request.query_params.get(
            "max_time"
        )

        try:
            max_time = (
                int(max_time)
                if max_time
                else None
            )
        except ValueError:
            max_time = None

        recommendations = RecommendationService(
            request.user
        ).recommend(
            min_score=min_score,
            difficulty=difficulty,
            max_time=max_time,
        )

        serializer = RecommendationSerializer(
            recommendations,
            many=True,
        )

        return Response(serializer.data)
