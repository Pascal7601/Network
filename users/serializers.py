from rest_framework import serializers
from django.contrib.auth import get_user_model


User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = User
    fields = ['id', 'followers', 'email', 'username', 'date_joined', 'first_name', 'last_name', 'bio', 'profile_pic']
  

  def update(self, instance, validated_data):
    for attr, value in validated_data.items():
      setattr(instance, attr, value)
    instance.save()
    return instance