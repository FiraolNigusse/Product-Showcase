import json
import os
from django.http import JsonResponse
from django.shortcuts import render
from .models import Product


def product_list(request):
    try:
        # Try to load data from the database
        products = Product.objects.all()
        if products.exists():
            data = []
            for product in products:
                data.append({
                    'name': product.name,
                    'price': str(product.price),
                    'description': product.description,
                    'image': product.image.url if product.image else '',
                })
            return JsonResponse(data, safe=False)
    except Exception as e:
        # Log error (optional): print(f"DB error: {e}")
        pass

    # Fallback: load from products.json
    try:
        json_path = os.path.abspath(
            os.path.join(os.path.dirname(__file__), '..', '..', 'frontend', 'data', 'products.json')
        )
        with open(json_path, 'r') as f:
            data = json.load(f)
        return JsonResponse(data, safe=False)
    except FileNotFoundError:
        return JsonResponse({'error': 'products.json not found'}, status=404)


def product_page(request):
    return render(request, 'products/products.html')
