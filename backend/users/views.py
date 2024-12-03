from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework import mixins
from rest_framework import generics
from rest_framework import status
from rest_framework import permissions

from .serializers import *

# user store for booked tickets
def bookings(request):
    return

class CustomerList(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
        

# testing authentication route
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def index(request):
    print(request.auth)
    user = Token.objects.get(pk=request.auth).user
    print(user)
    return Response({'message': f'hello {user}'})

@api_view(['POST'])
def login(request):
    user = get_object_or_404(User, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({'error': 'not found'}, status=status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user=user)
    # print(created)
    serializer = UserSerializer(instance=user)
    return Response({'token': token.key, 'user': serializer.data})

@api_view(['POST'])
def logout(request):
    if request.auth:  # Ensure there is an auth object
        request.auth.delete()  # Delete the token
        return Response({'message': 'Logout successfully'})
    else:
        return Response({'error': 'No active session found'}, status=400)

# @api_view(['POST'])
# @csrf_exempt
# def login(request):
#     print(request.body)
#     username = request.POST.get('username')
#     print(username)
#     password = request.POST.get('password')
#     user = authenticate(request, username=username, password=password)
#     print(user)
#     if user is not None:
#         login(request)
#         # print(test)
#         return Response({'user': user})
#     else:
#         return Response({'error': 'not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)
        print(token)
        print(user.id)
        print(user)
        res = Response({'token': token.key, 'user': serializer.data})
        res.set_cookie(
            'token', token.key,
            secure=True,
            httponly=True
        )
        return res
    return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)
