import { LayoutDashboard, Users, FileText, Calendar, CalendarDays, AlertCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useDashboardData } from '../../hooks/useDashboardData';
import { StatsCard, AppointmentList } from '../../components/dashboard';

export function Dashboard() {
  const { userId } = useAuth();
  const { stats, upcomingAppointments, isLoading, error, refetch } = useDashboardData(userId);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          </div>
          {!isLoading && (
            <button
              onClick={refetch}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              <RefreshCw className="h-4 w-4" />
              Atualizar
            </button>
          )}
        </div>
        <p className="mt-2 text-slate-600">Visão geral do sistema</p>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex items-center gap-2 text-red-800">
            <AlertCircle className="h-5 w-5" />
            <p className="font-medium">Erro ao carregar dados</p>
          </div>
          <p className="mt-1 text-sm text-red-700">{error}</p>
          <button
            onClick={refetch}
            className="mt-3 rounded-md bg-red-100 px-3 py-1 text-sm font-medium text-red-800 hover:bg-red-200"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total de Clientes"
          value={stats?.totalClients ?? 0}
          icon={Users}
          isLoading={isLoading}
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Processos Ativos"
          value={stats?.activeProcesses ?? 0}
          icon={FileText}
          isLoading={isLoading}
          iconColor="text-green-600"
        />
        <StatsCard
          title="Agendamentos Hoje"
          value={stats?.todayAppointments ?? 0}
          icon={Calendar}
          isLoading={isLoading}
          iconColor="text-orange-600"
        />
        <StatsCard
          title="Próximos 7 Dias"
          value={stats?.weekAppointments ?? 0}
          icon={CalendarDays}
          isLoading={isLoading}
          iconColor="text-purple-600"
        />
      </div>

      {/* Upcoming Appointments */}
      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Próximos Agendamentos</h2>
        <div className="mt-4">
          <AppointmentList appointments={upcomingAppointments} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
