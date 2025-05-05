from django.contrib.auth.models import User
from .models import Utilizador
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

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