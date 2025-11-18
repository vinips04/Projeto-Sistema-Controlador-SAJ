package com.saj.controlador.services;

import com.saj.controlador.dto.AppointmentWithDetails;
import com.saj.controlador.dto.DashboardStats;
import com.saj.controlador.repositories.AppointmentRepository;
import com.saj.controlador.repositories.ClientRepository;
import com.saj.controlador.repositories.ProcessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class DashboardService {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ProcessRepository processRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    public DashboardStats getStatistics(UUID lawyerId) {
        LocalDateTime startOfWeek = LocalDate.now().atStartOfDay();
        LocalDateTime endOfWeek = LocalDate.now().plusDays(7).atStartOfDay();

        return DashboardStats.builder()
                .totalClients(clientRepository.count())
                .activeProcesses(processRepository.countByStatus("ATIVO"))
                .todayAppointments(appointmentRepository.countTodayByLawyer(lawyerId, LocalDate.now()))
                .weekAppointments(appointmentRepository.countNextWeekByLawyer(lawyerId, startOfWeek, endOfWeek))
                .build();
    }

    public List<AppointmentWithDetails> getUpcomingAppointments(UUID lawyerId, int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        return appointmentRepository.findUpcomingWithDetailsByLawyer(lawyerId, LocalDateTime.now(), pageable);
    }
}
