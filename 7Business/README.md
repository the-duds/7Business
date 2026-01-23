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
