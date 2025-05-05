from django.urls import path
from . import views

urlpatterns = [
    path('todos/', views.lista_anuncios, name='lista_anuncios'),
    path('sugerir-distritos/', views.sugerir_distritos, name='sugerir_distritos'),
]
