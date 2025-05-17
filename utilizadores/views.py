from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import UtilizadorSerializer
from django.db import transaction
from .models import Utilizador

@api_view(['POST'])
def signup_view(request):
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

'''@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_view(request):
    return Response({'username': request.user.username})'''

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_view(request):
    try:

        utilizador = Utilizador.objects.get(user=request.user)
        serializer = UtilizadorSerializer(utilizador)
        return Response(serializer.data)
    except Utilizador.DoesNotExist:
        return Response({'detail': 'Utilizador não encontrado.'}, status=404)

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def perfil_view(request):
    user = request.user

    try:
        utilizador = Utilizador.objects.get(user=user)
    except Utilizador.DoesNotExist:
        return Response({'detail': 'Utilizador não encontrado.'}, status=404)

    if request.method == 'GET':
        return Response({
            'user': {
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name
            },
            'contacto': utilizador.contacto,
            'tipo': utilizador.tipo
        })

    elif request.method == 'PUT':
        user_data = request.data.get('user', {})
        contacto = request.data.get('contacto', utilizador.contacto)

        # Atualizar campos do user
        for attr in ['username', 'email', 'first_name', 'last_name']:
            if attr in user_data:
                setattr(user, attr, user_data[attr])
        user.save()

        # Atualizar contacto
        utilizador.contacto = contacto
        utilizador.save()

        return Response({'message': 'Perfil atualizado com sucesso.'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listar_utilizadores(request):
    utilizador = Utilizador.objects.get(user=request.user)
    if utilizador.tipo != 'administrador':
        return Response({'detail': 'Acesso negado.'}, status=403)

    utilizadores = Utilizador.objects.select_related('user').all()
    serializer = UtilizadorSerializer(utilizadores, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editar_utilizador(request, id):
    utilizador_req = Utilizador.objects.get(user=request.user)
    if utilizador_req.tipo != 'administrador':
        return Response({'detail': 'Acesso negado.'}, status=403)

    try:
        utilizador = Utilizador.objects.get(id=id)
        user = utilizador.user
    except Utilizador.DoesNotExist:
        return Response({'detail': 'Utilizador não encontrado.'}, status=404)

    user_data = request.data.get('user', {})
    contacto = request.data.get('contacto', utilizador.contacto)
    tipo = request.data.get('tipo', utilizador.tipo)

    for attr in ['username', 'email', 'first_name', 'last_name']:
        if attr in user_data:
            setattr(user, attr, user_data[attr])
    user.save()

    utilizador.contacto = contacto
    utilizador.tipo = tipo
    utilizador.save()

    return Response({'message': 'Utilizador atualizado com sucesso.'})

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def apagar_utilizador(request, id):
    utilizador_req = Utilizador.objects.get(user=request.user)
    if utilizador_req.tipo != 'administrador':
        return Response({'detail': 'Acesso negado.'}, status=403)

    try:
        utilizador = Utilizador.objects.get(id=id)
        user = utilizador.user
        user.delete()
        return Response({'message': 'Utilizador apagado com sucesso.'})
    except Utilizador.DoesNotExist:
        return Response({'detail': 'Utilizador não encontrado.'}, status=404)


