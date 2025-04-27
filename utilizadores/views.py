from rest_framework import viewsets
from .models import Utilizador
from .serializers import UtilizadorSerializer

class UtilizadorViewSet(viewsets.ModelViewSet):
    queryset = Utilizador.objects.all()
    serializer_class = UtilizadorSerializer
