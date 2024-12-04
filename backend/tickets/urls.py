from django.urls import path
from tickets import views

urlpatterns = [
    path('', views.TicketList.as_view(), name='ticket_list'),
    path('<int:pk>', views.TicketDetail.as_view(), name='ticket_detail'),
]