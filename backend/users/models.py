from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    birthday = models.DateField()
    country = models.CharField(max_length=10, choices=[('VN', 'VietNam'), ('L', 'Lao'), ('CN', 'China')]) # maybe replace with CountryField from django_countries
    phone_number = models.CharField(max_length=12) # maybe replace with PhoneNumberField from phonenumber_field library
    email = models.EmailField()
    gender = models.CharField(max_length=10, choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other')])
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='customers')

    def __str__(self):
        return f'{self.first_name} {self.last_name}'