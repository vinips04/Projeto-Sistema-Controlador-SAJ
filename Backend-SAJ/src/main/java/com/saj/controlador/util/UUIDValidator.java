package com.saj.controlador.util;

import com.saj.controlador.exceptions.InvalidArgumentException;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class UUIDValidator {

    public UUID validateAndParse(String uuidString) {
        if (uuidString == null || uuidString.trim().isEmpty()) {
            throw new InvalidArgumentException("ID não pode ser vazio.");
        }
        try {
            return UUID.fromString(uuidString.trim());
        } catch (IllegalArgumentException e) {
            throw new InvalidArgumentException("ID inválido: " + uuidString);
        }
    }
}
