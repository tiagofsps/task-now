from django.contrib.auth.models import User
from .models import Utilizador
from rest_framework import serializers

'''User refere-se à tabela auth_user e Utilizador ao nosso modelo de dados Utilizador'''

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class UtilizadorSerializer(serializers.ModelSerializer):
    user = UserSerializer()  # aninhado

    class Meta:
        model = Utilizador
        fields = ['user', 'contacto', 'tipo']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = UserSerializer().create(user_data)
        utilizador = Utilizador.objects.create(user=user, **validated_data)
        return utilizador

class UtilizadorPublicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Utilizador
        fields = ['contacto', 'tipo']

class UserPublicSerializer(serializers.ModelSerializer):
    utilizador = UtilizadorPublicoSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'utilizador']