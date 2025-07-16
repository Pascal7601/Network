from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class User(AbstractUser):
  email = models.EmailField(unique=True, blank=False, null=False)
  username = models.CharField(max_length=100, unique=True, blank=True)
  first_name = models.CharField(max_length=100)
  last_name = models.CharField(max_length=100)
  bio = models.TextField(blank=True)
  is_banned = models.BooleanField(default=False)
  profile_pic = models.ImageField(upload_to='users/', default='default.jpg')

  # self referential reletionship
  followers = models.ManyToManyField(
    'self',
    symmetrical=False,
    related_name='following',
    blank=True
  )