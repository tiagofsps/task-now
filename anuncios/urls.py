from django.urls import path
from . import views

urlpatterns = [
    path('todos/', views.lista_anuncios, name='lista_anuncios'),
]
