from rest_framework import serializers
from .models import Customer, CustomUser
from tickets.models import Ticket
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class CustomUserSerializer(serializers.ModelSerializer):
    booked_tickets = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    customers = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'password', 'email', 'booked_tickets', 'customers']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email = validated_data.get('email')
        )
        return user
    
    # def get_tokens(self, obj):
    #     refresh = RefreshToken.for_user(obj)
    #     return {
    #         'refresh': str(refresh),
    #         'access': str(refresh.access_token),
    #     }

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'
        # read_only_fields = ['created_by']
        
    def update(self, instance, validated_data):
        validated_data.pop('created_by', None)
        return super().update(instance, validated_data)