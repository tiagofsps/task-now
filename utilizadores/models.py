from django.db import models

class Utilizador(models.Model):
    TIPOS_UTILIZADOR = (
        ('guest', 'Guest'),
        ('cliente', 'Cliente'),
        ('prestador', 'Prestador'),
        ('administrador', 'Administrador'),
    )

    nome = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    contacto = models.CharField(max_length=15)
    tipo = models.CharField(max_length=15, choices=TIPOS_UTILIZADOR, default='guest')

    def __str__(self):
        return self.nome
