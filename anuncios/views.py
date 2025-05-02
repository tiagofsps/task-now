from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Anuncio
from .serializers import AnuncioSerializer
from django.http import JsonResponse
from .models import Distrito

@api_view(['GET'])
def lista_anuncios(request):
    anuncios = Anuncio.objects.all()
    serializer = AnuncioSerializer(anuncios, many=True)
    return Response(serializer.data)

def sugerir_distritos(request):
    termo = request.GET.get('q', '')
    distritos = Distrito.objects.filter(nome__icontains=termo).values_list('nome', flat=True)
    return JsonResponse(list(distritos), safe=False)

