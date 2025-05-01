from django.urls import path
from . import views

urlpatterns = [
    path('perfil/', views.utilizador, name='utilizador'),
    path('login/', views.custom_login, name='login'),
]
