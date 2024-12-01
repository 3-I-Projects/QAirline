from django.db import models
from django.contrib.auth.models import User
from users.models import Customer
from flights.models import Flight, Seat

# Create your models here.
class Ticket(models.Model):
    booked_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tickets')
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='tickets')
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE, related_name='bookings')
    seat = models.OneToOneField(Seat, on_delete=models.CASCADE, related_name='ticket')
    price = models.IntegerField()
    ordered_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Flight to {self.flight.destination_airport} for {self.customer}'