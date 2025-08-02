from django.urls import path
from .views import product_list, product_page

urlpatterns = [
    path('api/', product_list, name='product-list'),        # /products/api/
    path('', product_page, name='product-page'),            # /products/
]
