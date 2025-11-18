package com.saj.controlador.services;

import com.saj.controlador.entities.Client;
import com.saj.controlador.entities.Process;
import com.saj.controlador.entities.User;
import com.saj.controlador.exceptions.ResourceNotFoundException;
import com.saj.controlador.repositories.ClientRepository;
import com.saj.controlador.repositories.ProcessRepository;
import com.saj.controlador.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class EntityValidationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ProcessRepository processRepository;

    public User validateAndGetUser(UUID userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com id: " + userId));
    }

    public Client validateAndGetClient(UUID clientId) {
        return clientRepository.findById(clientId)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente não encontrado com id: " + clientId));
    }

    public Process validateAndGetProcess(UUID processId) {
        return processRepository.findById(processId)
                .orElseThrow(() -> new ResourceNotFoundException("Processo não encontrado com id: " + processId));
    }

    public boolean userExists(UUID userId) {
        return userRepository.existsById(userId);
    }

    public boolean clientExists(UUID clientId) {
        return clientRepository.existsById(clientId);
    }

    public boolean processExists(UUID processId) {
        return processRepository.existsById(processId);
    }
}
