from django.db import models
from django.contrib.auth.models import User

class Utilizador(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    contacto = models.CharField(max_length=20, blank=True)

    TIPO_CHOICES = [
        ('cliente', 'Cliente'),
        ('prestador', 'Prestador'),
        ('administrador', 'Administrador'),
    ]
    tipo = models.CharField(max_length=13, choices=TIPO_CHOICES)

    def __str__(self):
        return f'{self.user.username} ({self.tipo})'
