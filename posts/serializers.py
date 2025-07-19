from rest_framework import serializers
from . models import Post

class PostListSerializer(serializers.ModelSerializer):
  user = serializers.SlugRelatedField(slug_field='email', read_only=True)


  class Meta:
    model = Post
    fields = ['id', 'content', 'created_at', 'user']