from rest_framework import serializers
from .models import Ticket

class TicketSerializer(serializers.ModelSerializer):
    from_airport_code = serializers.SerializerMethodField()
    to_airport_code = serializers.SerializerMethodField()
    from_airport_city = serializers.SerializerMethodField()
    to_airport_city = serializers.SerializerMethodField()
    departure_time = serializers.SerializerMethodField()
    arrival_time = serializers.SerializerMethodField()
    plane = serializers.SerializerMethodField()
    seat_pos = serializers.SerializerMethodField()
    seat_class = serializers.SerializerMethodField()

    class Meta:
        model = Ticket
        fields = ["id" ,"price" ,"ordered_time", "status", "booked_by" ,"customer" ,"flight", "seat", "from_airport_code", "to_airport_code", "from_airport_city", "to_airport_city", "departure_time", "arrival_time", "plane", "seat_pos", "seat_class"]
        read_only_fields = ['price', 'booked_by', 'status']

    def get_from_airport_code(self, obj):
        return obj.flight.origin_airport.code
    
    def get_to_airport_code(self, obj):
        return obj.flight.destination_airport.code
    
    def get_from_airport_city(self, obj):
        return obj.flight.origin_airport.city
    
    def get_to_airport_city(self, obj):
        return obj.flight.destination_airport.city
    
    def get_departure_time(self, obj):
        return obj.flight.departure_time
    
    def get_arrival_time(self, obj):
        return obj.flight.arrival_time
    
    def get_plane(self, obj):
        return obj.flight.plane.registration_number
    
    def get_seat_pos(self, obj):
        if obj.seat is None:
            return None
        return obj.seat.row + obj.seat.column
    
    def get_seat_class(self, obj):
        if obj.seat is None:
            return None
        return obj.seat.seat_class