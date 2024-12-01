from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def book(request):
    user = request.user
    print(user)
    return Response('helo')