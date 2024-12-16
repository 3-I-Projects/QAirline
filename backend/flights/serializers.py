from rest_framework import serializers
from .models import *

class AirportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Airport
        fields = '__all__'

class PlaneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plane
        fields = '__all__'

class FlightSerializer(serializers.ModelSerializer):
    origin_airport_code = serializers.SerializerMethodField()
    origin_airport_city = serializers.SerializerMethodField()
    destination_airport_code = serializers.SerializerMethodField()
    destination_airport_city = serializers.SerializerMethodField()
    available_seat_count = serializers.SerializerMethodField()

    class Meta:
        model = Flight
        fields = ['id', 'plane', 'origin_airport', 'destination_airport', 'departure_time', 'delay', 'base_price', 'arrival_time', 'available_seat_count', 'origin_airport_code', 'origin_airport_city', 'destination_airport_code', 'destination_airport_city']

    def get_origin_airport_code(self, obj):
        return obj.origin_airport.code  # Access the airport's code

    def get_destination_airport_code(self, obj):
        return obj.destination_airport.code
    
    def get_origin_airport_city(self, obj):
        return obj.origin_airport.city
    
    def get_destination_airport_city(self, obj):
        return obj.destination_airport.city
    
    def get_available_seat_count(self, obj):
        return obj.seats.filter(is_available=True).count()
    
class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = '__all__'