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

COOKING_FAQS = [
    {
        "keywords": ["thick", "sauce", "heavy"],
        "answer": "If your sauce looks too thick, stir in 2–3 tablespoons of warm pasta water or broth over low heat while whisking continuously. This emulsifies the sauce smoothly!"
    },
    {
        "keywords": ["pink", "chicken", "raw", "done"],
        "answer": "Keep cooking your chicken on medium heat. The inside should be firm and white with no translucent pink center (internal temp 74°C / 165°F)."
    },
    {
        "keywords": ["separate", "curdle", "broken"],
        "answer": "Remove from direct heat immediately! Add 1 tablespoon of ice-cold water or heavy cream and whisk vigorously for 30 seconds to bring the emulsion back together."
    },
    {
        "keywords": ["substitute", "replace", "missing", "korzinka", "parmesan", "cream"],
        "answer": "For missing ingredients in Tashkent: Parmesan → Grana Padano/Maasdam; Heavy Cream → 35% Qaymoq; Butter → Smetana or Ghee. You can save up to 15,000 UZS with local alternatives!"
    },
]


def call_external_llm(prompt: str) -> str:
    """Calls Google Gemini REST API using urllib standard library."""
    gemini_key = os.getenv("GEMINI_API_KEY")

    if gemini_key:
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={gemini_key}"
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
        except Exception:
            pass

    return None


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

        query_lower = query.lower()
        for faq in COOKING_FAQS:
            if any(k in query_lower for k in faq["keywords"]):
                return Response({"answer": faq["answer"], "source": "smart_knowledge_base"})

        default_answer = (
            f"For {recipe_title}, keep your heat on medium and take your time! "
            f"If you're missing ingredients, local Uzbekistan stores like Korzinka and Makro usually have great alternatives like Qaymoq, Maasdam, or fresh garden herbs."
        )
        return Response({"answer": default_answer, "source": "smart_knowledge_base"})


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
