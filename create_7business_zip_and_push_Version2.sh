#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="7Business"
ZIP_NAME="${ROOT_DIR}.zip"
BRANCH="init/vite-typescript-tailwind"
REMOTE=""
DO_PUSH=false
ZIP_ONLY=false

usage() {
  cat <<EOF
Usage: $0 [--remote <git-remote-url>] [--branch <branch-name>] [--push] [--zip-only]
Options:
  --remote <url>      Git remote URL to push to (e.g. https://github.com/you/7Business.git)
  --branch <name>     Branch name to create/push (default: ${BRANCH})
  --push              After creating files, initialize git, commit, create branch and push to remote
  --zip-only          Only create folder and ZIP (skip git operations)
  -h, --help          Show this help
EOF
  exit 1
}

# Arg parsing
while [[ $# -gt 0 ]]; do
  case $1 in
    --remote)
      shift
      REMOTE="$1"
      ;;
    --branch)
      shift
      BRANCH="$1"
      ;;
    --push)
      DO_PUSH=true
      ;;
    --zip-only)
      ZIP_ONLY=true
      ;;
    -h|--help)
      usage
      ;;
    *)
      echo "Unknown argument: $1"
      usage
      ;;
  esac
  shift
done

if [ "${ZIP_ONLY}" = true ]; then
  DO_PUSH=false
fi

echo "Criando estrutura em ./${ROOT_DIR} ..."
# Cleanup
if [ -d "${ROOT_DIR}" ]; then
  echo "Pasta ${ROOT_DIR} já existe — removendo..."
  rm -rf "${ROOT_DIR}"
fi
if [ -f "${ZIP_NAME}" ]; then
  echo "Arquivo ${ZIP_NAME} já existe — removendo..."
  rm -f "${ZIP_NAME}"
fi

# Create dirs
mkdir -p "${ROOT_DIR}/src/features/dashboard/components"
mkdir -p "${ROOT_DIR}/src/components/icons"
mkdir -p "${ROOT_DIR}/src/components/ui"
mkdir -p "${ROOT_DIR}/src/contexts"
mkdir -p "${ROOT_DIR}/src/hooks"
mkdir -p "${ROOT_DIR}/src/services"
mkdir -p "${ROOT_DIR}/src/utils"
mkdir -p "${ROOT_DIR}/.github/workflows"

# package.json (includes lint/format scripts)
cat > "${ROOT_DIR}/package.json" <<'EOF'
{
  "name": "7business",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "type-check": "tsc --noEmit",
    "lint": "eslint 'src/**/*.{ts,tsx}' --max-warnings=0",
    "format": "prettier --write ."
  },
  "dependencies": {
    "axios": "^1.4.0",
    "lucide-react": "^0.268.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.27",
    "@types/react-dom": "^18.2.10",
    "@vitejs/plugin-react": "^4.0.0",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.32",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.4.2",
    "vite": "^5.0.0",
    "eslint": "^8.50.0",
    "eslint-config-prettier": "^9.3.0",
    "eslint-plugin-react": "^7.33.3",
    "eslint-plugin-react-hooks": "^4.10.0",
    "@typescript-eslint/parser": "^6.22.0",
    "@typescript-eslint/eslint-plugin": "^6.22.0",
    "prettier": "^3.12.0"
  }
}
EOF

# vite.config.ts
cat > "${ROOT_DIR}/vite.config.ts" <<'EOF'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 5173
  }
});
EOF

# tsconfig.json
cat > "${ROOT_DIR}/tsconfig.json" <<'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["DOM", "ES2022"],
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "sourceMap": true,
    "declaration": false,
    "noEmit": false,
    "incremental": true,
    "tsBuildInfoFile": "node_modules/.cache/tsbuildinfo",
    "strict": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "noUncheckedIndexedAccess": true,
    "useUnknownInCatchVariables": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "types": ["vite/client"]
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
EOF

# PostCSS
cat > "${ROOT_DIR}/postcss.config.cjs" <<'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
EOF

# Tailwind
cat > "${ROOT_DIR}/tailwind.config.cjs" <<'EOF'
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0f172a'
      }
    }
  },
  plugins: []
};
EOF

# .gitignore
cat > "${ROOT_DIR}/.gitignore" <<'EOF'
/node_modules
/dist
/.env.local
/.env.*.local
.vscode
.DS_Store
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
EOF

# index.html
cat > "${ROOT_DIR}/index.html" <<'EOF'
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>7Business</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

