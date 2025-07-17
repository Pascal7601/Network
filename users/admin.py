from django.contrib import admin
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth import get_user_model
# Register your models here.

User = get_user_model()

admin.site.register(User)

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
  
  def get_user(self, user_id):
    """
    return user instance by ID
    """
    try:
      return User.objects.get(pk=user_id)
    except User.DoesNotExist:
      return None

