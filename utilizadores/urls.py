from django.urls import path
from . import views

urlpatterns = [
    path("api/user/", views.user_view, name="user_view"),
    path("api/signup/", views.signup_view, name="signup"),
    path('api/login/', views.login_view, name="login"),
    path('api/logout/', views.logout_view, name="logout"),
    path('api/perfil/', views.perfil_view, name="perfil"),
    path("api/utilizadores/", views.listar_utilizadores, name="listar_utilizadores"),
    path("api/utilizadores/<int:id>/update/", views.editar_utilizador, name="editar_utilizador"),
    path("api/utilizadores/<int:id>/delete/", views.apagar_utilizador, name="apagar_utilizador"),
]
