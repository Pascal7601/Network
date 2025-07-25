from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()

class Category(models.Model):
  name = models.CharField(max_length=50, null=True)

  def __str__(self):
    return self.name


class Product(models.Model):
  name = models.CharField(max_length=50, null=True)
  description = models.TextField(null=True)
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products')
  category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='products', null=True, blank=True)
  created_at = models.DateTimeField(auto_now_add=True)
  image = models.ImageField(upload_to='posts/', null=False)
  

  def __str__(self):
    return f"{self.description} posted by {self.user.email}"


class Review(models.Model):
  content = models.TextField(blank=False)
  product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return f"{self.user.email} commented {self.content}"





  
