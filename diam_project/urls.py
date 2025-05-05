from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('utilizadores/', include('utilizadores.urls')),
    path('anuncios/', include('anuncios.urls')),
]