# src/index.css
cat > "${ROOT_DIR}/src/index.css" <<'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Global design tokens */
:root {
  --color-primary: theme('colors.primary', #0f172a);
}

/* Example utility */
.app-root {
  min-height: 100vh;
  background-color: #f8fafc;
}
EOF

# src/main.tsx
cat > "${ROOT_DIR}/src/main.tsx" <<'EOF'
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF

# src/App.tsx
cat > "${ROOT_DIR}/src/App.tsx" <<'EOF'
import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import Dashboard from '@/features/dashboard';

export default function App() {
  return (
    <AuthProvider>
      <main className="app-root p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">7Business</h1>
        </header>
        <section>
          <Dashboard />
        </section>
      </main>
    </AuthProvider>
  );
}
EOF

# src/features/dashboard/index.tsx
cat > "${ROOT_DIR}/src/features/dashboard/index.tsx" <<'EOF'
import React from 'react';
import DashboardCard from './components/DashboardCard';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <DashboardCard title="Receita" value="R$ 12.345,67" />
      <DashboardCard title="Clientes" value="1.234" />
      <DashboardCard title="Conversões" value="12.3%" />
    </div>
  );
}
EOF

# src/features/dashboard/components/DashboardCard.tsx
cat > "${ROOT_DIR}/src/features/dashboard/components/DashboardCard.tsx" <<'EOF'
import React from 'react';
import IconButton from '@/components/icons/IconButton';

type Props = {
  title: string;
  value: string;
};

export default function DashboardCard({ title, value }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
      <div>
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-xl font-bold">{value}</div>
      </div>
      <IconButton label="Detalhes" />
    </div>
  );
}
EOF

# src/components/icons/IconButton.tsx
cat > "${ROOT_DIR}/src/components/icons/IconButton.tsx" <<'EOF'
import React from 'react';
import { ChevronRight } from 'lucide-react';

type Props = {
  label?: string;
  onClick?: () => void;
};

export default function IconButton({ label = '', onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
      aria-label={label}
    >
      <span>{label}</span>
      <ChevronRight size={18} />
    </button>
  );
}
EOF

# src/components/ui/Button.tsx
cat > "${ROOT_DIR}/src/components/ui/Button.tsx" <<'EOF'
import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost';
};

export default function Button({ variant = 'primary', children, ...rest }: Props) {
  const base = 'px-4 py-2 rounded-md font-medium focus:outline-none';
  const styles =
    variant === 'primary'
      ? `${base} bg-blue-600 text-white hover:bg-blue-700`
      : `${base} bg-transparent text-gray-700 hover:bg-gray-100`;
  return (
    <button className={styles} {...rest}>
      {children}
    </button>
  );
}
EOF

# src/hooks/useFetch.ts
cat > "${ROOT_DIR}/src/hooks/useFetch.ts" <<'EOF'
import { useEffect, useState } from 'react';
import axios from '@/services/api';

export default function useFetch<T = unknown>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    axios
      .get<T>(url)
      .then((res) => {
        if (mounted) setData(res.data);
      })
      .catch((err) => {
        if (mounted) setError(err as Error);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [url]);

  return { data, loading, error };
}
EOF

