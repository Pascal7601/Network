from django.urls import path
from .import views

urlpatterns = [
  path('register/', views.register, name='register'),
  path('login/', views.login, name="login"),
  path('me/', views.ProfileView.as_view(), name="profile"),
]