# Tarefas+ 📝

> Sistema feito para você organizar seus estudos e tarefas de forma fácil e colaborativa.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-10-orange?style=flat-square&logo=firebase)
![NextAuth](https://img.shields.io/badge/NextAuth-4-purple?style=flat-square)

---

## ✨ Funcionalidades

- **Autenticação** com Google via NextAuth.js
- **Criar tarefas** públicas ou privadas
- **Compartilhar tarefas** públicas via link único
- **Comentários** em tarefas públicas
- **Deletar** tarefas e comentários
- **Contador em tempo real** de posts e comentários na home
- **ISR (Incremental Static Regeneration)** na página inicial

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| [Next.js 14](https://nextjs.org/) | Framework React (Pages Router) |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática |
| [Firebase Firestore](https://firebase.google.com/) | Banco de dados NoSQL |
| [NextAuth.js](https://next-auth.js.org/) | Autenticação com Google |
| [React Icons](https://react-icons.github.io/react-icons/) | Ícones |


---

## 🚀 Como rodar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Conta no [Firebase](https://firebase.google.com/)
- Credenciais OAuth do [Google Cloud](https://console.cloud.google.com/)

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/tarefas-plus.git
cd tarefas-plus
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo de exemplo e preencha com suas credenciais:

```bash
cp .env.local.example .env.local
```

Edite o `.env.local`:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=uma_string_aleatoria_e_segura

# Google OAuth
GOOGLE_CLIENT_ID=seu_google_client_id
GOOGLE_CLIENT_SECRET=seu_google_client_secret
```

### 4. Configure o Firebase

No [Firebase Console](https://console.firebase.google.com/):

1. Crie um projeto
2. Ative o **Firestore Database**
3. Crie as coleções: `tarefas` e `comments`
4. Nas regras do Firestore, configure conforme sua necessidade

### 5. Rode o projeto

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) 🎉

---

## ☁️ Deploy

O projeto está pronto para deploy na [Vercel](https://vercel.com/):

1. Faça push para o GitHub
2. Importe o repositório na Vercel
3. Adicione todas as variáveis de ambiente no painel da Vercel
4. Deploy automático ✅

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Feito com ❤️ usando Next.js e Firebase
