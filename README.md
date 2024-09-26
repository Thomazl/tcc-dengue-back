
# Backend com Express e Firebase Firestore

Este projeto é uma aplicação backend construída usando **Express**, **Firebase Admin SDK** para interagir com o **Firestore** e **TypeScript**. Ele expõe um endpoint para salvar informações de usuários no Firestore.

## Estrutura de Dados Salvos

As informações de usuários armazenadas no Firestore incluem os seguintes campos:

- `nome`: string
- `email`: string
- `telefone`: string
- `cpf`: string
- `idade`: number
- `endereco`: string
- `receberEmail`: boolean (se o usuário deseja receber e-mails)

## Pré-requisitos

Antes de configurar e rodar a aplicação, você precisa ter as seguintes ferramentas instaladas:

- **Node.js** (v14 ou superior)
- **pnpm** (gerenciador de pacotes)
- **Firebase Project** com Firestore ativado

## Instalação

1. Instale as dependências do projeto:

   ```bash
   pnpm install
   ```

## Configuração do Firebase

Antes de rodar a aplicação, você precisará configurar as credenciais do **Firebase**.

### 1. Criar um Projeto no Firebase

Se ainda não tiver um projeto no Firebase, siga estes passos para criar um:

1. Acesse o [Firebase Console](https://console.firebase.google.com/).
2. Crie um novo projeto ou selecione um projeto existente.
3. Habilite o Firestore:
   - No painel do Firebase, vá para **Firestore Database**.
   - Crie um banco de dados no modo de teste (durante o desenvolvimento) ou defina suas regras de segurança conforme necessário.

### 2. Baixar as Credenciais

Para que sua aplicação backend possa acessar o Firestore, você precisa das credenciais de autenticação:

1. No Firebase Console, vá até **Configurações do Projeto** (ícone de engrenagem no canto superior esquerdo).
2. Clique na aba **Contas de Serviço**.
3. Clique em **Gerar nova chave privada** para baixar o arquivo JSON com as credenciais do Firebase Admin SDK.
4. Coloque esse arquivo na pasta `src/` do projeto. Por exemplo, salve-o como `firebase-adminsdk.json`.

### 3. Configurar as Credenciais no Código

No arquivo `src/index.ts`, certifique-se de que o caminho do arquivo JSON com as credenciais esteja correto.

```typescript
import * as serviceAccount from './path/to/your-firebase-adminsdk.json';
```

Substitua `'./path/to/your-firebase-adminsdk.json'` pelo caminho correto do arquivo de credenciais que você baixou (por exemplo, `'./firebase-adminsdk.json'`).

## Configuração Adicional

Verifique se o arquivo `tsconfig.json` está configurado corretamente com as opções necessárias para usar JSON e interoperabilidade de módulos:

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "module": "commonjs",
    "outDir": "./dist",
    "target": "ES6"
  },
  "include": ["src/**/*"]
}
```

## Rodando a Aplicação

1. Compile o TypeScript para JavaScript:

   ```bash
   pnpm tsc
   ```

2. Inicie o servidor:

   ```bash
   node dist/index.js
   ```

Por padrão, o servidor irá rodar na porta `3000`. Você pode acessar a API através de `http://localhost:3000`.

## Endpoints

### POST `/save-user`

Este endpoint permite que você envie informações de um usuário para serem armazenadas no Firestore.

- **URL**: `http://localhost:3000/save-user`
- **Método HTTP**: `POST`
- **Corpo da Requisição (JSON)**:

  ```json
  {
    "nome": "João da Silva",
    "email": "joao@example.com",
    "telefone": "11999999999",
    "cpf": "12345678901",
    "idade": 30,
    "endereco": "Rua Exemplo, 123",
    "receberEmail": true
  }
  ```

- **Exemplo de cURL**:

  ```bash
  curl -X POST http://localhost:3000/save-user   -H "Content-Type: application/json"   -d '{
    "nome": "João da Silva",
    "email": "joao@example.com",
    "telefone": "11999999999",
    "cpf": "12345678901",
    "idade": 30,
    "endereco": "Rua Exemplo, 123",
    "receberEmail": true
  }'
  ```

- **Resposta (Sucesso)**:

  ```json
  {
    "message": "Usuário salvo com sucesso!",
    "docId": "id_do_documento_gerado"
  }
  ```

- **Resposta (Erro)**:

  ```json
  {
    "message": "Erro interno ao salvar o usuário."
  }
  ```

## Desenvolvimento

Durante o desenvolvimento, você pode rodar a aplicação em modo "watch" para recompilar automaticamente ao fazer mudanças no código:

```bash
pnpm tsc --watch
```

Para reiniciar o servidor automaticamente ao salvar mudanças, use uma ferramenta como `nodemon`:

```bash
pnpm add nodemon --save-dev
npx nodemon dist/index.js
```

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma _issue_ ou enviar um _pull request_.

## Licença

Este projeto está licenciado sob os termos da licença MIT.
