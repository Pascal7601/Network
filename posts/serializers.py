from rest_framework import serializers
from . models import Post, Comment, Like
from users.serializers import UserSerializer

class PostSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)

  class Meta:
    model = Post
    fields = ['id', 'content', 'created_at', 'user', 'image']


class CommentSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)

  class Meta:
    model = Comment
    fields = ['id', 'content', 'user', 'post']
    read_only_fields = ['id', 'post', 'created_at']