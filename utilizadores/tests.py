"""Tests for the demo seeder and the authentication endpoints."""

from django.contrib.auth.models import User
from django.core.management import call_command
from django.test import TestCase
from rest_framework.test import APIClient

from anuncios.models import Anuncio, Distrito, TipoServico
from utilizadores.models import Utilizador


class SeedDemoCommandTests(TestCase):
    def test_creates_demo_data(self):
        call_command('seed_demo', verbosity=0)

        self.assertEqual(Distrito.objects.count(), 18)
        self.assertEqual(TipoServico.objects.count(), 7)
        self.assertEqual(User.objects.count(), 3)
        self.assertEqual(Utilizador.objects.count(), 3)
        # Anuncio.autor is a OneToOneField, so each demo user can own one advert.
        self.assertEqual(Anuncio.objects.count(), 2)

    def test_is_idempotent(self):
        call_command('seed_demo', verbosity=0)
        call_command('seed_demo', verbosity=0)

        self.assertEqual(User.objects.count(), 3)
        self.assertEqual(Anuncio.objects.count(), 2)

    def test_demo_users_can_authenticate(self):
        call_command('seed_demo', verbosity=0)

        cliente = User.objects.get(username='cliente_demo')
        self.assertTrue(cliente.check_password('Password123!'))
        self.assertEqual(cliente.utilizador.tipo, 'cliente')


class AuthenticationTests(TestCase):
    def setUp(self):
        call_command('seed_demo', verbosity=0)
        self.client = APIClient()

    def test_login_with_valid_credentials(self):
        response = self.client.post(
            '/utilizadores/api/login/',
            {'username': 'cliente_demo', 'password': 'Password123!'},
            format='json',
        )

        self.assertEqual(response.status_code, 200)

    def test_login_with_wrong_password_is_rejected(self):
        response = self.client.post(
            '/utilizadores/api/login/',
            {'username': 'cliente_demo', 'password': 'wrong'},
            format='json',
        )

        self.assertEqual(response.status_code, 401)

    def test_logout_clears_the_session(self):
        self.client.post(
            '/utilizadores/api/login/',
            {'username': 'cliente_demo', 'password': 'Password123!'},
            format='json',
        )

        response = self.client.get('/utilizadores/api/logout/')

        self.assertEqual(response.status_code, 200)
