from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Post(models.Model):
  content = models.TextField(blank=False)
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
  created_at = models.DateTimeField(auto_now_add=True)
  image = models.ImageField(upload_to='posts/', blank=True)

  def __str__(self):
    return f"{self.content} posted by {self.user.email}"


class Comment(models.Model):
  content = models.TextField(blank=False)
  post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return f"{self.user.email} commented {self.content}"


class Like(models.Model):
  post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes')
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='likes')
  created_at = models.DateTimeField(auto_now_add=True)

  class Meta:
    unique_together = ('post', 'user')


  
