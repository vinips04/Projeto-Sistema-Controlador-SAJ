package com.saj.controlador.mappers;

import com.saj.controlador.dto.AppointmentDTO;
import com.saj.controlador.entities.Appointment;
import com.saj.controlador.entities.Client;
import com.saj.controlador.entities.Process;
import com.saj.controlador.entities.User;
import com.saj.controlador.services.EntityValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AppointmentMapper {

    @Autowired
    private EntityValidationService entityValidationService;

    public AppointmentDTO toDTO(Appointment appointment) {
        if (appointment == null) {
            return null;
        }
        AppointmentDTO dto = new AppointmentDTO();
        dto.setId(appointment.getId());
        dto.setDateTime(appointment.getDateTime());
        dto.setDurationMinutes(appointment.getDurationMinutes());
        dto.setLawyerId(appointment.getLawyer().getId());
        dto.setClientId(appointment.getClient().getId());
        if (appointment.getProcess() != null) {
            dto.setProcessId(appointment.getProcess().getId());
        }
        dto.setDescription(appointment.getDescription());
        return dto;
    }

    public Appointment toEntity(AppointmentDTO dto) {
        if (dto == null) {
            return null;
        }
        Appointment appointment = new Appointment();
        updateEntityFromDTO(appointment, dto);
        return appointment;
    }

    public void updateEntityFromDTO(Appointment appointment, AppointmentDTO dto) {
        User lawyer = entityValidationService.validateAndGetUser(dto.getLawyerId());
        Client client = entityValidationService.validateAndGetClient(dto.getClientId());

        Process process = null;
        if (dto.getProcessId() != null) {
            process = entityValidationService.validateAndGetProcess(dto.getProcessId());
        }

        appointment.setDateTime(dto.getDateTime());
        appointment.setDurationMinutes(dto.getDurationMinutes());
        appointment.setLawyer(lawyer);
        appointment.setClient(client);
        appointment.setProcess(process);
        appointment.setDescription(dto.getDescription());
    }
}
