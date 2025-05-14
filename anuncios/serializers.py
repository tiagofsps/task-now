from rest_framework import serializers
from .models import Distrito, TipoServico, Anuncio, ImagemAnuncio

class ImagemAnuncioSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagemAnuncio
        fields = ['id', 'imagem']  # Campos das imagens associadas ao anúncio

class AnuncioSerializer(serializers.ModelSerializer):
    primeiro_nome = serializers.CharField(source='autor.first_name', read_only=True)
    ultimo_nome = serializers.CharField(source='autor.last_name', read_only=True)
    contacto = serializers.CharField(source='autor.utilizador.contacto', read_only=True)
    distrito = serializers.StringRelatedField()
    tipos_servico = serializers.SerializerMethodField()
    imagens = ImagemAnuncioSerializer(many=True, read_only=True)

    def get_tipos_servico(self, obj):
        return [str(servico) for servico in obj.tipo_servico.all()]

    class Meta:
        model = Anuncio
        fields = [
            'id',
            'primeiro_nome',
            'ultimo_nome',
            'contacto',
            'distrito',
            'tipos_servico',
            'titulo',
            'descricao',
            'imagem_perfil',
            'autor',
            'imagens',
        ]

class AnuncioCreateUpdateSerializer(serializers.ModelSerializer):
    """Serializer para criação e atualização de Anuncios."""
    distrito = serializers.PrimaryKeyRelatedField(queryset=Distrito.objects.all())
    tipo_servico = serializers.PrimaryKeyRelatedField(queryset=TipoServico.objects.all(), many=True)

    class Meta:
        model = Anuncio
        fields = [
            'distrito',
            'tipo_servico',
            'titulo',
            'descricao',
            'imagem_perfil',  # O campo para a imagem de perfil do anúncio
        ]

    def create(self, validated_data):
        tipo_servico = validated_data.pop('tipo_servico')
        anuncio = Anuncio.objects.create(autor=self.context['request'].user, **validated_data)
        anuncio.tipo_servico.set(tipo_servico)
        return anuncio

    def update(self, instance, validated_data):
        tipo_servico = validated_data.pop('tipo_servico', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if tipo_servico is not None:
            instance.tipo_servico.set(tipo_servico)
        return instance

class DistritoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Distrito
        fields = ['id', 'nome']  # Informação sobre os distritos

class TipoServicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoServico
        fields = ['id', 'designacao']  # Tipos de serviço disponíveis