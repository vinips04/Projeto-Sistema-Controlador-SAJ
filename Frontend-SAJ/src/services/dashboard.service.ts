import { apiClient } from './api-client';
import type { DashboardStats, AppointmentWithDetails, ApiResponse } from '../types';

export const dashboardService = {
  /**
   * Busca estatísticas consolidadas do dashboard
   * Endpoint otimizado que retorna todas as métricas em uma única chamada
   */
  async getStats(lawyerId: string): Promise<ApiResponse<DashboardStats>> {
    return apiClient.get<DashboardStats>(`/dashboard/stats?lawyerId=${lawyerId}`);
  },

  /**
   * Busca próximos agendamentos com detalhes de cliente e processo
   * Retorna agendamentos ordenados por data
   */
  async getUpcomingAppointments(
    lawyerId: string,
    limit?: number
  ): Promise<ApiResponse<AppointmentWithDetails[]>> {
    const params = new URLSearchParams({ lawyerId });
    if (limit) {
      params.append('limit', limit.toString());
    }
    return apiClient.get<AppointmentWithDetails[]>(`/dashboard/appointments?${params.toString()}`);
  },
};
