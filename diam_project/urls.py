# urls.py (no diretório base do projeto)

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('utilizadores/', include('utilizadores.urls')),  # Inclui as URLs da app 'utilizadores'
]
