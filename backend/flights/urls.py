from django.urls import path
from flights import views

urlpatterns = [
    path('', views.index, name='index'),
    path('find', views.find_flight, name='find_flight'),
    path('airports', views.AirportList.as_view(), name='airports'),
    path('airports/<int:pk>', views.AirportDetail.as_view(), name='airport'),
    path('planes', views.planes, name='planes'),
    path('planes/<int:pk>', views.plane, name='plane'),
    path('flights', views.flights, name='flights'),
    path('flights/<int:pk>', views.flight, name='flight'),
    path('flights/<int:flight_id>/seats', views.available_seats, name='available_seats'),
]
