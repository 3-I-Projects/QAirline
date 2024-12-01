from django.urls import path
from . import views

urlpatterns = [
    path('', views.book, name='book'),
    path('cancel', views.cancel, name='cancel'),
]