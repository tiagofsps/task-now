from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import UtilizadorSerializer
from django.db import transaction
from .models import Utilizador

'''@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')
    if username is None or password is None:
        return Response({'error': 'invalid username/password'}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
    user = User.objects.create_user(username=username, password=password)
    return Response({'message': 'User ' + user.username + ' created successfully'}, status=status.HTTP_201_CREATED)'''

@api_view(['POST'])
def signup(request):
    username = request.data.get('user', {}).get('username')

    if not username:
        return Response({'error': 'Username em falta'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username já existe'}, status=status.HTTP_400_BAD_REQUEST)

    serializer = UtilizadorSerializer(data=request.data)

    if serializer.is_valid():
        utilizador = serializer.save()
        return Response({'message': f'Utilizador {utilizador.user.username} criado com sucesso!'}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)  # Criação da sessão
        return Response({'Login efetuado com sucesso'})
    else:
        return Response({'Erro: credenciais inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def logout_view(request):
    logout(request)
    return Response({'message': 'Logged out successfully'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_view(request):
    return Response({'username': request.user.username})
