import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, Clock, User, FileText } from 'lucide-react';
import type { AppointmentWithDetails } from '../../types';

interface AppointmentListProps {
  appointments: AppointmentWithDetails[];
  isLoading?: boolean;
}

export function AppointmentList({ appointments, isLoading = false }: AppointmentListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse rounded-lg bg-slate-100 p-4">
            <div className="h-4 w-3/4 rounded bg-slate-200"></div>
            <div className="mt-2 h-3 w-1/2 rounded bg-slate-200"></div>
          </div>
        ))}
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="py-8 text-center">
        <Calendar className="mx-auto h-12 w-12 text-slate-300" />
        <p className="mt-4 text-slate-500">Nenhum agendamento encontrado</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {appointments.map((appointment) => {
        const appointmentDate = new Date(appointment.dateTime);
        const formattedDate = format(appointmentDate, "d 'de' MMMM", { locale: ptBR });
        const formattedTime = format(appointmentDate, 'HH:mm', { locale: ptBR });

        return (
          <div
            key={appointment.id}
            className="rounded-lg border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2 text-sm text-slate-600">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">{formattedDate}</span>
                  <Clock className="ml-2 h-4 w-4" />
                  <span>{formattedTime}</span>
                  <span className="text-slate-400">•</span>
                  <span>{appointment.durationMinutes} min</span>
                </div>

                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-slate-500" />
                  <p className="font-semibold text-slate-900">{appointment.clientName}</p>
                </div>

                {appointment.processNumber && (
                  <div className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                    <FileText className="h-4 w-4 text-slate-500" />
                    <span>Processo: {appointment.processNumber}</span>
                  </div>
                )}

                {appointment.description && (
                  <p className="mt-2 text-sm text-slate-600">{appointment.description}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
