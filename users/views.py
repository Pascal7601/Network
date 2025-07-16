from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
# Create your views here.

@api_view(['POST'])
def register(request):
  data = request.data
  print(data)
  email = data['email']
  username = data.get('username', None)
  password = data.get('password', None)

  if User.objects.filter(email=email).exists():
    return Response({"message": "user already exists"})
  

