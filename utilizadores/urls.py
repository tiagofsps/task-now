from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UtilizadorViewSet


router = DefaultRouter()
router.register(r'utilizadores', UtilizadorViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
