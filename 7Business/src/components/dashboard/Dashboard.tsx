import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, DollarSign, TrendingUp } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { DashboardHeader } from './DashboardHeader';
import { MetricsGrid } from './MetricsGrid';
import { AppointmentsTable } from './AppointmentsTable';
import { StaffSchedules } from './StaffSchedules';
import { ClientsManager } from './ClientsManager';
import { ServicesManager } from './ServicesManager';
import { ProductsManager } from './ProductsManager';
import { EmployeesManager } from './EmployeesManager';
import { DailyAgendaView } from './DailyAgendaView';
import { useCompanyData } from './companyDataStore';
import {
  DashboardUser,
  Appointment,
  MetricCard as MetricCardType,
} from './types';
import { staffSchedules } from './mockData';

interface DashboardProps {
  user: DashboardUser;
  onLogout: () => void;
  branding?: {
    name: string;
    logoUrl: string;
    primaryColor: string;
    secondaryColor: string;
  } | null;
}

// Mock Data
const mockUser: DashboardUser = {
  id: '1',
  name: 'João Silva',
  email: 'joao@example.com',
  role: 'admin',
};

const mockMetrics: MetricCardType[] = [
  {
    id: '1',
    title: 'Agendamentos Hoje',
    value: 12,
    change: 15,
    isPositive: true,
    icon: Clock,
  },
  {
    id: '2',
    title: 'Novos Clientes',
    value: 8,
    change: 8,
    isPositive: true,
    icon: Users,
  },
  {
    id: '3',
    title: 'Receita Prevista',
    value: 'R$ 2.450',
    change: 12,
    isPositive: true,
    icon: DollarSign,
  },
  {
    id: '4',
    title: 'Taxa de Conversão',
    value: '68%',
    change: 5,
    isPositive: true,
    icon: TrendingUp,
  },
];

const mockAppointments: Appointment[] = [
  {
    id: '1',
    clientName: 'Maria Santos',
    service: 'Corte e Coloração',
    time: '09:00',
    date: '23 de Jan',
    status: 'confirmado',
    duration: 120,
  },
  {
    id: '2',
    clientName: 'Carlos Oliveira',
    service: 'Revisão de Óleo',
    time: '10:30',
    date: '23 de Jan',
    status: 'confirmado',
    duration: 45,
  },
  {
    id: '3',
    clientName: 'Ana Costa',
    service: 'Design de Sobrancelhas',
    time: '14:00',
    date: '23 de Jan',
    status: 'pendente',
    duration: 30,
  },
  {
    id: '4',
    clientName: 'Pedro Gomes',
    service: 'Consulta Psicológica',
    time: '15:00',
    date: '23 de Jan',
    status: 'confirmado',
    duration: 60,
  },
  {
    id: '5',
    clientName: 'Beatriz Martins',
    service: 'Limpeza Facial',
    time: '16:30',
    date: '23 de Jan',
    status: 'cancelado',
    duration: 45,
  },
];

const sectionTitles: Record<string, string> = {
  dashboard: 'Dashboard',
  agenda: 'Agenda',
  clientes: 'Clientes',
  servicos: 'Servicos',
  produtos: 'Produtos',
  funcionarios: 'Funcionarios',
  financeiro: 'Financeiro',
};

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, branding }) => {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { companyData, setCompanyData } = useCompanyData();
  const currentTitle = sectionTitles[currentSection] || 'Dashboard';

  const cardBorderStyle = branding ? { borderColor: branding.secondaryColor } : undefined;

  const dashboardUser = user || mockUser;

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        onLogout={onLogout}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        branding={branding}
      />

      {/* Header */}
      <DashboardHeader
        title={currentTitle}
        user={dashboardUser}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
        branding={branding}
      />

      {/* Main Content */}
      <main className="md:ml-64 pt-28 md:pt-24 px-4 sm:px-6 lg:px-8 pb-12">
        {currentSection === 'dashboard' && (
          <div className="space-y-8">
            {/* Metrics Grid */}
            <section>
              <MetricsGrid metrics={mockMetrics} branding={branding} />
            </section>

            {/* Appointments Section */}
            <section>
              <AppointmentsTable appointments={mockAppointments} branding={branding} />
            </section>

            <StaffSchedules
              schedules={staffSchedules}
              branding={branding}
              onViewSchedule={(employeeId) => navigate(`/staff/${employeeId}`)}
            />

            {/* Quick Actions */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quick Links */}
              <div
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
                style={cardBorderStyle}
              >
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Ações Rápidas
                </h3>
                <div className="space-y-3">
                  <button
                    className="w-full text-left px-4 py-3 font-semibold rounded-lg transition-colors duration-200 hover:opacity-90"
                    style={
                      branding
                        ? { backgroundColor: branding.primaryColor, color: '#fff' }
                        : { backgroundColor: '#eef2ff', color: '#4338ca' }
                    }
                  >
                    + Novo Agendamento
                  </button>
                  <button
                    className="w-full text-left px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors duration-200"
                  >
                    + Adicionar Cliente
                  </button>
                  <button
                    className="w-full text-left px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors duration-200"
                  >
                    Gerar Relatório
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
                style={cardBorderStyle}
              >
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Atividades Recentes
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 pb-4 border-b border-slate-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Maria Santos confirmou agendamento
                      </p>
                      <p className="text-xs text-slate-500">há 2 horas</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pb-4 border-b border-slate-200">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Novo cliente adicionado: Carlos Oliveira
                      </p>
                      <p className="text-xs text-slate-500">há 5 horas</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Relatório mensal gerado
                      </p>
                      <p className="text-xs text-slate-500">há 1 dia</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Outras seções podem ser implementadas aqui */}
        {currentSection === 'agenda' && <DailyAgendaView branding={branding} />}

        {currentSection === 'clientes' && (
          <ClientsManager
            branding={branding}
            clients={companyData.clients}
            onClientsChange={(clients) =>
              setCompanyData((prev) => ({
                ...prev,
                clients,
              }))
            }
          />
        )}

        {currentSection === 'servicos' && (
          <ServicesManager
            branding={branding}
            services={companyData.services}
            onServicesChange={(services) =>
              setCompanyData((prev) => ({
                ...prev,
                services,
              }))
            }
          />
        )}

        {currentSection === 'produtos' && (
          <ProductsManager
            branding={branding}
            products={companyData.products}
            onProductsChange={(products) =>
              setCompanyData((prev) => ({
                ...prev,
                products,
              }))
            }
          />
        )}

        {currentSection === 'funcionarios' && (
          <EmployeesManager
            branding={branding}
            services={companyData.services.map((service) => service.name)}
            employees={companyData.employees}
            onEmployeesChange={(employees) =>
              setCompanyData((prev) => ({
                ...prev,
                employees,
              }))
            }
          />
        )}

        {currentSection !== 'dashboard' &&
          currentSection !== 'clientes' &&
          currentSection !== 'servicos' &&
          currentSection !== 'produtos' &&
          currentSection !== 'funcionarios' && (
            <div
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center"
              style={cardBorderStyle}
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{currentTitle}</h3>
              <p className="text-slate-600">
                Seção em desenvolvimento. Em breve você terá acesso a todos os recursos de{' '}
                {currentTitle.toLowerCase()}.
              </p>
            </div>
          )}
      </main>
    </div>
  );
};
