from django.urls import path
from flights import views

urlpatterns = [
    path('', views.index, name='index'),
    path('find', views.find_flight, name='find_flight'),
    path('airports', views.AirportList.as_view(), name='airport_list'),
    path('airports/<int:pk>', views.AirportDetail.as_view(), name='airport_detail'),
    path('planes', views.planes, name='planes'),
    path('planes/<int:pk>', views.plane, name='plane'),
    path('flights', views.FlightList.as_view(), name='flight_list'),
    path('flights/<int:pk>', views.FlightDetail.as_view(), name='flight_detail'),
    path('flights/<int:pk>/seats', views.available_seats, name='available_seats'),
]
