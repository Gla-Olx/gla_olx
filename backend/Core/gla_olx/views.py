from django.shortcuts import render

from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from .serializers import ProductSerializer

class ProductCreateAPIView(APIView):
    def post(self, request, format=None):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ProductListAPIView(generics.ListAPIView):
    queryset = ProductDetails.objects.all()
    serializer_class = ProductSerializer

class ProductDetailAPIView(generics.RetrieveAPIView):
    queryset = ProductDetails.objects.all()
    serializer_class = ProductSerializer
    
class ProductDeleteAPIView(generics.DestroyAPIView):
    queryset = ProductDetails.objects.all()
    serializer_class = ProductSerializer

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
# def upload_file_to_server(file_path):
#     result = cloudinary.uploader.upload(file_path, upload_preset="my_upload_preset")
#     return result['secure_url']