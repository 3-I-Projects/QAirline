import datetime
from django.utils import timezone

from django.shortcuts import render
from django.http import HttpResponse
from django.db.models import Q

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework import generics

from .serializers import *
from .models import *

# Create your views here.
@api_view(['GET'])
def index(request):
    return Response('hello world')

class AirportList(generics.ListCreateAPIView):
    """
    List all airports, or create a new airport.
    """
    queryset = Airport.objects.all()
    serializer_class = AirportSerializer

    def get(self, request, format=None):
        airports = Airport.objects.all()
        serializer = AirportSerializer(airports, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = AirportSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class AirportDetail(APIView):
    """
    Retrieve, update or delete a airport instance.
    """
    queryset = Airport.objects.all()
    serializer_class = AirportSerializer

    def get_object(self, pk):
        try:
            return Airport.objects.get(pk=pk)
        except Airport.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk, format=None):
        airport = self.get_object(pk)
        serializer = AirportSerializer(airport)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        airport = self.get_object(pk)
        serializer = AirportSerializer(airport, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        airport = self.get_object(pk)
        airport.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class PlaneList(generics.ListCreateAPIView):
    queryset = Plane.objects.all()
    serializer_class = PlaneSerializer

class PlaneDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Plane.objects.all()
    serializer_class = PlaneSerializer

class FlightList(generics.ListCreateAPIView):
    """
    List all flights, or create a new flight.
    """
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        serializer = FlightSerializer(data=request.data)
        if serializer.is_valid():
            # print(serializer.validated_data)
            flight = serializer.save()
            # print(flight)
            plane = flight.plane
            row = 1
            col = 'A'
            for i in range(plane.first_class_row_count):
                for i in range(6):
                    Seat.objects.create(flight=flight, row=row, column=col, is_available=True, seat_class=0, price=30) # fix this magic number
                    col = chr(ord(col) + 1)
                    if col == 'G':
                        row += 1
                        col = 'A'
            for i in range(plane.business_class_row_count):
                for i in range(6):
                    Seat.objects.create(flight=flight, row=row, column=col, is_available=True, seat_class=1, price=20)
                    col = chr(ord(col) + 1)
                    if col == 'G':
                        row += 1
                        col = 'A'
            for i in range(plane.premium_class_row_count):
                for i in range(6):
                    Seat.objects.create(flight=flight, row=row, column=col, is_available=True, seat_class=2, price=20)
                    col = chr(ord(col) + 1)
                    if col == 'G':
                        row += 1
                        col = 'A'
            for i in range(plane.economy_class_row_count):
                for i in range(6):
                    Seat.objects.create(flight=flight, row=row, column=col, is_available=True, seat_class=3, price=20)
                    col = chr(ord(col) + 1)
                    if col == 'G':
                        row += 1
                        col = 'A'
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
class FlightDetail(generics.ListCreateAPIView):
    """
    Retrieve, update or delete a flight instance.
    """
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer

    def get_object(self, pk):
        try:
            return Flight.objects.get(pk=pk)
        except Flight.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk, format=None):
        flight = self.get_object(pk)
        serializer = FlightSerializer(flight)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        flight = self.get_object(pk)
        serializer = FlightSerializer(flight, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        flight = self.get_object(pk)
        flight.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def available_seats(request, pk):
    try:
        # print(request.data)
        flight = Flight.objects.get(pk=pk)
        filled_seats = flight.seats.filter(is_available=False)
        for seat in filled_seats:
            if not hasattr(seat, 'booked_ticket'):
                continue
            if seat.booked_ticket.status == 'Paid':
                continue

            time_since_booking = timezone.now() - seat.booked_ticket.ordered_time
            if time_since_booking > datetime.timedelta(hours=1):  # assuming 1 hour is the threshold
                seat.is_available = True
                seat.booked_ticket.status = 'Cancelled'
                seat.booked_ticket.save()
                seat.booked_ticket = None
                seat.save()
        seats = flight.seats.all()
        serializer = SeatSerializer(seats, many=True)
        return Response(serializer.data)
    except Flight.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    

@api_view(['POST'])
def find_flight(request):
    from_date = request.data['from_date'].split('-')
    from_date = datetime.datetime(int(from_date[0]), int(from_date[1]), int(from_date[2]))
    from_date = timezone.make_aware(from_date, timezone.get_current_timezone())
    to_date = request.data['to_date'].split('-')
    to_date = datetime.datetime(int(to_date[0]), int(to_date[1]), int(to_date[2]))
    to_date = timezone.make_aware(to_date, timezone.get_current_timezone())
    from_airport = request.data['from_airport']
    to_airport = request.data['to_airport']

    flights = Flight.objects.filter(Q(departure_time__gt=from_date) & Q(departure_time__lt=to_date) & Q(origin_airport__id=from_airport) & Q(destination_airport__id=to_airport))
    serializer = FlightSerializer(flights, many=True)

    return Response(serializer.data)
















# @api_view(['GET', 'POST'])
# def planes(request):
#     if request.method == 'GET':
#         planes = Plane.objects.all()
#         serializer = PlaneSerializer(planes, many=True)
#         return Response(serializer.data)
#     elif request.method == 'POST':
#         serializer = PlaneSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# @api_view(['GET', 'PUT', 'DELETE'])
# def plane(request, pk):
#     try:
#         plane = Plane.objects.get(pk=pk)
#     except Plane.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
    
#     if request.method == 'GET':
#         serializer = PlaneSerializer(plane)
#         return Response(serializer.data)
#     elif request.method == 'PUT':
#         serializer = PlaneSerializer(plane, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     elif request.method == 'DELETE':
#         plane.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)