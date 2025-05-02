from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Anuncio
from .serializers import AnuncioSerializer

@api_view(['GET'])
def lista_anuncios(request):
    anuncios = Anuncio.objects.all()
    serializer = AnuncioSerializer(anuncios, many=True)
    return Response(serializer.data)
