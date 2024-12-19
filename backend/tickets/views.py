import datetime
from django.utils import timezone
from django.shortcuts import render
from django.db import transaction

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework import mixins
from rest_framework import generics
from rest_framework import permissions

from flights.models import Flight, Seat
from users.models import Customer
from users.serializers import CustomUserSerializer
from tickets.models import Ticket
from tickets.serializers import TicketSerializer
from tickets.permissions import IsOwnerOrAdminOrReadOnly
from users.permissions import IsAdminOrOwner

from utils.utils import purge_unpaid_tickets

CANCEL_TIME_AMOUNT = datetime.timedelta(days=1)


class TicketList(generics.ListCreateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @transaction.atomic
    def post(self, request, *args, **kwargs): # shouldve used serializer more here
        # get flight
        print(request.data)
        flight = request.data['flight']
        flight = Flight.objects.get(pk=flight)
        # remove all tickets booked but not paid after 5 min
        purge_unpaid_tickets(flight)
        if flight.seats.filter(is_available=True).count() == 0:
            return Response({'error': 'no available seats'}, status=status.HTTP_404_NOT_FOUND)
        
        # get cheapest available seat
        seat = request.data['seat']
        if not seat:
            seat = flight.seats.filter(is_available=True).order_by('price').first()
            print(seat)
            if hasattr(seat, 'booked_ticket') and seat.booked_ticket:
                print('seat is ', seat.booked_ticket.status)
                if seat.booked_ticket.status == 'Paid':
                    seat.is_available = True
                    seat.save()
                    return Response({'error': 'seat not available, please choose seat again'}, status=status.HTTP_404_NOT_FOUND)
                else:
                    tik = seat.booked_ticket
                    tik.status = 'Cancelled'
                    tik.seat = None
                    tik.save()
        else:
            seat = Seat.objects.get(pk=seat)
        # check if seat not in flight
        if seat.id not in [seat.id for seat in flight.seats.all()]:
            return Response({'error': 'seat not in flight'}, status=status.HTTP_404_NOT_FOUND)
        # check if seat is available
        if not seat.is_available:
            return Response({'error': 'seat not available'}, status=status.HTTP_404_NOT_FOUND)
        customer = request.data['customer']
        customer = Customer.objects.get(pk=customer)
        price = seat.price + flight.base_price
        user = request.user if request.user.is_authenticated else None
        ticket = Ticket(booked_by=user, customer=customer, flight=flight, seat=seat, price=price)
        serializer = self.get_serializer(ticket)
        ticket.save()
        seat.is_available = False
        seat.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class TicketDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    def get_permissions(self):
        if self.request.method == 'PUT':
            self.permission_classes = []
        else:
            self.permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrAdminOrReadOnly]
        return super().get_permissions()

    def put(self, request, *args, **kwargs):
        ticket = Ticket.objects.get(pk=kwargs['pk'])
        if ticket.status == 'Cancelled':
            return Response({'error': 'ticket is cancelled'}, status=status.HTTP_404_NOT_FOUND)
        ticket.status = 'Paid'
        ticket.save()
        ticket.seat.is_available = False
        ticket.seat.save()
        serializer = self.get_serializer(ticket)
        return Response(serializer.data)
        # return Response("can't do that")

    def patch(self, request, pk, *args, **kwargs):
        ticket = Ticket.objects.get(pk=pk)
        if ticket.status == 'Cancelled':
            return Response({'error': 'ticket is cancelled'}, status=status.HTTP_404_NOT_FOUND)
        ticket.status = 'Paid'
        ticket.save()
        ticket.seat.is_available = False
        ticket.seat.save()
        serializer = self.get_serializer(ticket)
        return Response(serializer.data)
        # return self.partial_update(request, *args, **kwargs)
        return Response(f"can't do that with {pk}")

    def delete(self, request, pk, *args, **kwargs):
        ticket = Ticket.objects.get(pk=pk)
        if ticket.status == 'Cancelled':
            return Response({'error': 'ticket is cancelled'}, status=status.HTTP_404_NOT_FOUND)
        seat = ticket.seat
        ordered_time = ticket.ordered_time
        cancel_threshold = ordered_time + CANCEL_TIME_AMOUNT
        if timezone.now() > cancel_threshold:
            return Response("can't do that anymore idiot")
        seat.is_available = True
        seat.booked_ticket = None
        seat.save()
        ticket.status = 'Cancelled'
        ticket.save()
        serializer = self.get_serializer(ticket)
        # return self.delete(request, *args, **kwargs)
        return Response(serializer.data)