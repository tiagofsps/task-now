from django.contrib.auth.models import User

users = ["Tiago", "Rodrigo", "Adolfo", "Tony"]

def create_sample_users():
    for name in users:
        email = f"{name.lower()}@tasknow.pt"
        password = "12345"
        if not User.objects.filter(username=name).exists():
            User.objects.create_user(username=name, email=email, password=password)
            print(f"Utilizador {name} criado com sucesso.")
        else:
            print(f"Utilizador {name} já existe.")


create_sample_users()
