package com.saj.controlador.mappers;

import com.saj.controlador.dto.ProcessDTO;
import com.saj.controlador.entities.Client;
import com.saj.controlador.entities.Process;
import com.saj.controlador.services.EntityValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProcessMapper {

    @Autowired
    private EntityValidationService entityValidationService;

    public ProcessDTO toDTO(Process process) {
        if (process == null) {
            return null;
        }
        ProcessDTO dto = new ProcessDTO();
        dto.setId(process.getId());
        dto.setNumber(process.getNumber());
        dto.setClientId(process.getClient().getId());
        dto.setDescription(process.getDescription());
        dto.setStatus(process.getStatus());
        return dto;
    }

    public Process toEntity(ProcessDTO dto) {
        if (dto == null) {
            return null;
        }
        Client client = entityValidationService.validateAndGetClient(dto.getClientId());

        Process process = new Process();
        process.setId(dto.getId());
        process.setNumber(dto.getNumber());
        process.setClient(client);
        process.setDescription(dto.getDescription());
        process.setStatus(dto.getStatus());
        return process;
    }
}
