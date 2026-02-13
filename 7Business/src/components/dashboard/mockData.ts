import { StaffSchedule } from './types';

export const staffSchedules: StaffSchedule[] = [
  {
    employee: {
      id: 'e1',
      name: 'Mariana Souza',
      role: 'Cabeleireira',
      services: [
        { id: 's1', name: 'Corte', duration: 45 },
        { id: 's2', name: 'Coloracao', duration: 90 },
      ],
    },
    appointments: [
      {
        id: 'a1',
        clientName: 'Bianca Lima',
        service: 'Corte',
        time: '09:30',
        date: '23 de Jan',
        status: 'confirmado',
        duration: 45,
      },
      {
        id: 'a2',
        clientName: 'Isabela Santos',
        service: 'Coloracao',
        time: '11:00',
        date: '23 de Jan',
        status: 'confirmado',
        duration: 90,
      },
    ],
  },
  {
    employee: {
      id: 'e2',
      name: 'Carlos Almeida',
      role: 'Mecanico',
      services: [
        { id: 's3', name: 'Revisao', duration: 60 },
        { id: 's4', name: 'Troca de oleo', duration: 30 },
      ],
    },
    appointments: [
      {
        id: 'a3',
        clientName: 'Diego Ramos',
        service: 'Revisao',
        time: '10:00',
        date: '23 de Jan',
        status: 'confirmado',
        duration: 60,
      },
      {
        id: 'a4',
        clientName: 'Paula Freitas',
        service: 'Troca de oleo',
        time: '14:30',
        date: '23 de Jan',
        status: 'pendente',
        duration: 30,
      },
    ],
  },
  {
    employee: {
      id: 'e3',
      name: 'Dra. Fernanda Costa',
      role: 'Psicologa',
      services: [
        { id: 's5', name: 'Sessao individual', duration: 50 },
        { id: 's6', name: 'Sessao casal', duration: 80 },
      ],
    },
    appointments: [
      {
        id: 'a5',
        clientName: 'Marcio Santos',
        service: 'Sessao individual',
        time: '16:00',
        date: '23 de Jan',
        status: 'confirmado',
        duration: 50,
      },
    ],
  },
];
