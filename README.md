This is a [Next.js](https://nextjs.org) project titled - Messaging service Prototype

##Installation
Prerequisites
Node.js (for both frontend and backend)
MongoDB or any other database
NPM (Node Package Manager)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

##Project Structure
```bash
project_IBY/
│
├── frontend/                  # Frontend codebase
│   ├── styles/                  # Consists of globals.css
│   ├── pages/                   # chat.js ,_app.js etc
    ├── components/            # Login.js , chatbot.js
│   └── ...                    # Other config files (package.json, etc.)
│
├── backend/                   # Backend codebase
│   ├── routes/                # API route definitions
│   ├── models/                # Database models         
│   ├── server.js              # Main server entry point
│   └── ...                    # Other backend config files (package.json, etc.)
│
└── README.md                  # Project documentation 

```

