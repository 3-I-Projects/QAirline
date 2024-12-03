from django.urls import path
from tickets import views

urlpatterns = [
    path('', views.TicketList.as_view(), name='book'),
    path('cancel', views.cancel, name='cancel'),
]