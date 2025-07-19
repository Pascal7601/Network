from rest_framework.authentication import TokenAuthentication


class AppAuthentication(TokenAuthentication):
  """
  change the default class keyword from Token to Bearer
  """
  keyword = 'Bearer'