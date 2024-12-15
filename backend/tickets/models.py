from django.db import models
from django.contrib.auth.models import User
from users.models import Customer, CustomUser
from flights.models import Flight, Seat

# Create your models here.
class Ticket(models.Model):
    STATUSES = [
        ('Booked', 'Booked'),
        ('Cancelled', 'Cancelled'),
        ('Paid', 'Paid')
    ]
    class Meta:
        verbose_name_plural = "ticketzzzzzz"

    booked_by = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, related_name='booked_tickets', null=True, default=None)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='customer_tickets')
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE, related_name='bookings')
    seat = models.OneToOneField(Seat, on_delete=models.CASCADE, related_name='booked_ticket', null=True, default=None, blank=True)
    price = models.IntegerField()
    ordered_time = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='Booked', choices=STATUSES)

    def __str__(self):
        return f'Flight to {self.flight.destination_airport} for {self.customer}'