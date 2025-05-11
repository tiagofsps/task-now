from django.urls import path
from . import views

urlpatterns = [
    path('api/anuncio/listar_anuncio_utilizador/', views.listar_anuncio_utilizador, name='listar_anuncio_utilizador'),
    path('api/anuncio/criar/', views.criar_anuncio, name='criar_anuncio'),
    path('api/anuncio/<int:anuncio_id>/atualizar/', views.atualizar_anuncio, name='atualizar_anuncio'),
    path('api/anuncio/<int:anuncio_id>/apagar/', views.apagar_anuncio, name='apagar_anuncio'),
    path('api/anuncio/<int:anuncio_id>/', views.anuncio_detalhe, name='anuncio_detalhe'),
    path('api/distritos/', views.listar_distritos, name='listar_distritos'),
    path('api/tipos_servico/', views.listar_tipos_servico, name='listar_tipos_servico'),
]
