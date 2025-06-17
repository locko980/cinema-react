# Projeto Cinema - React & NestJS

Este é um projeto full-stack de um sistema de gerenciamento de cinema, construído com React no frontend e NestJS no backend, totalmente conteinerizado com Docker.

## Pré-requisitos

Certifique-se de que você tem os seguintes softwares instalados na sua máquina:

*   [Docker](https://www.docker.com/products/docker-desktop/)
*   [Docker Compose](https://docs.docker.com/compose/install/) (geralmente já vem com o Docker Desktop)

## Como Executar a Aplicação

Siga os passos abaixo para colocar toda a stack da aplicação (frontend, backend e banco de dados) no ar.

### 1. Construindo e Iniciando os Contêineres (Primeira Vez)

Na primeira vez que você for executar o projeto, use o seguinte comando na raiz do diretório:

```bash
docker-compose up -d --build
```

*   `up`: Cria e inicia os contêineres.
*   `-d`: (detached) Roda os contêineres em segundo plano, liberando seu terminal.
*   `--build`: Força a reconstrução das imagens Docker a partir dos arquivos `Dockerfile`, garantindo que as últimas alterações no código sejam aplicadas.

### 2. Acessando os Serviços

Após a execução do comando, os seguintes serviços estarão disponíveis nos seus respectivos endereços:

*   **Aplicação Principal (Frontend)**: [http://localhost:8080](http://localhost:8080)
*   **pgAdmin (Gerenciador do Banco de Dados)**: [http://localhost:5050](http://localhost:5050)
    *   **Login**: `admin@admin.com`
    *   **Senha**: `admin`
    *   Para conectar ao banco de dados do projeto dentro do pgAdmin, adicione um novo servidor usando `cinema-postgres` como o nome do Host/endereço.

### 3. Gerenciando os Contêineres no Dia a Dia

Depois que os contêineres já foram construídos, você pode usar comandos mais simples para gerenciá-los:

*   **Para iniciar os contêineres que estão parados:**
    ```bash
    docker-compose start
    ```

*   **Para parar os contêineres que estão em execução:**
    ```bash
    docker-compose stop
    ```

*   **Para reiniciar todos os contêineres:**
    ```bash
    docker-compose restart
    ```

### 4. Reconstruindo Após Alterações no Código

Se você fizer alterações no código do frontend ou do backend, você precisa reconstruir a imagem correspondente para que as mudanças tenham efeito.

*   **Para reconstruir apenas o frontend:**
    ```bash
    docker-compose up -d --build frontend
    ```

*   **Para reconstruir apenas o backend:**
    ```bash
    docker-compose up -d --build backend
    ```

*   **Para reconstruir tudo (opção mais segura se não tiver certeza do que mudou):**
    ```bash
    docker-compose up -d --build
    ``` 