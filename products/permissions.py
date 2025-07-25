from rest_framework.permissions import BasePermission

class IsOwnerOrReadOnly(BasePermission):
  """
  only allow owners of the post to edit or delete it.
  others can only view
  """
  def has_object_permission(self, request, view, obj):
    if request.method in ('GET', 'HEAD', 'OPTIONS'):
      return True
    
    # only the owner can update or delete it
    return obj.user == request.user