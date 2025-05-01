from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Utilizador


class UtilizadorSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='user.id', read_only=True)
    nome = serializers.CharField(source='user.first_name')
    email = serializers.EmailField(source='user.email')

    class Meta:
        model = Utilizador
        fields = ['id', 'nome', 'email', 'contacto', 'tipo']

    def update(self, instance, validated_data):
        # Atualizar dados do User
        user_data = validated_data.pop('user', {})
        user = instance.user
        user.first_name = user_data.get('first_name', user.first_name)
        user.email = user_data.get('email', user.email)
        user.save()

        # Atualizar dados do Utilizador
        instance.contacto = validated_data.get('contacto', instance.contacto)
        instance.tipo = validated_data.get('tipo', instance.tipo)
        instance.save()

        return instance
