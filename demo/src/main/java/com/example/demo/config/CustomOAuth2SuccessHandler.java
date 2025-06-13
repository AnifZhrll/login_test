//package com.example.demo.config;
//
//import com.example.demo.service.JwtUtil;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
//import org.springframework.stereotype.Component;
//
//import java.io.IOException;
//
//@Component
//public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {
//
//    @Override
//    public void onAuthenticationSuccess(HttpServletRequest request,
//                                        HttpServletResponse response,
//                                        Authentication authentication) throws IOException {
//
////        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
////        String email = oAuth2User.getAttribute("email");
////        String name = oAuth2User.getAttribute("name");
//
//        // Generate JWT (your own logic)
////        String token = JwtUtil.generateToken(email, name);
//
//        // ⚠ Redirect to frontend with token in URL (frontend should extract it and store in localStorage)
////        String redirectUrl = "http://localhost:3000/home?token=" + token;
////        response.sendRedirect(redirectUrl);
//    }
//}
//
