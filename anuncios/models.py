from django.db import models
from django.contrib.auth.models import User

class Distrito(models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome

class TipoServico(models.Model):
    designacao = models.CharField(max_length=100)

    def __str__(self):
        return self.designacao

class Anuncio(models.Model):
    autor = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='anuncio',
        null=True,
        blank=True
    )
    distrito = models.ForeignKey(Distrito, on_delete=models.CASCADE, related_name='anuncios')
    tipo_servico = models.ManyToManyField(TipoServico, related_name='anuncios')
    titulo = models.CharField(max_length=100)
    descricao = models.TextField()
    imagem_perfil = models.ImageField(upload_to='imagens_perfil/', null=True, blank=True)

    def __str__(self):
        return self.titulo

class ImagemAnuncio(models.Model):
    anuncio = models.ForeignKey(Anuncio, on_delete=models.CASCADE, related_name='imagens')
    imagem = models.ImageField(upload_to='imagens_anuncios/')

    def __str__(self):
        return f"Imagem do anúncio: {self.anuncio.titulo}"