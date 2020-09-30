## APP 
Upload de Arquivo de Logs e CRUD rest - Backend e Frontend

- Docker
- Nginx
- Java 1.8
- java Spring 2.2.10.RELEASE
- Angular 10.1.3 Frontend
- PostgreSQL

address: **http://localhost:4200/**

### Pré-requisitos

Para executar este aplicativo, você precisa instalar duas ferramentas: **Docker** & **Docker Compose**.

Instruções sobre como instalar  **Docker** no [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/), [Windows](https://docs.docker.com/docker-for-windows/install/) , [Mac](https://docs.docker.com/docker-for-mac/install/) .

**Dosker Compose** já está incluído nos pacotes de instalação para **Windows** e **Mac**, portanto, apenas usuários do **Ubuntu** precisam seguir essas instruções.


### Como executar?

A aplicação inteira pode ser executada com um único comando em um terminal:

```
$ docker-compose up -d --build --force
```

up

```
docker-compose up
```

Se quiser pará-lo, use o seguinte comando:

```
$ docker-compose down
```


---

#### prevent-postgres (Database)

O banco de dados PostgreSQL contém apenas um único esquema com uma tabela - log.

Depois de executar o aplicativo, ele pode ser acessado usando estes conectores:

- Host: *localhost*
- Database: *prevent*
- User: *prevent*
- Password: *prevent*

Como outras partes do aplicativo, o banco de dados Postgres é em contêiner e
a definição de seu contêiner Docker pode ser encontrada emn
*docker-compose.yml* file.

```yml
prevent-postgres:
    image: "postgres:9.6-alpine"
    container_name: prevent-postgres
    volumes:
      - prevent-data:/var/lib/postgresql/data
    ports:
      - 5432:5432
    environment:
      - POSTGRES_DB:prevent
      - POSTGRES_USER:prevent
      - POSTGRES_PASSWORD:prevent
```

#### prevent-app (REST API)

Este é um aplicativo baseado em Spring Boot (Java) que se conecta a um
banco de dados que e expor os pontos de extremidade REST que podem ser consumidos.
Ele suporta vários métodos HTTP REST como GET, POST, PUT e DELETE;

A lista completa de endpoints REST disponíveis pode ser encontrada na IU Swagger,
que pode ser chamado usando o link: **http://localhost:8080/api/swagger-ui.html**


Este aplicativo também é colocado no contêiner do Docker e sua definição pode ser encontrada
em um arquivo *prevent-app/Dockerfile*. 

#### prevent-ui (Frontend)

Este é um endpoint real para um usuário onde ele pode manipular seus
Logs. Ele consome os endpoints da API REST fornecidos por
*prevent-app*.

Ele pode ser inserido usando o link: **http://localhost:4200/**

*CAMINHO DA PASTA PRA SALVAR OS ARQUIVOS*
**resources/** application.properties

```
## File Storage Properties
# All files uploaded through the REST API will be stored in this directory
file.upload-dir=classpath:/db/file
```


