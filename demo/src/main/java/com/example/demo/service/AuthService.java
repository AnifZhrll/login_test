// src/main/java/com/example/demo/service/AuthService.java
package com.example.demo.service;

import com.example.demo.dto.RegisterRequestDto;
import com.example.demo.dto.UserResponseDto;
import com.example.demo.exception.UserAlreadyExistsException;
import com.example.demo.mapper.UserMapper;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
//import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.demo.service.JwtService;
import com.example.demo.dto.JwtResponseDto;
import com.example.demo.dto.LoginRequestDto;
//import org.springframework.security.authentication.AuthenticationManager;
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
//    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, UserMapper userMapper, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
//        this.authenticationManager = authenticationManager;
    }

    @Transactional // Ensures the entire operation is a single transaction
    public UserResponseDto registerUser(RegisterRequestDto registerRequestDto) {
        // 1. Check if username already exists
        if (userRepository.existsByUsername(registerRequestDto.getUsername())) {
            throw new UserAlreadyExistsException("Username '" + registerRequestDto.getUsername() + "' already exists.");
        }

        // 2. Map DTO to User entity
        User user = userMapper.toEntity(registerRequestDto);

        // 3. Hash the password before saving
        String hashedPassword = passwordEncoder.encode(registerRequestDto.getPassword());
        user.setPassword(hashedPassword);

        // 4. Save the user to the database
        User savedUser = userRepository.save(user);

        // 5. Map the saved User entity back to Response DTO
        return userMapper.toDto(savedUser);
    }

//    public String loginUser(LoginRequestDto loginRequestDto){
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        loginRequestDto.getUsername(),
//                        loginRequestDto.getPassword()
//                )
//        );
//        return "a";
//    }
}