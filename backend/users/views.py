from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework import status
from rest_framework import permissions

from users.serializers import CustomUserSerializer, CustomerSerializer
from users.models import CustomUser, Customer
from users.permissions import IsAdminOrOwner

# user store for booked tickets
def bookings(request):
    return

class CustomerList(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        user_id = request.user.id if request.user.is_authenticated else None
        data = request.data.copy()
        print(data)
        data['created_by'] = user_id
        print(data)

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        # return self.create(request, *args, **kwargs)

class CustomerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class UserList(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [] # IsAdmin or something here @GoatYogurt

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAdminOrOwner]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        data = request.data.copy()

        if 'password' in data:
            instance.set_password(data['password'])
            data['password'] = instance.password

        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        # if getattr(instance, '_prefetched_objects_cache', None):
        #     instance._prefetched_objects_cache = {}

        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_info(request):
    user = request.user
    serializer = CustomUserSerializer(user)
    return Response(serializer.data)



























# testing authentication route
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def index(request):
    # print(request.auth)
    # user = Token.objects.get(pk=request.auth).user
    # print(user)
    return Response({'message': f'hello'})

@api_view(['POST'])
def login(request):
    user = get_object_or_404(CustomUser, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({'error': 'not found'}, status=status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user=user)
    # print(created)
    serializer = CustomUserSerializer(instance=user)
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
    serializer = CustomUserSerializer(data=request.data)
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
