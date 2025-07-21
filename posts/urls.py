from django.urls import path
from . import views

urlpatterns = [
  path('', views.PostListCreate.as_view(), name='posts'),
  path('new/', views.PostListCreate.as_view(), name='new-post'),
  path('<int:pk>/', views.PostRetrieveUpdateDestroy.as_view(), name='get-post'),
  path('delete/<int:pk>/', views.PostRetrieveUpdateDestroy.as_view(), name='delete-post'),
  path('update/<int:pk>/', views.PostRetrieveUpdateDestroy.as_view(), name='update-post'),
  path('<int:post_id>/comments/', views.CommentListCreate.as_view(), name='comments'),
  path('<int:post_id>/comments/', views.CommentListCreate.as_view(), name='comments'),
  path('<int:post_id>/comments/<int:pk>/', views.CommentRetrieveUpdateDelete.as_view(), name='comments'),
]