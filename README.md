#🏛️ Projeto de Faculdade: Sistema de Agendamento Jurídico (SAJ)

Sistema de Agendamento Jurídico (SAJ), projeto de faculdade desenvolvido para a disciplina de Java Orientada a Objetos. O sistema fornece o gerenciamento de advogados, clientes, processos e agendamentos, utilizando o framework Spring Boot.

# ⚖️ Sistema de Agendamento Jurídico (SAJ)

Este é o módulo Backend do Sistema de Agendamento Jurídico (SAJ), desenvolvido com Spring Boot. Ele fornece a API RESTful para gerenciar advogados (usuários), clientes, processos e agendamentos, além de funcionalidades de autenticação e dashboard.

## 🚀 Tecnologias Utilizadas

*   **Java 17 (LTS)**
*   **Spring Boot 3.x**
    *   Spring Data JPA
    *   Spring Security
    *   Spring Web
    *   Spring Validation
*   **PostgreSQL** (Banco de Dados)
*   **Hibernate** (ORM)
*   **JWT (JSON Web Tokens)** para Autenticação
*   **Lombok** (para reduzir boilerplate code)
*   **Springdoc OpenAPI (Swagger UI)** para documentação da API
*   **Maven** (Gerenciador de Dependências)

## ✨ Funcionalidades Principais

*   **Autenticação e Autorização:** Login de usuários (advogados) com JWT.
*   **Gerenciamento de Usuários:** CRUD para usuários (advogados).
*   **Gerenciamento de Clientes:** CRUD para clientes.
*   **Gerenciamento de Processos:** CRUD para processos, vinculados a clientes.
*   **Gerenciamento de Agendamentos:** CRUD para agendamentos, vinculados a advogados, clientes e opcionalmente a processos.
*   **Validação de Conflitos de Agendamento:** Garante que um advogado não tenha agendamentos sobrepostos.
*   **Dashboard:** Endpoints para estatísticas e próximos agendamentos do advogado logado.
*   **CORS Configurado:** Permite acesso do frontend em ambiente de desenvolvimento local.

## ⚙️ Configuração do Ambiente

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

*   **JDK 17** (Java Development Kit)
*   **Maven**
*   **PostgreSQL** (Servidor de Banco de Dados)
*   **IDE** (IntelliJ IDEA, VS Code, Eclipse, etc.)

### 1. Configuração do Banco de Dados PostgreSQL

Crie um banco de dados PostgreSQL com o nome `saj_db`.

```sql
CREATE DATABASE saj_db;
```

### 2. Variáveis de Ambiente (`.env`)

Crie um arquivo `.env` na raiz do diretório `Backend-SAJ` com as seguintes variáveis:

```
SERVER_PORT=8081
DB_URL=jdbc:postgresql://127.0.0.1:5432/saj_db
DB_USERNAME=postgres
DB_PASSWORD=0472
JWT_SECRET=NjdBNEI0NkFEN0I0NDU0RTc3M0FENkEzQUQ2QjQ0NkQ3NzNBNkEzQUQ2QjQ0NkQ3NzNBNkEzQUQ2QjQ0NkQ3NzM=
JWT_EXPIRATION=86400000
```

*   **`SERVER_PORT`**: Porta em que o backend será executado (padrão: 8081).
*   **`DB_URL`**: URL de conexão com o banco de dados PostgreSQL.
*   **`DB_USERNAME`**: Usuário do banco de dados.
*   **`DB_PASSWORD`**: Senha do banco de dados.
*   **`JWT_SECRET`**: Chave secreta para assinar e verificar JWTs (mantenha segura e use uma string longa e aleatória em produção).
*   **`JWT_EXPIRATION`**: Tempo de expiração do token JWT em milissegundos.

### 3. Configuração da IDE (JDK)

Certifique-se de que sua IDE está configurada para usar o **JDK 17** para este projeto.

*   **IntelliJ IDEA:** `File` > `Project Structure...` > `Project` > `SDK` (selecione 17) e `Modules` (verifique se o SDK do módulo também é 17).

## ▶️ Como Rodar o Backend

1.  **Navegue até o diretório do projeto:**
    ```bash
    cd C:/Users/Matheus/Projeto-Sistema-Controlador-SAJ/Backend-SAJ
    ```

2.  **Compile o projeto com Maven:**
    ```bash
    mvn clean install
    ```

3.  **Execute a aplicação Spring Boot:**
    ```bash
    mvn spring-boot:run
    ```
    Ou, se estiver usando uma IDE, execute a classe principal `ControladorSajApplication`.

O backend estará disponível em `http://localhost:8081` (ou a porta configurada em `SERVER_PORT`).

## 📄 Documentação da API (Swagger UI)

Após iniciar o backend, você pode acessar a documentação interativa da API (Swagger UI) em:

*   **`http://localhost:8081/swagger-ui.html`**

## ⚠️ Notas Importantes

*   **CORS:** O backend está configurado para permitir todas as requisições CORS (`*`) em ambiente de desenvolvimento para facilitar a integração com o frontend. Em produção, esta configuração deve ser restrita a domínios específicos.
*   **Exclusão em Cascata:**
    *   Ao excluir um `Client`, seus `Appointments` e `Processes` associados serão excluídos em cascata.
    *   Ao excluir um `User` (advogado), seus `Appointments` associados serão excluídos em cascata.
    *   Ao excluir um `Process`, os `Appointments` vinculados a ele terão sua referência ao processo definida como `NULL` (desvinculados).
*   **Autenticação:** O endpoint `/api/auth/login` retorna o `token`, `userId`, `fullName` e `username` do usuário logado, conforme necessário pelo frontend.

---

## 💻 Frontend (Informações Adicionais)

O frontend do projeto está localizado em `C:/Users/Matheus/Projeto-Sistema-Controlador-SAJ/Frontend-SAJ`.

### Configuração do Frontend (`.env`)

Crie um arquivo `.env` na raiz do diretório `Frontend-SAJ` com a seguinte variável:

```
VITE_API_BASE_URL=http://localhost:8081/api
```

*   **`VITE_API_BASE_URL`**: URL base da API do backend. Certifique-se de que a porta (`8081`) corresponde à porta configurada no backend.

### Como Rodar o Frontend

1.  **Navegue até o diretório do frontend:**
    ```bash
    cd C:/Users/Matheus/Projeto-Sistema-Controlador-SAJ/Frontend-SAJ
    ```
2.  **Instale as dependências (se ainda não o fez):**
    ```bash
    npm install
    # ou
    yarn install
    ```
3.  **Inicie a aplicação React:**
    ```bash
    npm run dev
    # ou
    yarn dev
    ```

O frontend estará disponível em `http://localhost:5173` (ou a porta padrão do Vite).

---

## 🤝 Contribuição

Para contribuir com o projeto, siga os passos:

1.  Faça um fork do repositório.
2.  Crie uma nova branch (`git checkout -b feature/sua-feature`).
3.  Faça suas alterações e commit (`git commit -m 'feat: Adiciona nova funcionalidade'`).
4.  Envie para o branch (`git push origin feature/sua-feature`).
5.  Abra um Pull Request.

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT.

---

