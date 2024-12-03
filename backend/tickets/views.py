from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from flights.models import Flight, Seat
from users.models import Customer
from .models import Ticket
from .serializers import TicketSerializer

@api_view(['POST'])
def book(request):
    seat = request.data['seat']
    seat = Seat.objects.get(pk=seat)
    if not seat.is_available:
        return Response({'error': 'seat not available'}, status=status.HTTP_404_NOT_FOUND)
    seat.is_available = False
    seat.save()
    user = request.user
    customer = request.data['customer']
    customer = Customer.objects.get(pk=customer)
    flight = request.data['flight']
    flight = Flight.objects.get(pk=flight)
    price = seat.price + flight.base_price
    ticket = Ticket(booked_by=user, customer=customer, flight=flight, seat=seat, price=price)
    ticket.save()
    # print(customer)
    # print(flight)
    # print(seat)
    # print(user)
    serializer = TicketSerializer(ticket)
    return Response(serializer.data)

@api_view(['DELETE'])
def cancel(request):
    ticket_id = request.data['id']
    ticket = Ticket(pk=ticket_id)
    seat = ticket.seat
    ordered_time = ticket.ordered_time
    print(seat)
    # ticket.delete()
    return Response('hi')