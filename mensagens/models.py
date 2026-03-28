from django.db import models
from django.contrib.auth.models import User

class Mensagem(models.Model):
    remetente = models.ForeignKey(User, related_name='mensagens_enviadas', on_delete=models.CASCADE)
    destinatario = models.ForeignKey(User, related_name='mensagens_recebidas', on_delete=models.CASCADE)
    texto = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    lida = models.BooleanField(default=False)

    def __str__(self):
        return f'De {self.remetente.username} para {self.destinatario.username}: {self.texto[:30]}'