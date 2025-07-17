from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from . admin import MyBackend
from django.contrib.auth import login
# Create your views here.

User = get_user_model()

@api_view(['POST'])
def register(request):
  data = request.data
  print(data)
  email = data.get('email')
  username = data.get('username')
  password = data.get('password')

  # check if user has passed both email and password
  if not email or not password:
    return Response({"message": "please enter both email and password"}, status=status.HTTP_400_BAD_REQUEST)

  if User.objects.filter(email=email).exists():
    return Response({"message": "user already exists"})
  
  try:
    if email and password:
      user = User.objects.create_user(
        email=email,
        password=password
      )
      user.save()

      return Response({"meesage": "user succesfully registered", "user_id": f"{user.id}"}, status=status.HTTP_201_CREATED)
  except Exception as e:
    return Response({"message": "could not register user", "error": f"{e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def login_view(request):
  data = request.data
  email = data.get('email')
  password = data.get('password')

  if not email or not password:
    return Response({"message": "please anter both email and password"}, status=status.HTTP_400_BAD_REQUEST)
  
  try:
    user = MyBackend().authenticate(request, email=email, password=password)
    if user:
      login(request, user)
    return Response({"message": "succesfully logged in"})
  
  except Exception as e:
    return Response({"message": "error loging in", "error": f"{e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
  

