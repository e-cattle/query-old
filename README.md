# API Aplication

## Registro e Homologação de um Kernel

A API Kernel deve enviar uma requisião **HTTP POST** para o *endpoint* `/devices-kernel`. O corpo da requisição deve enviar um dado em *JSON* contendo o endereço **MAC** do *kernel* remetente. Exemplo de corpo de requisição:

```json
{
	"mac": "99999999999999999"
}
```

Isso fará com que um *kernel* seja inserido no banco de dados com o endereço **MAC** informado na requisição. O *kernel* será cadastrado com o `enable = false`, ou seja, inicialmente inativo. O processo de ativação (homologação) do mesmo deve ser feita manualmente por algum usuário administrativo da plataforma. Quando o usuário homologa o dispositivo ele deve designar um nome para o recém homologado *kernel* (ex: Fazenda A Setor Administrativo).

Uma vez que o *kernel* está ativo, este pode solicitar um *token* de acesso à **API Aplication**. Para receber o *token* o *kernel* deve enviar uma requisição **HTTP POST** para o *endpoint* `/authenticate`. O corpo da requisição deve enviar um dado em *JSON* contendo o endereço **MAC** do *kernel* remetente. Exemplo de corpo de requisição:

```json
{
	"mac": "99999999999999999"
}
```

Quando a **API Aplication** recebe a requisição ele busca o *kernel*, pelo MAC, dentro da base de dados. Caso o MAC do dispositivo não esteja cadastrado, ou não esteja avito (homologad), a *API* retorna um **HTTP Response** com **HTTP Status** `404` com o corpo da resposta da seguinte maneira:

```json
{
    "message": "Dispositivo inválido ou bloqueado"
}
```

Caso o dispositivo com o MAC informado for encontrado e este esteja ativo (homologado), então a *API* gera um *token* utilizando os atributos `mac`, `name` e `_id` do dispositivo (MAC, Nome e ID do dispositivo, respectivamente).

É importante frizar que a *API* sempre requisitará o `token` e o `mac` dentro das requisições feitas para as *endpoints* restritas do projeto (aquelas que acessam dados internos do projeto). Esses dados são aceitos pelo **Request Body**, **Query String**, ou, no caso apenas do **token**, dentro do **Request Header** como atravéz do atributo `x-access-token`. Quando uma requisição que necessita de *token* é recebida pela *API* esta deserializa o dado e confere se o *MAC* contido no *token* é igual ao informado dentro da requisição.