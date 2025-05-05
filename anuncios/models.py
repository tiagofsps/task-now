from django.db import models
from django.contrib.auth.models import User

class Distrito(models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome

class TipoServico(models.Model):
    designacao = models.CharField(max_length=100)
    descricao = models.TextField()

    def __str__(self):
        return self.designacao

class Anuncio(models.Model):
    autor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='anuncios')
    distrito = models.ForeignKey(Distrito, on_delete=models.CASCADE, related_name='anuncios')
    tipo_servico = models.ForeignKey(TipoServico, on_delete=models.SET_NULL, null=True, blank=True, related_name='anuncios')
    titulo = models.CharField(max_length=100)
    descricao = models.TextField()
    ativo = models.BooleanField(default=True)

    def __str__(self):
        return self.titulo

class ImagemAnuncio(models.Model):
    anuncio = models.ForeignKey(Anuncio, on_delete=models.CASCADE, related_name='imagens')
    url = models.URLField()

    def __str__(self):
        return f"Imagem do anúncio: {self.anuncio.titulo}"
