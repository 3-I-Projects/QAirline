from django.contrib import admin
from .models import Flight, Plane, Seat, Airport

# Register your models here.
admin.site.register(Flight)
admin.site.register(Plane)
admin.site.register(Seat)
admin.site.register(Airport)