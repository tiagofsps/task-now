from django.contrib.auth.models import User
from rest_framework import serializers
from mensagens.models import Mensagem  # Certifica-te que este import está correto
from utilizadores.models import Utilizador  # Se 'Utilizador' está noutra app

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class UtilizadorSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Utilizador
        fields = ['user', 'contacto', 'tipo']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = UserSerializer().create(user_data)
        return Utilizador.objects.create(user=user, **validated_data)

class MensagemSerializer(serializers.ModelSerializer):
    remetente_username = serializers.CharField(source='remetente.username', read_only=True)
    destinatario_username = serializers.CharField(source='destinatario.username', read_only=True)

    class Meta:
        model = Mensagem
        fields = ['id', 'remetente', 'remetente_username', 'destinatario', 'destinatario_username', 'texto', 'timestamp', 'lida']
        read_only_fields = ['remetente', 'lida']

class UserMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']