# AI Contact Center – MVP

Outil d’administration pour créer des **assistants IA de support client** basés sur des **FAQ**, avec un **widget de chat** intégrable sur n’importe quel site via un simple `<script>`.

> ⚠️ **Authentification**  
> À ce stade, l’application n’implémente pas encore d’authentification robuste.  
> Les écrans / routes de login / register ne sont pas finalisés et ne doivent pas être considérés comme prêts pour la production.  
> L’accès au dashboard est donc libre tant qu’aucune auth n’est remise en place.
> pour l'instant tout en localhost mais deploiement vercel prévu apres finalisation auth et retouches.

---

## ✨ Fonctionnalités actuelles

- **Multi-assistants**
  - Plusieurs assistants IA (un par site ou cas d’usage)
  - Gestion centralisée dans `/dashboard/assistants`

- **Base de connaissances par FAQ**
  - Création / édition / suppression de questions–réponses
  - Chaque entrée est **rattachée à un assistant**
  - L’IA répond uniquement à partir de cette FAQ

- **Configuration de l’assistant IA**
  - Nom & description interne
  - Langue principale : français ou anglais
  - Ton : neutre, chaleureux ou formel
  - Instructions système avancées (prompt custom)

- **Test interne de l’assistant**
  - Chat intégré dans le dashboard (`/dashboard/assistant`)
  - Permet de tester les réponses basées sur la FAQ avant intégration

- **Widget de chat personnalisable**
  - Texte du bouton flottant
  - Couleur principale (bouton)
  - Couleur de fond de la fenêtre
  - Prévisualisation dans le dashboard
  - Script d’intégration généré automatiquement :

    ```html
    <script src="https://votre-domaine/widget.js" data-assistant-id="ASSISTANT_ID"></script>
    ```

- **API d’IA basée sur la FAQ**
  - Endpoint `/api/chat`
  - Construit un `system prompt` à partir :
    - de la langue de l’assistant
    - de son ton
    - de ses instructions systèmes
    - de la FAQ (Q/R)
  - Appelle l’API OpenAI (Chat Completions) et renvoie un `answer`

---

## 🏗️ Stack technique

- **Framework** : [Next.js 16](https://nextjs.org/) (App Router, TS, Turbopack)
- **Langage** : TypeScript
- **UI** :
  - React (Server Components + Client Components)
  - Tailwind CSS
- **Base de données** : SQLite via [Prisma](https://www.prisma.io/)
- **IA** : [OpenAI](https://platform.openai.com/) (`gpt-4o-mini` par défaut)
- **Widget** : vanilla JavaScript servi à `/widget.js`

---

## 📁 Architecture (vue rapide)

- `prisma/schema.prisma` : modèle de données (`Assistant`, `FaqItem`, `WidgetConfig`, …)
- `src/lib/prisma.ts` : client Prisma singleton
- `src/lib/assistant.ts` :
  - `getOrCreateDefaultAssistant()`
  - `getAssistantByIdOrDefault(id?)`

- `src/app/dashboard/page.tsx` : vue d’ensemble (dashboard principal)
- `src/app/dashboard/assistants/*` : liste et création des assistants
- `src/app/dashboard/assistant/*` : configuration + test de l’assistant courant
- `src/app/dashboard/faq/*` : gestion des FAQ
- `src/app/dashboard/widget/*` : configuration du widget & code d’intégration

- `src/app/api/chat/route.ts` : endpoint IA (OpenAI)
- `src/app/api/widget-config/route.ts` : endpoint de configuration du widget

- `src/app/widget.js` : script de widget externe (bouton + fenêtre de chat)

---

## 🔧 Installation & configuration

### 1. Cloner le repo

```bash
git clone <URL_DU_REPO>
cd chatbot

npm install
# Base de données (SQLite local)
DATABASE_URL="file:./dev.db"

# Clé OpenAI (obligatoire)
OPENAI_API_KEY="sk-..."

# (Optionnel) Modèle OpenAI à utiliser
OPENAI_MODEL="gpt-4o-mini"
npx prisma migrate dev --name init
# ou, si les migrations existent déjà :
# npx prisma migrate dev
npm run dev
<img width="2555" height="1210" alt="image" src="https://github.com/user-attachments/assets/a4edff85-1500-46a4-96ea-dcbc56fed914" />

