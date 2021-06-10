Sistema exemplo de postagens de blog, com Express + Mongoose.

Rotas configuradas das APIs:

1. Cadastrar Usuario

Método: POST
Rota: /usuario
Corpo:
{
    "usuario": "exemplo",
    "nome": "Exemplo",
    "email": "exemplo@exemplo.com
}

2. Cadastrar Postagem

Método: POST
Rota: /postagem
Corpo:
{
	"usuario": "exemplo",
	"postagem": {
		"titulo": "Título da postagem de outro exemplo",
		"resumo": "Resumo da postagem de outro exemplo",
		"corpo": "Corpo do texto da postagem de outro exemplo",
		"assuntos": ["exemplo", "mongolog"]
	}
}

3. Atualizar Postagem

Método: PUT
Rota: /postagem
Corpo:
{
	"_id": "60c134d0dd33ff6e5cd0527f",
	"titulo": "Título da postagem exemplo EDITADO MAIS UMA VEZ",
	"resumo": "Resumo da postagem exemplo EDITADO",
	"corpo": "Corpo do texto da postagem exemplo EDITADO",
	"assuntos": ["exemplo", "mongolog", "novo"],
	"dataHoraCriacao" : "2021-06-09T21:38:24.202Z"
}

4. Buscar Postagens do Usuário

Método: GET
Rota: /postagens/:usuario

5. Remover Postagem

Método: DELETE
Rota: /postagem/:_id

