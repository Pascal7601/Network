from django.shortcuts import render
from rest_framework.decorators import permission_classes, authentication_classes, api_view
from auth import AppAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from . models import Post
from rest_framework import status
from . import serializers
# Create your views here.


@api_view(['POST'])
@authentication_classes([AppAuthentication])
@permission_classes([IsAuthenticated])
def create_post(request):
  """
  authenticated users post new content
  """
  print(request)
  data = request.data
  print(data)
  content = data.get("content")
  user = request.user

  try:
    post = Post(content=content, user=user)
    post.save()
    return Response(
      {"message": "succesfully created a post",
       "post_id": f"{post.id}"
      }, status=status.HTTP_201_CREATED
    )
  except Exception as e:
    return Response(
      {"message": "could not create a post",
      "error": f"{e}"
      }
    )


@api_view(['GET'])
@authentication_classes([AppAuthentication])
@permission_classes([IsAuthenticatedOrReadOnly])
def all_posts(request):
  try:
    posts = Post.objects.all()
    serializer = serializers.PostListSerializer(posts, many=True)
    print(serializer)
    return Response(serializer.data)
    
  except Exception as e:
    return Response(
      {
        "message": "error retrieving posts",
        "error": f"{e}"
      }, status=status.HTTP_500_INTERNAL_SERVER_ERROR
    )