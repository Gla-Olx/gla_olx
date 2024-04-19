from rest_framework import serializers
from .models import *

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDetails
        fields = ['id', 'product_title', 'product_price', 'product_desc', 'product_category', 'product_subcategory', 'seller_name', 'seller_picture', 'product_status']
        read_only_fields = ['proimg1', 'proimg2', 'proimg3', 'proimg4','proimg5']



class ProductViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDetails
        fields = "__all__"
