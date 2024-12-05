import datetime
from django.utils import timezone
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
from users.serializers import CustomUserSerializer

CANCEL_TIME_AMOUNT = datetime.timedelta(days=1)

class TicketList(generics.ListCreateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs): # shouldve used serializer more here
        seat = request.data['seat']
        seat = Seat.objects.get(pk=seat)
        if not seat.is_available:
            return Response({'error': 'seat not available'}, status=status.HTTP_404_NOT_FOUND)
        customer = request.data['customer']
        customer = Customer.objects.get(pk=customer)
        flight = request.data['flight']
        flight = Flight.objects.get(pk=flight)
        price = seat.price + flight.base_price
        user = request.user if request.user.is_authenticated else None
        ticket = Ticket(booked_by=user, customer=customer, flight=flight, seat=seat, price=price)
        serializer = self.get_serializer(ticket)
        serializer.save()
        seat.is_available = False
        seat.save()
        return Response(serializer.data)

class TicketDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    def put(self, request, *args, **kwargs):
        return Response("can't do that")

    def patch(self, request, pk, *args, **kwargs):
        # return self.partial_update(request, *args, **kwargs)
        return Response(f"can't do that with {pk}")

    def delete(self, request, pk, *args, **kwargs):
        ticket = Ticket.objects.get(pk=pk)
        seat = ticket.seat
        ordered_time = ticket.ordered_time
        cancel_threshold = ordered_time + CANCEL_TIME_AMOUNT
        if timezone.now() > cancel_threshold:
            return Response("can't do that anymore idiot")
        seat.is_available = True
        seat.save()
        return self.destroy(request, *args, **kwargs)
