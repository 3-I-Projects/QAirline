from rest_framework import serializers
from .models import Customer, CustomUser
from tickets.models import Ticket
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class CustomUserSerializer(serializers.ModelSerializer):
    booked_tickets = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    # customers = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    customers = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        
        # added is_staff field to view user's role on admin page in frontend
        fields = ['id', 'username', 'password', 'email', 'booked_tickets', 'customers', 'is_staff']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def get_customers(self, obj):
        return [{'id': customer.id, 'name': customer.first_name + ' ' + customer.last_name} for customer in obj.customers.all()]

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email = validated_data.get('email')
        )
        return user
    

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'
        # read_only_fields = ['created_by']
        
    def update(self, instance, validated_data):
        validated_data.pop('created_by', None)
        return super().update(instance, validated_data)