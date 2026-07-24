from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Seed products"

    def handle(self, *args, **kwargs):
        self.stdout.write(
            self.style.SUCCESS("No products to seed.")
        )
