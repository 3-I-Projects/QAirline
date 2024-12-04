from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework import mixins
from rest_framework import generics

from flights.models import Flight, Seat
from users.models import Customer
from tickets.models import Ticket
from tickets.serializers import TicketSerializer

class TicketList(generics.ListCreateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        # return self.create(request, *args, **kwargs)
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
        serializer = TicketSerializer(ticket)
        return Response(serializer.data)

class TicketDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    # def delete(self, request, *args, **kwargs):
    #     return self.delete(request, *args, **kwargs)

@api_view(['DELETE'])
def cancel(request):
    ticket_id = request.data['id']
    ticket = Ticket(pk=ticket_id)
    seat = ticket.seat
    ordered_time = ticket.ordered_time
    print(seat)
    # ticket.delete()
    return Response('hi')