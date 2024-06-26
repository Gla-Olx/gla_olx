from django.shortcuts import render

from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from .serializers import ProductSerializer, ProductViewSerializer, WishListProductSerializer
import cloudinary
import json
 


class ProductCreateAPIView(APIView):
    def post(self, request, format=None):
        # data = json.loads(request.data['data'])

        # print(data)
        serializer=ProductSerializer(data=request.data)
        # serializer = ProductSerializer(data=data)
        urls=[]
        get_img_files = request.FILES.items()
        for file_key, file in get_img_files:
            url= upload_file_to_server(file_path=file)
            urls.append(url)        

        if serializer.is_valid():
            for i, url in enumerate(urls): 
                serializer.validated_data[f'proimg{i+1}'] = url
            serializer.save()
            return Response({'success': True, 'message': 'Product created successfully', 'data': serializer.data, }, status=status.HTTP_201_CREATED)
        if serializer.errors:
            print(serializer.errors)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ProductListAPIView(generics.ListAPIView):
    queryset = ProductDetails.objects.all()
    serializer_class = ProductViewSerializer
    
class FetchProducts(APIView):
    def get(self, request):
        intial_product_show= 9
        current_user = self.request.query_params.get('current_user', None)
        list_products= ProductDetails.objects.exclude(seller_id=current_user).order_by('-created_date')[:intial_product_show]
        serializer = ProductViewSerializer(list_products, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
        
        

class ProductDetailAPIView(generics.RetrieveAPIView):
    queryset = ProductDetails.objects.all()
    serializer_class = ProductViewSerializer

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        product_category = instance.product_category  
        similar_products = ProductDetails.objects.filter(product_category=product_category).exclude(pk=instance.pk)
        serializer = self.get_serializer(instance)
        similar_serializer = self.get_serializer(similar_products, many=True)
        return Response({
            'product_details': serializer.data,
            'similar_products': similar_serializer.data
        })
    
class ProductDeleteAPIView(generics.DestroyAPIView):
    queryset = ProductDetails.objects.all()
    serializer_class = ProductSerializer

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

def upload_file_to_server(file_path):
    result = cloudinary.uploader.upload(file_path, upload_preset="gla-olx")
    return result['secure_url']

class ProductUpdateAPIView(generics.UpdateAPIView):
    def patch(self,request):
        data=request.data
        queryset= ProductDetails.objects.get(id=data['id'])
        updated_data = ProductSerializer(queryset, data=data, partial=True) 
        if updated_data.is_valid():
            updated_data.save()
            return Response(updated_data.data, status=status.HTTP_202_ACCEPTED)

        return Response(updated_data.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class ProductFilterListAPIView(generics.ListAPIView):
    serializer_class = ProductViewSerializer

    def get_queryset(self):
        queryset = ProductDetails.objects.all()
        category = self.request.query_params.get('category', None)
        search_query = self.request.query_params.get('search', None)
        
        if category:
            queryset = queryset.filter(product_category=category)
            
        if search_query:
            queryset = queryset.filter(product_title__icontains=search_query)
            
        return queryset

class WishListItemAPI(APIView):
        def post(self, request, format=None):
            data=WishListProductSerializer(data=request.data)
            if data.is_valid():
                print(data.validated_data)
                data.save()
                return Response({'success': True, 'message': 'Product added to Wishlist', 'data': data.data, }, status=status.HTTP_201_CREATED)
            if data.errors:
                print(data.errors)
                
            return Response(data.errors, status=status.HTTP_400_BAD_REQUEST)


class FetchWishListItems(APIView):
    def get(self, request):
        current_user = self.request.query_params.get('current_user', None)
        product_id = self.request.query_params.get('product_id', None)
        if product_id:
            try:
                wishlist_items= WishListItem.objects.get(userid=current_user, product_id=product_id)            
                serializer = WishListProductSerializer(wishlist_items)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except WishListItem.DoesNotExist:
                return Response({'success': False, 'message': 'Product not found in Wishlist', }, status=status.HTTP_404_NOT_FOUND)

        wishlist_items= WishListItem.objects.filter(userid=current_user)
        serializer = WishListProductSerializer(wishlist_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)