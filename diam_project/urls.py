# urls.py (no diretório base do projeto)

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),
    path('utilizadores/', include('utilizadores.urls')),
]
