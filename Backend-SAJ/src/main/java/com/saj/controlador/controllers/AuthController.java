package com.saj.controlador.controllers;

import com.saj.controlador.dto.AuthRequestDTO;
import com.saj.controlador.dto.AuthResponseDTO;
import com.saj.controlador.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequestDTO authRequest) {
        try {
            AuthResponseDTO response = authService.authenticate(authRequest);
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Erro de autenticação: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro inesperado durante a autenticação: " + e.getMessage());
        }
    }
}
