# Base NodeJS Backend

Esta é a base que os projetos da MNW usaram como backend. Ele contem as seguitens funcionalidades
  - Autenticação
  - Rotas protegidas e não protegidas
  - Comunicação com banco de dados
  - Exemplo de modelo

# Hospedagem

Este modelo de softwrae ficará hospedado com a seguinte arquitetura

![](https://205324-619698-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2017/03/Nginx-Reverse-Proxy-with-Node.png)

  - Nginx responde os arquivos státicos e HTTPS
  - NodeJS responde apenas por api

### Instalação Básica

```sh
$ git clone git@gitlab.marcasnaweb.com.br:mnw/base-nodejs-backend.git
$ cd base-nodejs-backend
$ yarn
```

Agora é necessário criar o arquivo .ENV

```sh
$ touch .env
```

Coloque neste arquivo as seguintes variáveis:

para o arquivo (**server.js**):
```sh
PORT=porta_do_servidor
HOST=host_do_servidor
```

| Variável | Obrigatório | Valor default |
| ------ | ------ | ------ |
| PORT | sim | 8081 |
| HOST | sim | 0.0.0.0 |
para o arquivo (**database/index.js**):
```sh
DBNAME=Nome_do_banco
DBUSER=Nome_do_usuario_do_banco
DBPASS=Senha_do_usuario_do_banco
DBPORT=Porta_do_banco
DBHOST=Host_do_banco
DBDIALECT=Dialeto_do_banco ('mysql' | 'mariadb' | 'postgres' | 'mssql') 
```

| Variável | Obrigatório | Valor default |
| ------ | ------ | ------ |
| DBNAME | Sim | null |
| DBUSER | Não | root |
| DBPASS | Não | 123456 |
| DBPORT | Não | 3306 |
| DBHOST | Não | 127.0.0.1 |
| DBDIALECT | Não | mysql |

## Iniciando o servidor
```sh
$ npm install -g nodemon
$ nodemon server
```
## Todo

 - Adicionar testes
