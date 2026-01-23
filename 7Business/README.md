# 7Business - Gestão Inteligente de Agendamentos

Plataforma SaaS moderna para gerenciamento de agendamentos para Salões, Oficinas e Clínicas.

## 🚀 Começar Rápido

```bash
npm install
npm run dev
```

Acesse: `http://localhost:5173`

## 📝 Login de Teste

| Tipo | Email | Senha |
|------|-------|-------|
| 💇‍♀️ Salão | `beauty_salon@7business.com` | `senha123` |
| 🔧 Oficina | `auto_center@7business.com` | `senha123` |
| 🏥 Clínica | `clinic@7business.com` | `senha123` |

## ✨ Features Principais

✅ **Login Elegante** - Validação em tempo real, toggle de senha, "Lembrar-me"
✅ **Dashboard Personalizado** - 3 tipos diferentes por categoria
✅ **Responsivo** - Mobile, tablet e desktop
✅ **Persistência** - localStorage para manter sessão
✅ **Type-Safe** - TypeScript completo
✅ **Sem Dependências** - Validação custom

## 📁 Estrutura

```
src/
├── components/
│   ├── auth/              ← Sistema de Login
│   │   └── Login.tsx
│   ├── dashboard/         ← Dashboards Personalizados
│   │   └── DashboardRouter.tsx
│   └── layout/            ← Landing Page
│
├── services/
│   └── authService.ts     ← Mock de Autenticação
│
└── schemas/
    └── validation.ts      ← Validações
```

## 📖 Documentação

Veja os arquivos em `src/components/auth/` para documentação completa:

- **README.md** - Começar aqui
- **QUICK_REFERENCE.md** - Referência rápida
- **TESTING_GUIDE.md** - Como testar
- **CODE_EXAMPLES.md** - 8 exemplos de código

## 🔧 Scripts

```bash
npm run dev         # Inicia servidor dev
npm run build       # Build para produção
npm run preview     # Preview do build
npm run type-check  # Verifica tipos TypeScript
npm run lint        # Linter (ESLint)
npm run format      # Formata com Prettier
```

## 📚 Documentação

- [Guia de Autenticação](./src/components/auth/AUTH_GUIDE.md)
- [Guia de Teste](./src/components/auth/TESTING_GUIDE.md)
- [Exemplos de Código](./src/components/auth/CODE_EXAMPLES.md)
- [Checklist](./CHECKLIST_LOGIN_DASHBOARD.md)

## 🎯 Próximos Passos

- [ ] Formulário de Cadastro
- [ ] Recuperação de Senha
- [ ] Integração com API Real
- [ ] React Hook Form + Zod
- [ ] OAuth (Google, GitHub)

## 📞 Suporte

Veja o arquivo `CHECKLIST_LOGIN_DASHBOARD.md` para troubleshooting e perguntas frequentes.

---

**Status**: ✅ Pronto para usar
**Última atualização**: Janeiro 22, 2026

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
