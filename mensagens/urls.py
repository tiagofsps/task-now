from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    MensagemViewSet,
    get_logged_in_user,
    lista_utilizadores,
    listar_conversas,
)

router = DefaultRouter()
router.register(r'mensagens', MensagemViewSet, basename='mensagem')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/utilizadores/', lista_utilizadores),
    path('api/conversas/', listar_conversas),  # ⬅️ novo endpoint
]