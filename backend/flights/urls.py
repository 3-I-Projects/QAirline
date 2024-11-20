from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('airports', views.airports, name='airports'),
    path('airports/<int:pk>', views.edit_airport, name='edit_airport'),
    path('planes', views.planes, name='planes'),
    path('planes/<int:pk>', views.edit_plane, name='edit_plane'),
]
