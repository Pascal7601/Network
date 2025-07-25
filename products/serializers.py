from rest_framework import serializers
from . models import Product, Review
from users.serializers import UserSerializer

class ProductSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)

  class Meta:
    model = Product
    fields = ['id', 'description', 'created_at', 'user', 'image', 'name']


class ReviewSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)

  class Meta:
    model = Review
    fields = ['id', 'description', 'user', 'product']
    read_only_fields = ['id', 'product', 'created_at']