from django.urls import path
from users import views

urlpatterns = [
    path('', views.index, name='index'),
    path('customers', views.CustomerList.as_view(), name='customer_list'),
    path('customers/<int:pk>', views.CustomerDetail.as_view(), name='customer_detail'),
    path('users', views.UserList.as_view(), name='users'),
    path('login', views.login, name='login'),    
    path('logout', views.logout, name='logout'),    
    path('register', views.register, name='register'),    
]
