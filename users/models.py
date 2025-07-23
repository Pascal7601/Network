from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import BaseUserManager
# Create your models here.


class UserManager(BaseUserManager):
  def create_user(self, email, password, **extra_fields):
    """
    creates a new user with email and add them to the db
    """
    if not email:
      raise ValueError('Email is required')
    email = self.normalize_email(email)
    extra_fields.setdefault('is_active', True)
    user = self.model(email=email, **extra_fields)
    user.set_password(password)
    user.save(using=self._db)
    return user
  

  def create_superuser(self, email, password, **extra_fields):
    """
    creates a new superuser
    """
    extra_fields.setdefault('is_staff', True)
    extra_fields.setdefault('is_superuser', True)

    if extra_fields.get('is_staff') is not True:
      raise ValueError('Superuser must have is_staff=True.')
    if extra_fields.get('is_superuser') is not True:
      raise ValueError('Superuser must have is_superuser=True.')
    
    return self.create_user(email, password, **extra_fields)



class User(AbstractUser):
  email = models.EmailField(unique=True, blank=False, null=False)
  username = models.CharField(max_length=100, unique=False, blank=True, null=True)
  first_name = models.CharField(max_length=100)
  last_name = models.CharField(max_length=100)
  bio = models.TextField(blank=True)
  is_banned = models.BooleanField(default=False)
  profile_pic = models.ImageField(upload_to='users/', default='users/default.jpg')

  # self referential reletionship
  followers = models.ManyToManyField(
    'self',
    symmetrical=False,
    related_name='following',
    blank=True
  )

  objects = UserManager()
  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['username']