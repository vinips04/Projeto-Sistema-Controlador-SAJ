package com.saj.controlador.services;

import com.saj.controlador.dto.AuthRequestDTO;
import com.saj.controlador.dto.AuthResponseDTO;
import com.saj.controlador.entities.User;
import com.saj.controlador.exceptions.ResourceNotFoundException;
import com.saj.controlador.repositories.UserRepository;
import com.saj.controlador.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    public AuthResponseDTO authenticate(AuthRequestDTO authRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Usuário ou senha inválidos.");
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);

        User user = userRepository.findByUsername(authRequest.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado após autenticação."));

        return AuthResponseDTO.builder()
                .token(jwt)
                .userId(user.getId().toString())
                .fullName(user.getFullName())
                .username(user.getUsername())
                .build();
    }
}
