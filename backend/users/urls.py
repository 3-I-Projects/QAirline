from django.urls import path
from users import views

urlpatterns = [
    path('', views.index, name='index'),
    path('customers', views.CustomerList.as_view(), name='customers'),
    path('login', views.login, name='login'),    
    path('logout', views.logout, name='logout'),    
    path('register', views.register, name='register'),    
]
