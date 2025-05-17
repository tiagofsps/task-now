from rest_framework import serializers
from .models import Distrito, TipoServico, Anuncio, ImagemAnuncio

class ImagemAnuncioSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagemAnuncio
        fields = ['id', 'imagem']  # Campos das imagens associadas ao anúncio

class DistritoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Distrito
        fields = ['id', 'nome']  # Informação sobre os distritos

class TipoServicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoServico
        fields = ['id', 'designacao']  # Tipos de serviço disponíveis

class AnuncioSerializer(serializers.ModelSerializer):
    primeiro_nome = serializers.CharField(source='autor.first_name', read_only=True)
    ultimo_nome = serializers.CharField(source='autor.last_name', read_only=True)
    contacto = serializers.CharField(source='autor.utilizador.contacto', read_only=True)
    distrito = DistritoSerializer(read_only=True)
    tipos_servico = TipoServicoSerializer(source='tipo_servico', many=True, read_only=True)
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
    distrito = serializers.PrimaryKeyRelatedField(queryset=Distrito.objects.all())
    tipo_servico = serializers.PrimaryKeyRelatedField(queryset=TipoServico.objects.all(), many=True)
    imagens = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False
    )

    class Meta:
        model = Anuncio
        fields = [
            'distrito',
            'tipo_servico',
            'titulo',
            'descricao',
            'imagem_perfil',
            'imagens'  # novo campo para a galeria
        ]

    def create(self, validated_data):
        imagens = validated_data.pop('imagens', [])
        tipo_servico = validated_data.pop('tipo_servico')
        anuncio = Anuncio.objects.create(autor=self.context['request'].user, **validated_data)
        anuncio.tipo_servico.set(tipo_servico)

        # Guardar imagens
        for imagem in imagens:
            ImagemAnuncio.objects.create(anuncio=anuncio, imagem=imagem)

        return anuncio

    def update(self, instance, validated_data):
        imagens = validated_data.pop('imagens', None)
        tipo_servico = validated_data.pop('tipo_servico', None)

        # Atualiza campos base
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Atualiza tipos de serviço se fornecidos
        if tipo_servico is not None:
            instance.tipo_servico.set(tipo_servico)

        # Substitui as imagens se fornecidas
        if imagens is not None:
            # Apagar imagens antigas
            instance.imagens.all().delete()
            for imagem in imagens:
                ImagemAnuncio.objects.create(anuncio=instance, imagem=imagem)

        return instance