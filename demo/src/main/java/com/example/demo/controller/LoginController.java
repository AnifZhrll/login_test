package com.example.demo.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import ch.qos.logback.core.model.Model;
import com.example.demo.service.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.security.Principal;
import java.util.Collections;
import java.util.Map;


@RestController
public class LoginController {
    private static final Logger log = LoggerFactory.getLogger(LoginController.class);
//    @GetMapping("/auth/token")
//    @ResponseBody
//    public String login() {
//        String jwt = JwtUtil.generateToken("akbar.fajar2311@gmail.com", "Akbar Fajar");
//        log.debug("jwt token {}", jwt);
//        System.out.println("token"+jwt);
//        return "login"; // Return login.html
//    }

    @GetMapping("/auth/token")
    @ResponseBody
    public Map<String, String> token(@AuthenticationPrincipal OAuth2User principal) {
        String email = principal.getAttribute("email");
        String name = principal.getAttribute("name");
        String jwt = JwtUtil.generateToken(email, name);

        return Map.of(
                "token", jwt,
                "email", email,
                "name", name
        );
    }

    @PostMapping("/auth/verify")
    public ResponseEntity<?> verifyGoogleToken(@RequestBody Map<String, String> body) {
        String idTokenString = body.get("token");

        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    new NetHttpTransport(),
                    GsonFactory.getDefaultInstance()
            )
                    .setAudience(Collections.singletonList("591872996188-o5golmiskfmi9r9a6lr6umis8nmcep8q.apps.googleusercontent.com"))
                    .build();

            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();

                String email = payload.getEmail();
                String name = (String) payload.get("name");


                // ✅ Generate your own JWT token
                String jwt = JwtUtil.generateToken(email, name);

                return ResponseEntity.ok(Map.of("jwtToken", jwt,
                        "role", "USER"));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid ID token.");
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Token verification failed.");
        }
    }

    @GetMapping("/hello")
    public String hello(Principal principal) {
        return "Hello " + principal.getName();
    }
}