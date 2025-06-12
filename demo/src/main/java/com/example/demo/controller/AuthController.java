package com.example.demo.controller;

import com.example.demo.dto.RegisterRequestDto;
import com.example.demo.dto.UserResponseDto;
import com.example.demo.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin; // Import this
import org.springframework.web.bind.annotation.RequestMethod; // Import this

@RestController
@RequestMapping("/api/auth") // Base path for authentication related APIs
@CrossOrigin(origins = "http://localhost:3000", methods = {org.springframework.web.bind.annotation.RequestMethod.POST, org.springframework.web.bind.annotation.RequestMethod.OPTIONS})
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDto> registerUser(@Valid @RequestBody RegisterRequestDto registerRequestDto) {
        try {
            UserResponseDto registeredUser = authService.registerUser(registerRequestDto);
            return new ResponseEntity<>(registeredUser, HttpStatus.CREATED); // 201 Created
        } catch (Exception e) {
            throw e; // Re-throw to let Spring's exception handling process @ResponseStatus
        }
    }

}