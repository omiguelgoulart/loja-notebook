# 🛒 API da Loja de Notebooks

Esta API foi criada para gerenciar o catálogo de notebooks de uma loja. Ela permite a criação, leitura, atualização e exclusão (CRUD) de notebooks, além de funcionalidades específicas como a soma de quantidades em estoque, agrupamento por marca e atualização de atributos como RAM e tamanho de tela.

## 🖥️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [SQLite](https://www.sqlite.org/) (ou outro banco de dados de sua preferência)
- [TypeScript](https://www.typescriptlang.org/)

## 📁 Estrutura do Projeto

```java
java
Copiar código
📦 loja-de-notebooks-api
 ┣ 📂prisma
 ┃ ┣ 📜schema.prisma        # Definição do modelo de dados do Prisma
 ┣ 📂src
 ┃ ┣ 📜index.ts             # Configuração do servidor e rotas
 ┃ ┣ 📜routes.ts            # Definição das rotas da API
 ┣ 📜.env                   # Variáveis de ambiente (configuração do banco de dados)
 ┣ 📜package.json           # Dependências e scripts do projeto
 ┗ 📜README.md              # Documentação do projeto

```

## 🚀 Instalação e Configuração

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/) como gerenciador de pacotes

### Passo a Passo

1. **Clone o repositório**:
    
    ```bash
    bash
    Copiar código
    git clone https://github.com/seu-usuario/loja-de-notebooks-api.git
    
    ```
    
2. **Instale as dependências**:
    
    ```bash
    bash
    Copiar código
    cd loja-de-notebooks-api
    npm install
    
    ```
    
3. **Configuração do Banco de Dados**:
    
    Crie um arquivo `.env` na raiz do projeto e configure a URL do banco de dados (pode ser SQLite ou qualquer outro banco compatível com Prisma):
    
    ```bash
    bash
    Copiar código
    DATABASE_URL="file:./dev.db"
    
    ```
    
4. **Gere as migrações e o Prisma Client**:
    
    Execute os seguintes comandos para criar as tabelas e configurar o banco de dados:
    
    ```bash
    bash
    Copiar código
    npx prisma migrate dev --name init
    npx prisma generate
    
    ```
    
5. **Inicie o servidor**:
    
    ```bash
    bash
    Copiar código
    npm run dev
    
    ```
    
    O servidor estará disponível em: `http://localhost:3000`
    

## 📚 Endpoints da API

### 1. **Criar um notebook**

- **POST** `/notebooks/`
- **Descrição**: Adiciona um novo notebook ao catálogo.
- **Exemplo de requisição**:
    
    ```json
    json
    Copiar código
    {
      "modelo": "MacBook Air",
      "marca": "Apple",
      "processador": "INTEL",
      "preco": 9999.99,
      "quantidade": 5,
      "ram": 16,
      "tela": 13.3
    }
    
    ```
    

### 2. **Listar todos os notebooks**

- **GET** `/notebooks/`
- **Descrição**: Retorna a lista completa de notebooks disponíveis na loja.

### 3. **Atualizar parcialmente um notebook**

- **PATCH** `/notebooks/:id`
- **Descrição**: Atualiza campos específicos de um notebook existente (como RAM ou tela).
- **Exemplo de requisição**:
    
    ```json
    json
    Copiar código
    {
      "ram": 32,
      "tela": 15.6
    }
    
    ```
    

### 4. **Excluir um notebook**

- **DELETE** `/notebooks/:id`
- **Descrição**: Remove um notebook do catálogo.

### 5. **Somar a quantidade total de notebooks**

- **GET** `/dados/estoque`
- **Descrição**: Retorna a soma total da quantidade de notebooks em estoque.
- **Exemplo de resposta**:
    
    ```json
    json
    Copiar código
    {
      "totalQuantidade": 35
    }
    
    ```
    

### 6. **Agrupar notebooks por marca**

- **GET** `/dados/marcas`
- **Descrição**: Retorna o número de notebooks agrupados por marca.
- **Exemplo de resposta**:
    
    ```json
    json
    Copiar código
    [
      {
        "marca": "Dell",
        "totalNotebooks": 10
      },
      {
        "marca": "Apple",
        "totalNotebooks": 5
      }
    ]
    
    ```
    

### 7. **Filtrar notebooks por quantidade mínima e máxima**

- **GET** `/notebooks?min=5&max=15`
- **Descrição**: Retorna notebooks com uma quantidade em estoque entre o valor mínimo e máximo.

## 🧪 Testes

Se você quiser adicionar testes, pode usar uma estrutura de testes como [Jest](https://jestjs.io/).

## 📄 Licença

Este projeto está sob a licença MIT.

## 🤝 Contribuídores

<a href="https://github.com/omiguelgoulart"><img src="https://github.com/omiguelgoulart.png" width="45" height="45"></a> &nbsp;
<a href="https://github.com/JoaoAANgr"><img src="https://github.com/JoaoAANgr.png" width="45" height="45"></a> &nbsp;