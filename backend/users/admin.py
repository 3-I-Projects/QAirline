from django.contrib import admin
from .models import Customer, CustomUser

admin.site.register(Customer)
admin.site.register(CustomUser)