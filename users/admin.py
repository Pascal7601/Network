from django.contrib import admin
from django.contrib.auth.backends import BaseBackend
from .models import User
# Register your models here.


class MyBackend(BaseBackend):
  
  def authenticate(self, request, email = None, password = None, **kwargs):
    """
    authenticate using email and password
    """
    try:
      user = User.objects.get(email=email)
    except User.DoesNotExist:
      return None
    
    if user.check_password(password):
      return user
    return None

