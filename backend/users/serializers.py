from rest_framework import serializers
from .models import Customer, CustomUser
from tickets.models import Ticket
from django.contrib.auth.models import User

class CustomUserSerializer(serializers.ModelSerializer):
    booked_tickets = serializers.PrimaryKeyRelatedField(queryset=Ticket.objects.all(), many=True)
    customers = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all(), many=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'password', 'email', 'booked_tickets', 'customers']


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'
        read_only_fields = ['created_by']