from rest_framework import serializers


class RecommendationSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField()
    description = serializers.CharField()

    difficulty = serializers.CharField()

    prep_time = serializers.IntegerField()
    cook_time = serializers.IntegerField()
    total_time = serializers.IntegerField()

    score = serializers.IntegerField()
    matched = serializers.IntegerField()
    total = serializers.IntegerField()

    matched_ingredients = serializers.ListField(
        child=serializers.CharField()
    )

    missing = serializers.ListField(
        child=serializers.CharField()
    )

    missing_count = serializers.IntegerField()
    can_cook = serializers.BooleanField()
