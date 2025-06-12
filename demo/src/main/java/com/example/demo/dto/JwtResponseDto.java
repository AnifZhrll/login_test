package com.example.demo.dto;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter@NoArgsConstructor
@AllArgsConstructor
public class JwtResponseDto {
    private String accessToken;
    private String refreshToken; // Even if not fully implemented yet, include it for future-proofing
    private String tokenType = "Bearer";
    private Long id;
    private String username;
    private String name;
    private String[] roles; // Will typically be a list of string roles
}
