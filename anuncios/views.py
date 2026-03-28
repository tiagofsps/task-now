from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Anuncio, Distrito, TipoServico
from .serializers import AnuncioSerializer, AnuncioCreateUpdateSerializer, DistritoSerializer, TipoServicoSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listar_anuncio_utilizador(request):
    """Lista o anúncio do utilizador autenticado"""
    anuncios = Anuncio.objects.filter(autor=request.user)

    if not anuncios.exists():
        return Response({'detail': 'Nenhum anúncio encontrado.'}, status=404)

    serializer = AnuncioSerializer(anuncios.first())  # Retorna o primeiro anúncio
    return Response(serializer.data)


from .models import ImagemAnuncio
from .serializers import ImagemAnuncioSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def criar_anuncio(request):
    """Cria um novo anúncio para o utilizador autenticado"""
    serializer = AnuncioCreateUpdateSerializer(data=request.data, context={'request': request})

    if serializer.is_valid():
        anuncio = serializer.save()

        # Lidar com as imagens adicionais (fotos)
        images = request.FILES.getlist('images')
        for img in images:
            ImagemAnuncio.objects.create(anuncio=anuncio, imagem=img)

        return Response(AnuncioSerializer(anuncio).data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def atualizar_anuncio(request, anuncio_id):
    """Atualiza um anúncio existente do utilizador"""
    try:
        anuncio = Anuncio.objects.get(id=anuncio_id, autor=request.user)
    except Anuncio.DoesNotExist:
        return Response({'erro': 'Anúncio não encontrado.'}, status=status.HTTP_404_NOT_FOUND)

    partial = request.method == 'PATCH'
    serializer = AnuncioCreateUpdateSerializer(anuncio, data=request.data, partial=partial, context={'request': request})
    if serializer.is_valid():
        anuncio = serializer.save()
        return Response(AnuncioSerializer(anuncio).data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def apagar_anuncio(request, anuncio_id):
    """Apaga um anúncio existente do utilizador"""
    try:
        anuncio = Anuncio.objects.get(id=anuncio_id, autor=request.user)
        anuncio.delete()
        return Response({'mensagem': 'Anúncio apagado com sucesso.'}, status=status.HTTP_204_NO_CONTENT)
    except Anuncio.DoesNotExist:
        return Response({'erro': 'Anúncio não encontrado.'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def anuncio_detalhes(request, anuncio_id):
    """Retorna os detalhes de um anúncio específico"""
    try:
        anuncio = Anuncio.objects.get(id=anuncio_id)
    except Anuncio.DoesNotExist:
        return Response({'erro': 'Anúncio não encontrado.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = AnuncioSerializer(anuncio)
    return Response(serializer.data)

@api_view(['GET'])
def listar_distritos(request):
    distritos = Distrito.objects.all()
    serializer = DistritoSerializer(distritos, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def listar_tipos_servico(request):
    servicos = TipoServico.objects.all()
    serializer = TipoServicoSerializer(servicos, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def anuncio_search(request):
    distrito_ids = request.GET.getlist('distrito_id')
    tiposervico_ids = request.GET.getlist('tiposervico_id')

    anuncios = Anuncio.objects.all()

    if distrito_ids:
        anuncios = anuncios.filter(distrito_id__in=distrito_ids).distinct()

    if tiposervico_ids:
        anuncios = anuncios.filter(tipo_servico__id__in=tiposervico_ids).distinct()

    serializer = AnuncioSerializer(anuncios, many=True)
    return Response(serializer.data)