from rest_framework import serializers
from .models import *

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDetails
<<<<<<< HEAD
        fields = ['product_id', 'product_title', 'product_price', 'product_desc', 'product_category', 'product_subcategory', 'seller_name', 'seller_picture', 'product_status']
=======
        fields = ['id','seller_id', 'product_title', 'product_price', 'product_desc', 'product_category', 'product_subcategory', 'seller_name', 'seller_picture', 'product_status' ,'created_date']
>>>>>>> 5a79fcaa8412ee5efb46696d3958766a980b9983
        read_only_fields = ['proimg1', 'proimg2', 'proimg3', 'proimg4','proimg5']



class ProductViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDetails
        fields = "__all__"
