from anuncios.models import Distrito

# Lista dos distritos e regiões autónomas
distritos = [
    "Aveiro", "Beja", "Braga", "Bragança", "Castelo Branco",
    "Coimbra", "Évora", "Faro", "Guarda", "Leiria", "Lisboa",
    "Portalegre", "Porto", "Santarém", "Setúbal", "Viana do Castelo",
    "Vila Real", "Viseu", "Açores", "Madeira"
]

# Inserir distritos na base de dados
for nome in distritos:
    Distrito.objects.get_or_create(nome=nome)

print("Distritos inseridos com sucesso.")