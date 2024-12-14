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
    
    class Meta:
        model = Flight
        fields = ['id', 'plane', 'origin_airport', 'destination_airport', 'departure_time', 'delay', 'base_price', 'arrival_time', 'origin_airport_code']

    def get_origin_airport_code(self, obj):
        return obj.origin_airport.code  # Access the airport's code

    def get_destination_airport_code(self, obj):
        return obj.destination_airport.code
    
class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = '__all__'