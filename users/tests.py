from django.test import TestCase
from .models import User
from django.db import IntegrityError
from django.db import transaction
# Create your tests here.
class TestCreateUser(TestCase):

  def test_create_user_without_email(self):
    with self.assertRaises(IntegrityError):
      with transaction.atomic():
        User.objects.create_user(
          username='Pascal',
          first_name='Pascal',
          last_name='Ndubi'
        )
    

