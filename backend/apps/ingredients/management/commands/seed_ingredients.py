from django.core.management.base import BaseCommand

from apps.ingredients.models import Ingredient


INGREDIENTS = {
    "vegetable": [
        "Tomato",
        "Potato",
        "Onion",
        "Garlic",
        "Carrot",
        "Broccoli",
        "Cauliflower",
        "Cucumber",
        "Bell Pepper",
        "Chili Pepper",
        "Spinach",
        "Lettuce",
        "Cabbage",
        "Eggplant",
        "Zucchini",
        "Pumpkin",
        "Corn",
        "Green Beans",
        "Peas",
        "Celery",
        "Radish",
        "Beetroot",
        "Sweet Potato",
        "Mushroom",
        "Leek",
    ],

    "fruit": [
        "Apple",
        "Banana",
        "Orange",
        "Lemon",
        "Lime",
        "Pear",
        "Peach",
        "Plum",
        "Cherry",
        "Strawberry",
        "Blueberry",
        "Raspberry",
        "Watermelon",
        "Melon",
        "Grapes",
        "Kiwi",
        "Mango",
        "Pineapple",
        "Pomegranate",
        "Avocado",
    ],

    "meat": [
        "Chicken Breast",
        "Chicken Thigh",
        "Beef",
        "Ground Beef",
        "Beef Steak",
        "Beef Mince",
        "Pork Chop",
        "Pork Mince",
        "Turkey Breast",
        "Sausage",
        "Bacon",
        "Salami",
        "Ham",
        "Lamb",
    ],

    "seafood": [
        "Salmon",
        "Tuna",
        "Shrimp",
        "Cod",
        "Crab",
    ],

    "dairy": [
        "Milk",
        "Butter",
        "Cheddar Cheese",
        "Mozzarella",
        "Parmesan",
        "Yogurt",
        "Cream",
        "Cream Cheese",
        "Sour Cream",
        "Egg",
    ],

    "grain": [
        "Rice",
        "Pasta",
        "Spaghetti",
        "Flour",
        "Bread",
        "Oats",
        "Couscous",
        "Quinoa",
        "Tortilla",
        "Noodles",
    ],

    "spice": [
        "Salt",
        "Black Pepper",
        "Paprika",
        "Cumin",
        "Turmeric",
        "Cinnamon",
        "Oregano",
        "Basil",
        "Parsley",
        "Thyme",
        "Rosemary",
        "Bay Leaf",
        "Coriander",
        "Curry Powder",
        "Garlic Powder",
        "Onion Powder",
    ],

    "beverage": [
        "Water",
        "Orange Juice",
        "Apple Juice",
        "Coffee",
        "Tea",
    ],

    "other": [
        "Olive Oil",
        "Vegetable Oil",
        "Sunflower Oil",
        "Soy Sauce",
        "Vinegar",
        "Mayonnaise",
        "Ketchup",
        "Mustard",
        "Honey",
        "Sugar",
        "Brown Sugar",
        "Chocolate",
        "Peanut Butter",
        "Jam",
        "Beans",
        "Chickpeas",
        "Lentils",
        "Coconut Milk",
        "Tomato Paste",
        "Baking Powder",
    ],
}


class Command(BaseCommand):
    help = "Seed ingredients"

    def handle(self, *args, **kwargs):
        created = 0

        for category, ingredients in INGREDIENTS.items():
            for name in ingredients:
                _, was_created = Ingredient.objects.get_or_create(
                    name=name,
                    defaults={
                        "category": category,
                    },
                )

                if was_created:
                    created += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Created {created} ingredients."
            )
        )
