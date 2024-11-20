from django.db import models

# Create your models here.
class Flight(models.Model):
    plane = models.ForeignKey('Plane', on_delete=models.CASCADE, related_name='flights')
    origin_airport = models.ForeignKey('Airport', on_delete=models.CASCADE, related_name='departing_flights')
    destination_airport = models.ForeignKey('Airport', on_delete=models.CASCADE, related_name='arriving_flights')
    departure_time = models.DateTimeField()
    delay = models.IntegerField()
    arrival_time = models.DateTimeField()
    base_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f'Flight {self.plane.registration_number} from {self.origin_airport} to {self.destination_airport}'

class Seat(models.Model):
    plane = models.ForeignKey(Flight, on_delete=models.CASCADE, related_name='seats')
    row = models.CharField(max_length=3)
    column = models.CharField(max_length=3)
    is_available = models.BooleanField()
    seat_class = models.CharField(max_length=20)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f'{self.row}{self.column}'

class Airport(models.Model):
    code = models.CharField(max_length=3)
    city = models.CharField(max_length=100)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.code

class Plane(models.Model):
    registration_number = models.CharField(max_length=120)
    manufacturer = models.CharField(max_length=120)
    model = models.CharField(max_length=120)
    first_class_capacity = models.IntegerField()
    business_class_capacity = models.IntegerField()
    premium_class_capacity = models.IntegerField()
    economy_class_capacity = models.IntegerField()
    current_airport = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name='available_planes')

    def __str__(self):
        return self.registration_number