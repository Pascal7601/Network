from auth import AppAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from . models import Product, Review
from rest_framework import status, generics
from . import serializers
from . permissions import IsOwnerOrReadOnly



class ProductListCreate(generics.ListCreateAPIView):
  queryset = Product.objects.all()
  serializer_class = serializers.ProductSerializer
  authentication_classes = [AppAuthentication]
  permission_classes = [IsAuthenticatedOrReadOnly]

  def perform_create(self, serializer):
    serializer.save(user=self.request.user)


class ProductRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
  queryset = Product.objects.all()
  serializer_class = serializers.ProductSerializer
  authentication_classes = [AppAuthentication]
  permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]


class ReviewListCreate(generics.ListCreateAPIView):
  queryset = Review.objects.all()
  serializer_class = serializers.ReviewSerializer
  authentication_classes = [AppAuthentication]
  permission_classes = [IsAuthenticated]

  # obtain the Product_id from the url and return the Reviews filtered by it
  def get_queryset(self):
    product_id = self.kwargs['Product_id']
    return Review.objects.filter(product_id=product_id)

  # obtain the Product_id and save the Review with it
  def perform_create(self, serializer):
    product_id = self.kwargs['product_id']
    serializer.save(user=self.request.user, product_id=product_id)


class ReviewRetrieveUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
  queryset = Review.objects.all()
  serializer_class = serializers.ReviewSerializer
  authentication_classes = [AppAuthentication]
  permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]