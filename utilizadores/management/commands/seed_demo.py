"""Populate the database with demo data for local development.

Replaces the old ``loaddata datadump.json`` step: the dump contained real-looking
email addresses and password hashes, which do not belong in a repository.

The command is idempotent, so running it on every container start is safe.
"""

from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from django.db import transaction

from anuncios.models import Anuncio, Distrito, TipoServico
from utilizadores.models import Utilizador

DEMO_PASSWORD = 'Password123!'

DISTRITOS = [
    'Aveiro', 'Beja', 'Braga', 'Bragança', 'Castelo Branco', 'Coimbra', 'Évora',
    'Faro', 'Guarda', 'Leiria', 'Lisboa', 'Portalegre', 'Porto', 'Santarém',
    'Setúbal', 'Viana do Castelo', 'Vila Real', 'Viseu',
]

SERVICOS = [
    'Canalizador', 'Eletricista', 'Carpinteiro', 'Pintor', 'Telhador',
    'Serralheiro', 'Jardineiro',
]

# username, email, first name, tipo
USERS = [
    ('cliente_demo', 'cliente@example.com', 'Cliente', 'cliente'),
    ('prestador_demo', 'prestador@example.com', 'Prestador', 'prestador'),
    ('admin_demo', 'admin@example.com', 'Administrador', 'administrador'),
]

# titulo, descricao, distrito, servico, username do autor
ANUNCIOS = [
    (
        'Canalização a precisar de reparação',
        'Tenho uma fuga debaixo do lava-loiça e preciso de alguém com experiência.',
        'Lisboa', 'Canalizador', 'cliente_demo',
    ),
    (
        'Instalação elétrica de uma cozinha',
        'Remodelação de cozinha concluída; falta instalar tomadas e iluminação.',
        'Porto', 'Eletricista', 'cliente_demo',
    ),
    (
        'Reparação de telhado',
        'Algumas telhas deslocadas depois do temporal. Orçamento por favor.',
        'Braga', 'Telhador', 'prestador_demo',
    ),
]


class Command(BaseCommand):
    help = 'Create demo districts, service types, users and advertisements.'

    @transaction.atomic
    def handle(self, *args, **options):
        verbose = options.get('verbosity', 1) > 0
        distritos = {nome: Distrito.objects.get_or_create(nome=nome)[0] for nome in DISTRITOS}
        servicos = {nome: TipoServico.objects.get_or_create(designacao=nome)[0] for nome in SERVICOS}
        if verbose:
            self.stdout.write(f'Distritos: {len(distritos)}, serviços: {len(servicos)}')

        users = {}
        for username, email, first_name, tipo in USERS:
            user, created = User.objects.get_or_create(
                username=username,
                defaults={'email': email, 'first_name': first_name},
            )
            if created:
                user.set_password(DEMO_PASSWORD)
                if tipo == 'administrador':
                    user.is_staff = True
                    user.is_superuser = True
                user.save()
            Utilizador.objects.get_or_create(user=user, defaults={'tipo': tipo})
            users[username] = user
        if verbose:
            self.stdout.write(f'Utilizadores: {len(users)}')

        criados = 0
        for titulo, descricao, distrito, servico, autor in ANUNCIOS:
            user = users[autor]
            if Anuncio.objects.filter(autor=user).exists():
                continue
            anuncio = Anuncio.objects.create(
                autor=user,
                distrito=distritos[distrito],
                titulo=titulo,
                descricao=descricao,
            )
            anuncio.tipo_servico.add(servicos[servico])
            criados += 1
        if verbose:
            self.stdout.write(f'Anúncios criados: {criados}')
        if verbose:
            self.stdout.write(self.style.SUCCESS('Demo data ready.'))