# src/services/api.ts
cat > "${ROOT_DIR}/src/services/api.ts" <<'EOF'
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Optional: add interceptors (logging/auth)
api.interceptors.request.use((config) => {
  // e.g., attach token from localStorage/context
  // config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
EOF

# src/contexts/AuthContext.tsx
cat > "${ROOT_DIR}/src/contexts/AuthContext.tsx" <<'EOF'
import React, { createContext, useContext, useState } from 'react';

type User = {
  id: string;
  name: string;
  email?: string;
};

type AuthContextType = {
  user: User | null;
  signin: (u: User) => void;
  signout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const signin = (u: User) => {
    setUser(u);
    // persist token/session here
  };

  const signout = () => {
    setUser(null);
    // clear persistence
  };

  return <AuthContext.Provider value={{ user, signin, signout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
EOF

# src/utils/format.ts
cat > "${ROOT_DIR}/src/utils/format.ts" <<'EOF'
export function formatCurrencyBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
EOF

# .eslintrc.cjs
cat > "${ROOT_DIR}/.eslintrc.cjs" <<'EOF'
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    browser: true,
    es2022: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn'
  }
};
EOF

# .prettierrc
cat > "${ROOT_DIR}/.prettierrc" <<'EOF'
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "printWidth": 100
}
EOF

# .prettierignore
cat > "${ROOT_DIR}/.prettierignore" <<'EOF'
node_modules
dist
build
EOF

# .editorconfig
cat > "${ROOT_DIR}/.editorconfig" <<'EOF'
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 2
EOF

# Dockerfile (multi-stage)
cat > "${ROOT_DIR}/Dockerfile" <<'EOF'
# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN npm ci --silent
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# custom nginx config (optional) could be provided
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOF

# nginx sample config (optional override)
cat > "${ROOT_DIR}/nginx.conf" <<'EOF'
server {
  listen 80;
  server_name _;

  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
EOF

# GitHub Actions workflow
cat > "${ROOT_DIR}/.github/workflows/ci.yml" <<'EOF'
name: CI

on:
  push:
    branches:
      - main
      - "init/**"
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
      - name: Install dependencies
        run: npm ci
      - name: Type check
        run: npm run type-check
      - name: Lint
        run: npm run lint
      - name: Build
        run: npm run build
EOF

# README.md (markdown)
cat > "${ROOT_DIR}/README.md" <<'EOF'
# 7Business

Estrutura inicial para um projeto React + TypeScript usando Vite, Tailwind CSS e Lucide React.

Como usar
1. Instalar dependências:
   - npm install

2. Rodar em desenvolvimento:
   - npm run dev

3. Build de produção:
   - npm run build
   - npm run preview

Scripts úteis
- npm run type-check  -> apenas checagem de tipos
- npm run lint        -> eslint (falha se houver warnings ou erros)
- npm run format      -> prettier

Docker
- Para gerar imagem:
  - docker build -t 7business:latest .

Observações importantes
- O Vite está configurado com alias `@` -> `src` (veja `vite.config.ts`).
- Tailwind configurado (veja `tailwind.config.cjs` e `src/index.css`).
- Lucide React já adicionado; veja `src/components/icons/IconButton.tsx` para exemplo.
- Configure a variável de ambiente `VITE_API_URL` para apontar sua API (utilizada por `src/services/api.ts`).

Sugestões de próximos passos
- Ajustar `skipLibCheck` se desejar validação completa das dependências (trade-off performance).
- Adicionar testes com Vitest/Testing Library.
- Configurar regras de CI/CD conforme seu fluxo.
EOF

# Create zip
echo "Compactando em ${ZIP_NAME} ..."
if command -v zip >/dev/null 2>&1; then
  zip -r "${ZIP_NAME}" "${ROOT_DIR}" >/dev/null
  echo "Arquivo gerado: ${ZIP_NAME}"
else
  echo "zip não encontrado: gerando tar.gz alternativo."
  tar -czf "${ROOT_DIR}.tar.gz" "${ROOT_DIR}"
  echo "Arquivo gerado: ${ROOT_DIR}.tar.gz"
fi

if [ "${DO_PUSH}" = false ]; then
  echo "Finalizado (sem push)."
  echo "Para empurrar para um repositório remoto, rode:"
  echo "  cd ${ROOT_DIR}"
  echo "  git init"
  echo "  git add ."
  echo "  git commit -m 'chore: init Vite + React + TypeScript + Tailwind + Lucide + tooling'"
  echo "  git branch -M ${BRANCH}"
  echo "  git remote add origin <remote-url>"
  echo "  git push -u origin ${BRANCH}"
  exit 0
fi

# Git operations (only if DO_PUSH is true)
if ! command -v git >/dev/null 2>&1; then
  echo "git não encontrado. Instale git ou rode sem --push."
  exit 1
fi

echo "Iniciando operações git em ./${ROOT_DIR} ..."
cd "${ROOT_DIR}"

if [ ! -d .git ]; then
  git init
fi

git add .
git commit -m "chore: init Vite + React + TypeScript + Tailwind + Lucide + tooling" || true

# Ensure branch exists
git branch -M "${BRANCH}" || true

# Add remote if provided
if [ -n "${REMOTE}" ]; then
  # Remove existing origin if exists and remote differs
  if git remote get-url origin >/dev/null 2>&1; then
    EXISTING_REMOTE=$(git remote get-url origin)
    if [ "${EXISTING_REMOTE}" != "${REMOTE}" ]; then
      git remote remove origin
      git remote add origin "${REMOTE}"
    fi
  else
    git remote add origin "${REMOTE}"
  fi
fi

# Push branch
if [ -z "${REMOTE}" ]; then
  echo "Nenhum remote fornecido. Utilize git remote add origin <url> e git push -u origin ${BRANCH}"
  exit 0
fi

echo "Realizando push para ${REMOTE} (branch ${BRANCH})..."
git push -u origin "${BRANCH}"

echo "Push finalizado. Você pode abrir um PR a partir da branch ${BRANCH}."
exit 0
EOF