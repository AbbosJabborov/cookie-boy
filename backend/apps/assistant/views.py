import os
import json
import urllib.request
import urllib.parse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

DEFAULT_SUBSTITUTIONS = {
    "parmesan": {
        "substitute": "Grana Padano or Maasdam",
        "explanation": "Grana Padano is the closest match available at Korzinka & Makro. Your pasta will taste slightly milder, but texture will be identical.",
        "cost_impact": "+5,000 UZS",
    },
    "heavy cream": {
        "substitute": "35% fat Qaymoq (or 20% Qaymoq + butter)",
        "explanation": "In Uzbekistan, look for 35% fat Qaymoq on the dairy shelf. If unavailable, mix 20% cream with 1 tbsp melted butter.",
        "cost_impact": "-3,000 UZS",
    },
    "wine": {
        "substitute": "White grape juice + 1 tsp lemon juice or apple cider vinegar",
        "explanation": "Provides the acidity and deglazing power needed for sauces without alcohol.",
        "cost_impact": "-12,000 UZS",
    },
    "butter": {
        "substitute": "Smetana 25% or Ghee (Maligno Butter)",
        "explanation": "Ghee or local churned butter works great for sautéing.",
        "cost_impact": "Same price",
    },
    "olive oil": {
        "substitute": "Sunflower oil with a pinch of salt & herb infusion",
        "explanation": "Widely available at Havas & Korzinka. Neutral flavor for high-heat cooking.",
        "cost_impact": "-15,000 UZS",
    },
}


def call_external_llm(prompt: str) -> str:
    """Calls Google Gemini REST API across fallback models."""
    gemini_key = os.getenv("GEMINI_API_KEY")

    if gemini_key:
        models = [
            "gemini-1.5-flash",
            "gemini-1.5-pro",
            "gemini-2.0-flash",
            "gemini-pro"
        ]
        for model in models:
            try:
                url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={gemini_key}"
                payload = json.dumps({"contents": [{"parts": [{"text": prompt}]}]}).encode("utf-8")
                req = urllib.request.Request(
                    url,
                    data=payload,
                    headers={"Content-Type": "application/json"},
                    method="POST"
                )
                with urllib.request.urlopen(req, timeout=6) as response:
                    if response.status == 200:
                        data = json.loads(response.read().decode("utf-8"))
                        return data["candidates"][0]["content"]["parts"][0]["text"]
            except Exception as e:
                print(f"Gemini model {model} call failed: {e}")
                continue

    return None


def generate_backend_fallback(query: str, recipe_title: str) -> str:
    q = query.lower()
    if "cake" in q or "bake" in q or "dessert" in q:
        return "To bake a classic sponge cake: Whisk 3 eggs with 100g sugar until pale and fluffy (5 mins). Gently fold in 100g flour and 1 tsp baking powder. Bake at 180°C for 22 minutes until a toothpick comes out clean!"
    if "sauce" in q or "thick" in q or "curdle" in q:
        return "If your sauce looks too thick, stir in 2 tablespoons of warm pasta water or milk over low heat. If it curded, whisk in 1 tbsp cold cream off the heat."
    if "chicken" in q or "meat" in q:
        return "Cook chicken on medium-high heat for 6-7 minutes per side until golden. Ensure internal temperature reaches 74°C (165°F) with clear juices."
    if "parmesan" in q or "cheese" in q:
        return "For missing Parmesan at Korzinka or Makro: Grana Padano or aged Maasdam hard cheese work best as direct substitutions!"
    if "cream" in q or "qaymoq" in q:
        return "In Uzbekistan, 35% fat Qaymoq on dairy shelves is the richest local match for Western heavy cream."

    return (
        f"For your query '{query}', keep your heat controlled on medium. "
        f"Local Uzbekistan markets (Korzinka, Makro, Havas) carry fresh ingredients like Qaymoq, Maasdam, and local herbs to complete your dish!"
    )


class AskAssistantView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        query = request.data.get("query", "").strip()
        recipe_title = request.data.get("recipe_title", "your recipe")
        current_step = request.data.get("current_step", "")

        if not query:
            return Response({"error": "query is required"}, status=status.HTTP_400_BAD_REQUEST)

        prompt = (
            f"You are plate.'s AI Cooking Assistant for home cooks in Uzbekistan shopping at Korzinka, Makro, Havas.\n"
            f"User is cooking: {recipe_title}.\n"
            f"Current step: {current_step}.\n"
            f"User question: {query}\n"
            f"Provide a helpful, encouraging 2-3 sentence answer with local ingredient/cooking advice."
        )

        llm_response = call_external_llm(prompt)
        if llm_response:
            return Response({"answer": llm_response, "source": "gemini_live_ai"})

        answer = generate_backend_fallback(query, recipe_title)
        return Response({"answer": answer, "source": "dynamic_fallback"})


class SubstituteIngredientView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        ingredient = request.data.get("ingredient", "").strip().lower()
        if not ingredient:
            return Response({"error": "ingredient is required"}, status=status.HTTP_400_BAD_REQUEST)

        for key, sub in DEFAULT_SUBSTITUTIONS.items():
            if key in ingredient:
                return Response(
                    {
                        "original": ingredient,
                        "substitute": sub["substitute"],
                        "explanation": sub["explanation"],
                        "cost_impact": sub["cost_impact"],
                    }
                )

        return Response(
            {
                "original": ingredient,
                "substitute": f"Local Uzbek market alternative for {ingredient}",
                "explanation": f"Check Korzinka or Makro dairy/produce section for fresh regional substitutes.",
                "cost_impact": "Similar price",
            }
        )
