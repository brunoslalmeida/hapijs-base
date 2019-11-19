# Base NodeJS Backend

Esta é a base que os projetos da MNW usaram como backend. Ele contem as seguitens funcionalidades

- Autenticação
- Autorização
- Rotas protegidas e não protegidas
- Comunicação com banco de dados
- Modelo de usuário
- CRUD de usuário

# Hospedagem

Este modelo de softwrae ficará hospedado com a seguinte arquitetura

![](https://205324-619698-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2017/03/Nginx-Reverse-Proxy-with-Node.png)

- Nginx responde os arquivos státicos e HTTPS
- NodeJS responde apenas por api

### Instalação Básica

```sh
$ git clone https://github.com/brunoslalmeida/hapijs-base.git
$ cd hapijs-base
$ yarn
```

Agora é necessário criar o arquivo .ENV

```sh
$ touch .env
```

Coloque neste arquivo as seguintes variáveis:
para o arquivo (**config.js**):

```sh
COOKIE=nome_do_cookie
```

para o arquivo (**server.js**):

```sh
PORT=porta_do_servidor
HOST=host_do_servidor
```

| Variável | Obrigatório | Valor default |
| -------- | ----------- | ------------- |
| PORT     | sim         | 8001          |
| HOST     | sim         | 0.0.0.0       |

para o arquivo (**database/index.js**):

```sh
DBNAME=Nome_do_banco
DBUSER=Nome_do_usuario_do_banco
DBPASS=Senha_do_usuario_do_banco
DBPORT=Porta_do_banco
DBHOST=Host_do_banco
DBDIALECT=Dialeto_do_banco ('mysql' | 'mariadb' | 'postgres' | 'mssql')
```

| Variável  | Obrigatório | Valor default |
| --------- | ----------- | ------------- |
| DBNAME    | Sim         | null          |
| DBUSER    | Não         | root          |
| DBPASS    | Não         | 123456        |
| DBPORT    | Não         | 3306          |
| DBHOST    | Não         | 127.0.0.1     |
| DBDIALECT | Não         | mysql         |

## Iniciando o servidor

```sh
$ npm install -g nodemon
$ nodemon server
```

## Todo

- Adicionar testes
- Aguardar aproação do [PR: #31]([https://github.com/toymachiner62/hapi-authorization/pull/31 "PR: #31") https://github.com/toymachiner62/hapi-authorization/pull/31
