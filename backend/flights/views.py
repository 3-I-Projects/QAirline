from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .serializers import *
from .models import *

# Create your views here.
@api_view(['GET'])
def index(request):
    return Response('hello world')

@api_view(['GET', 'POST'])
def airports(request):
    if request.method == 'GET':
        airports = Airport.objects.all()
        serializer = AirportSerializer(airports, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = AirportSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def airport(request, pk):
    try:
        airport = Airport.objects.get(pk=pk)
    except Airport.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = AirportSerializer(airport)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = AirportSerializer(airport, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        airport.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

@api_view(['GET', 'POST'])
def planes(request):
    if request.method == 'GET':
        planes = Plane.objects.all()
        serializer = PlaneSerializer(planes, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = PlaneSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET', 'PUT', 'DELETE'])
def plane(request, pk):
    try:
        plane = Plane.objects.get(pk=pk)
    except Plane.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = PlaneSerializer(plane)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = PlaneSerializer(plane, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        plane.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def flights(request):
    if request.method == 'GET':
        flights = Flight.objects.all()
        serializer = FlightSerializer(flights, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = FlightSerializer(data=request.data)
        if serializer.is_valid():
            print(serializer.validated_data)
            # serializer.save()
            flight = serializer.save()
            print(flight)
            plane = flight.plane
            row = 1
            col = 'A'
            for i in range(plane.first_class_capacity):
                Seat.objects.create(flight=flight, row=row, column=col, is_available=True, seat_class=1, price=30)
                col = chr(ord(col) + 1)
                if col == 'G':
                    row += 1
                    col = 'A'
            for i in range(plane.business_class_capacity):
                Seat.objects.create(flight=flight, row=row, column=col, is_available=True, seat_class=2, price=20)
                col = chr(ord(col) + 1)
                if col == 'G':
                    row += 1
                    col = 'A'
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def flight(request, pk):
    try:
        flight = Flight.objects.get(pk=pk)
    except Flight.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = FlightSerializer(flight)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = FlightSerializer(flight, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        flight.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def available_seats(request, flight_id):
    try:
        flight = Flight.objects.get(pk=flight_id)
        seats = flight.seats.filter(is_available=True)
        serializer = SeatSerializer(seats, many=True)
        return Response(serializer.data)
    except Flight.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    