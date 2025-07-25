from django.urls import path
from . import views

urlpatterns = [
  path('', views.ProductListCreate.as_view(), name='products'),
  path('new/', views.ProductListCreate.as_view(), name='new-product'),
  path('<int:pk>/', views.ProductRetrieveUpdateDestroy.as_view(), name='get-product'),
  path('delete/<int:pk>/', views.ProductRetrieveUpdateDestroy.as_view(), name='delete-product'),
  path('update/<int:pk>/', views.ProductRetrieveUpdateDestroy.as_view(), name='update-product'),
  path('<int:product_id>/reviews/', views.ReviewListCreate.as_view(), name='reviews'),
  path('<int:product_id>/reviews/', views.ReviewListCreate.as_view(), name='reviews'),
  path('<int:product_id>/reviews/<int:pk>/', views.ReviewRetrieveUpdateDelete.as_view(), name='reviews'),
]