import json
import os
from django.http import JsonResponse
from django.shortcuts import render


def product_list(request):
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
