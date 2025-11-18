package com.saj.controlador.controllers;

import com.saj.controlador.dto.ApiResponse;
import com.saj.controlador.dto.DashboardStats;
import com.saj.controlador.dto.AppointmentWithDetails;
import com.saj.controlador.services.DashboardService;
import com.saj.controlador.util.UUIDValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;
    private final UUIDValidator uuidValidator;

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<DashboardStats>> getStats(
            @RequestParam String lawyerId) {

        UUID parsedLawyerId = uuidValidator.validateAndParse(lawyerId);
        DashboardStats stats = dashboardService.getStatistics(parsedLawyerId);

        return ResponseEntity.ok(new ApiResponse<>("Estatísticas carregadas com sucesso", stats));
    }

    @GetMapping("/appointments")
    public ResponseEntity<ApiResponse<List<AppointmentWithDetails>>> getUpcomingAppointments(
            @RequestParam String lawyerId,
            @RequestParam(defaultValue = "5") int limit) {

        UUID parsedLawyerId = uuidValidator.validateAndParse(lawyerId);
        List<AppointmentWithDetails> appointments = dashboardService.getUpcomingAppointments(parsedLawyerId, limit);

        return ResponseEntity.ok(new ApiResponse<>("Agendamentos carregados com sucesso", appointments));
    }
}
