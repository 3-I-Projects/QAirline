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
    
    class Meta:
        model = Flight
        fields = ['id', 'plane', 'origin_airport', 'destination_airport', 'departure_time', 'delay', 'base_price', 'arrival_time', 'origin_airport_code', 'origin_airport_city', 'destination_airport_code', 'destination_airport_city']

    def get_origin_airport_code(self, obj):
        return obj.origin_airport.code  # Access the airport's code

    def get_destination_airport_code(self, obj):
        return obj.destination_airport.code
    
    def get_origin_airport_city(self, obj):
        return obj.origin_airport.city
    
    def get_destination_airport_city(self, obj):
        return obj.destination_airport.city
    
class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = '__all__'