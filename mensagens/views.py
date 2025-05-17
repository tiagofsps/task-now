from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status, viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from utilizadores.models import Utilizador
from utilizadores.serializers import UtilizadorSerializer
from django.db.models import Exists, OuterRef
from .models import Mensagem
from .serializers import MensagemSerializer

class MensagemViewSet(viewsets.ModelViewSet):
    serializer_class = MensagemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        outro_id = self.request.query_params.get('com')
        user = self.request.user
        if outro_id:
            # Marcar mensagens recebidas como lidas
            Mensagem.objects.filter(
                remetente_id=outro_id,
                destinatario=user,
                lida=False
            ).update(lida=True)

            return Mensagem.objects.filter(
                Q(remetente=user, destinatario_id=outro_id) |
                Q(remetente_id=outro_id, destinatario=user)
            ).order_by('timestamp')
        return Mensagem.objects.none()

    def perform_create(self, serializer):
        serializer.save(remetente=self.request.user)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_logged_in_user(request):
    user = request.user
    return Response({'id': user.id})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def lista_utilizadores(request):
    user = request.user
    mensagens_existem = Mensagem.objects.filter(
        Q(remetente=user, destinatario=OuterRef('user')) |
        Q(remetente=OuterRef('user'), destinatario=user)
    )
    utilizadores = Utilizador.objects.exclude(user=user).annotate(
        tem_mensagem=Exists(mensagens_existem)
    ).filter(tem_mensagem=True)
    serializer = UtilizadorSerializer(utilizadores, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listar_conversas(request):
    user = request.user

    # Todos os utilizadores com quem houve troca de mensagens
    enviados_para = Mensagem.objects.filter(remetente=user).values_list('destinatario_id', flat=True)
    recebidos_de = Mensagem.objects.filter(destinatario=user).values_list('remetente_id', flat=True)
    ids = set(enviados_para).union(set(recebidos_de)).difference({user.id})

    # Subquery: há mensagens não lidas deste utilizador para o user atual?
    mensagens_nao_lidas = Mensagem.objects.filter(
        remetente=OuterRef('pk'),
        destinatario=user,
        lida=False
    )

    utilizadores = User.objects.filter(id__in=ids).annotate(
        tem_novas=Exists(mensagens_nao_lidas)
    )

    return Response([
        {
            "utilizador": {
                "id": u.id,
                "username": u.username
            },
            "tem_novas": u.tem_novas
        }
        for u in utilizadores
    ])