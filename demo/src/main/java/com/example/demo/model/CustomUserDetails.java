package com.example.demo.model;

import com.example.demo.model.User; // Import your actual User entity
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@Getter // Lombok for getters
public class CustomUserDetails implements UserDetails {

    private final User user; // Holds a reference to your database User entity

    public CustomUserDetails(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // This is where you would map your user's roles to Spring Security GrantedAuthority
        // For simplicity, let's assume a single "ROLE_USER"
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        return user.getPassword(); // Delegates to your User entity's password
    }

    @Override
    public String getUsername() {
        return user.getUsername(); // Delegates to your User entity's username
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Implement your logic if you have account expiration
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Implement your logic if you have account locking
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Implement your logic for password expiration
    }

    @Override
    public boolean isEnabled() {
        return true; // Implement your logic for enabled/disabled users
    }

    // You can add convenience methods to access your User entity's other properties
    public Long getId() {
        return user.getId();
    }

    public String getName() {
        return user.getName();
    }
}