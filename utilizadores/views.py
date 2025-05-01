from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import Utilizador
from .serializers import UtilizadorSerializer
from django.shortcuts import render
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login
from rest_framework.decorators import api_view


@api_view(['GET'])
def utilizador(request):
    utilizador = request.user

    try:
        perfil = Utilizador.objects.get(user=utilizador)
    except Utilizador.DoesNotExist:
        return JsonResponse({"error": "User profile not found"}, status=404)

    serializer = UtilizadorSerializer(perfil)

    return JsonResponse(serializer.data)

def custom_login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            login(request, form.get_user())
            return redirect('utilizador')  # Redireciona para a página de utilizador após login
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})
