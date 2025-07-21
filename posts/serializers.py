from rest_framework import serializers
from . models import Post, Comment, Like

class PostSerializer(serializers.ModelSerializer):
  user = serializers.SlugRelatedField(slug_field='username', read_only=True)


  class Meta:
    model = Post
    fields = ['id', 'content', 'created_at', 'user']


class CommentSerializer(serializers.ModelSerializer):
  user = serializers.SlugRelatedField(slug_field='username', read_only=True)
  post = serializers.SlugRelatedField(slug_field='content', read_only=True)

  class Meta:
    model = Comment
    fields = ['id', 'content', 'user', 'post']
    read_only_fields = ['id', 'post', 'created_at']