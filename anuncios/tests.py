"""Tests for the catalogue endpoints."""

from django.core.management import call_command
from django.test import TestCase
from rest_framework.test import APIClient


class CatalogueEndpointTests(TestCase):
    def setUp(self):
        call_command('seed_demo', verbosity=0)
        self.client = APIClient()

    def test_districts_are_public(self):
        response = self.client.get('/anuncios/api/distritos/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 18)
        self.assertEqual(response.json()[0]['nome'], 'Aveiro')

    def test_service_types_are_public(self):
        response = self.client.get('/anuncios/api/tipos_servico/')

        self.assertEqual(response.status_code, 200)
        self.assertIn('Canalizador', [t['designacao'] for t in response.json()])

    def test_advert_list_returns_seeded_adverts(self):
        response = self.client.get('/anuncios/api/anuncio/listar_anuncios/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)
        titulos = {a['titulo'] for a in response.json()}
        self.assertIn('Canalização a precisar de reparação', titulos)
