from rest_framework import serializers
from .models import Anuncio, Distrito, ImagemAnuncio, TipoServico

class DistritoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Distrito
        fields = ['id', 'nome']

class TipoServicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoServico
        fields = ['id', 'designacao', 'descricao']

class ImagemAnuncioSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagemAnuncio
        fields = ['id', 'url']

class AnuncioSerializer(serializers.ModelSerializer):
    distrito_id = DistritoSerializer()

    class Meta:
        model = Anuncio
        fields = ['id', 'autor_id', 'distrito_id', 'titulo', 'descricao', 'ativo']
