from auth import AppAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from . models import Post, Comment, Like
from rest_framework import status, generics
from . import serializers
from . permissions import IsOwnerOrReadOnly



class PostListCreate(generics.ListCreateAPIView):
  queryset = Post.objects.all()
  serializer_class = serializers.PostSerializer
  authentication_classes = [AppAuthentication]
  permission_classes = [IsAuthenticatedOrReadOnly]

  def perform_create(self, serializer):
    serializer.save(user=self.request.user)


class PostRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
  queryset = Post.objects.all()
  serializer_class = serializers.PostSerializer
  authentication_classes = [AppAuthentication]
  permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]


class CommentListCreate(generics.ListCreateAPIView):
  queryset = Comment.objects.all()
  serializer_class = serializers.CommentSerializer
  authentication_classes = [AppAuthentication]
  permission_classes = [IsAuthenticated]

  # obtain the post_id from the url and return the comments filtered by it
  def get_queryset(self):
    post_id = self.kwargs['post_id']
    return Comment.objects.filter(post_id=post_id)

  # obtain the post_id and save the comment with it
  def perform_create(self, serializer):
    post_id = self.kwargs['post_id']
    serializer.save(user=self.request.user, post_id=post_id)


class CommentRetrieveUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
  queryset = Comment.objects.all()
  serializer_class = serializers.CommentSerializer
  authentication_classes = [AppAuthentication]
  permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]