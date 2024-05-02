from django.shortcuts import render

from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from .serializers import ProductSerializer, ProductViewSerializer
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
        list_products= ProductDetails.objects.exclude(seller_id="nit").order_by('-created_date')[:intial_product_show]
        serializer = ProductViewSerializer(list_products, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
        
        

class ProductDetailAPIView(generics.RetrieveAPIView):
    queryset = ProductDetails.objects.all()
    
    serializer_class = ProductViewSerializer
    
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

