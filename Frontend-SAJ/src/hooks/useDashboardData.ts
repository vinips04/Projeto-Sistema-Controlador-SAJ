import { useState, useEffect } from 'react';
import { dashboardService } from '../services';
import type { DashboardStats, AppointmentWithDetails } from '../types';

interface UseDashboardDataResult {
  stats: DashboardStats | null;
  upcomingAppointments: AppointmentWithDetails[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook customizado para buscar dados do dashboard
 * @param lawyerId - ID do advogado logado
 * @param appointmentsLimit - Número máximo de agendamentos a buscar (padrão: 5)
 */
export function useDashboardData(
  lawyerId: string | null,
  appointmentsLimit: number = 5
): UseDashboardDataResult {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState<AppointmentWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    if (!lawyerId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Buscar estatísticas e agendamentos em paralelo
      const [statsResponse, appointmentsResponse] = await Promise.all([
        dashboardService.getStats(lawyerId),
        dashboardService.getUpcomingAppointments(lawyerId, appointmentsLimit),
      ]);

      if (statsResponse.data) {
        setStats(statsResponse.data);
      }

      if (appointmentsResponse.data) {
        setUpcomingAppointments(appointmentsResponse.data);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar dados do dashboard';
      setError(errorMessage);
      console.error('Erro ao buscar dados do dashboard:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [lawyerId, appointmentsLimit]);

  return {
    stats,
    upcomingAppointments,
    isLoading,
    error,
    refetch: fetchDashboardData,
  };
}
