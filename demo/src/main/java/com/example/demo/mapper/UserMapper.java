// src/main/java/com/example/demo/mapper/UserMapper.java
package com.example.demo.mapper;

import com.example.demo.dto.RegisterRequestDto;
import com.example.demo.dto.UserResponseDto;
import com.example.demo.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    // Map RegisterRequestDto to User entity for creation
    @Mapping(target = "id", ignore = true) // ID is auto-generated, so ignore from DTO
    @Mapping(target = "password", ignore = true) // Password will be hashed in service, not directly mapped
    User toEntity(RegisterRequestDto registerRequestDto);

    // Map User entity to UserResponseDto for sending back to client
    UserResponseDto toDto(User user);
}