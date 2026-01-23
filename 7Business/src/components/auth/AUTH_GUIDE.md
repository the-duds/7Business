/**
 * 7Business - Login & Dashboard Documentation
 * 
 * SISTEMA DE AUTENTICAÇÃO
 * =======================
 * 
 * Este documento descreve o sistema de login e dashboard personalizado
 * implementado com validação, mock de autenticação e redirecionamento
 * baseado em categoria de empresa.
 * 
 * CREDENCIAIS DE TESTE
 * ====================
 * 
 * O sistema possui 3 contas de teste pré-configuradas:
 * 
 * 1. SALÃO DE BELEZA
 *    Email: beauty_salon@7business.com
 *    Senha: senha123
 *    Dashboard: Agenda com cadeiras/estações de trabalho
 * 
 * 2. OFICINA MECÂNICA
 *    Email: auto_center@7business.com
 *    Senha: senha123
 *    Dashboard: Baías de serviço com status de reparos
 * 
 * 3. CLÍNICA MÉDICA
 *    Email: clinic@7business.com
 *    Senha: senha123
 *    Dashboard: Horários clínicos com consultórios
 * 
 * FLUXO DE AUTENTICAÇÃO
 * =====================
 * 
 * 1. Usuário chega na página inicial (Landing Page)
 * 2. Clica em "Entrar / Cadastro" ou "Comece Agora"
 * 3. Sistema abre formulário de login
 * 4. Usuário digita email e senha
 * 5. Sistema valida os dados
 * 6. Se válido, faz login simulado (com latência de 800ms)
 * 7. Usuário é redirecionado para dashboard personalizado
 * 8. Dashboard muda de layout conforme categoria da empresa
 * 
 * COMPONENTES
 * ===========
 * 
 * src/components/auth/Login.tsx
 * - Componente de formulário de login
 * - Validação de email e senha em tempo real
 * - Toggle de visibilidade de senha
 * - Opção "Lembrar-me"
 * - Mensagens de erro elegantes
 * - Loading state durante autenticação
 * 
 * src/components/dashboard/DashboardRouter.tsx
 * - Router que seleciona dashboard correto
 * - BeautyDashboard: Gerenciamento de cadeiras/estações
 * - MechanicsDashboard: Gerenciamento de baías de serviço
 * - HealthDashboard: Gerenciamento de consultórios
 * 
 * src/services/authService.ts
 * - Service de autenticação (mock)
 * - Métodos: login(), signup(), logout()
 * - Persistência de sessão via localStorage
 * - Restauração de sessão ao carregar app
 * 
 * src/schemas/validation.ts
 * - Validações de formulário
 * - Validação de email e senha
 * - Mensagens de erro customizadas
 * 
 * FLUXOS DE LOGIN POR CATEGORIA
 * =============================
 * 
 * 1. SALÃO DE BELEZA
 *    ├─ Mostra 4 cadeiras/estações
 *    ├─ Cada cadeira mostra agendamento (se houver)
 *    ├─ Permite novo agendamento ou ver detalhes
 *    ├─ Stats: Agendamentos, Ocupação, Faturamento
 *    └─ Interface otimizada para gerenciamento visual
 * 
 * 2. OFICINA MECÂNICA
 *    ├─ Mostra 3 baías de serviço
 *    ├─ Cada baía mostra serviço em andamento
 *    ├─ Status: Em progresso, Aguardando, Concluído
 *    ├─ Stats: Serviços, Em progresso, Concluído, Faturamento
 *    └─ Interface otimizada para gestão de reparos
 * 
 * 3. CLÍNICA MÉDICA
 *    ├─ Mostra agenda completa de horários
 *    ├─ Cada consulta com paciente, médico, tipo
 *    ├─ Ações: Detalhes, Marcar presença
 *    ├─ Stats: Consultas, Ocupação, Confirmados, Faturamento
 *    └─ Interface otimizada para gestão clínica
 * 
 * VALIDAÇÃO
 * =========
 * 
 * Email:
 * - Obrigatório
 * - Deve ser um email válido (contém @)
 * - Valida em tempo real conforme o usuário digita
 * 
 * Senha:
 * - Obrigatória
 * - Mínimo 6 caracteres
 * - Toggle de visibilidade
 * - Valida em tempo real
 * 
 * Lembrar-me:
 * - Opcional
 * - Se marcado, sessão é salva em localStorage
 * - Permite login automático na próxima visita
 * 
 * PERSISTÊNCIA DE SESSÃO
 * ======================
 * 
 * localStorage.setItem('authUser', JSON.stringify(user))
 * - Salva dados do usuário logado
 * - Permite restaurar sessão ao recarregar app
 * - localStorage.removeItem('authUser') ao fazer logout
 * 
 * FEATURES IMPLEMENTADAS
 * ======================
 * 
 * ✅ Validação de formulário com esquemas custom
 * ✅ Mensagens de erro em tempo real
 * ✅ Loading state durante autenticação
 * ✅ Toggle de visibilidade de senha
 * ✅ Persistência de sessão
 * ✅ Restauração automática de sessão
 * ✅ Dashboards personalizados por categoria
 * ✅ Interface responsiva (mobile, tablet, desktop)
 * ✅ Animações e transições suaves
 * ✅ Botão de logout
 * ✅ Navegação entre views
 * 
 * COMO TESTAR
 * ===========
 * 
 * 1. Faça npm install (se não tiver feito ainda)
 * 2. Execute npm run dev
 * 3. Abra http://localhost:5173
 * 4. Clique em "Entrar / Cadastro"
 * 5. Digite uma das credenciais de teste
 * 6. Veja o dashboard personalizado aparecer
 * 7. Clique em "Sair" para voltar à página inicial
 * 
 * PRÓXIMAS IMPLEMENTAÇÕES
 * =======================
 * 
 * - Formulário de cadastro (signup)
 * - Integração com API real
 * - Autenticação com OAuth (Google, GitHub)
 * - Recuperação de senha
 * - Two-factor authentication
 * - Integração com Zod (quando disponível)
 * - Integração com React Hook Form
 * - Refresh tokens
 * - Session timeout
 * - Role-based access control (RBAC)
 * 
 * TROUBLESHOOTING
 * ===============
 * 
 * Problema: Login não funciona
 * Solução: Verifique se o email está exatamente como descrito acima
 * 
 * Problema: Sessão não persiste após reload
 * Solução: Certifique-se de que "Lembrar-me" foi marcado
 * 
 * Problema: Dashboard não aparece
 * Solução: Verifique o console para ver se há erros
 * 
 * Problema: Não consigo voltar ao login
 * Solução: Clique no botão "Voltar" no canto superior esquerdo
 */

export default {};
