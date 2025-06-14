// src/main/java/com/example/demo/model/User.java
package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "users") // Matches your Liquibase table name
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Assumes auto-incrementing ID
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String name; // Corresponds to 'name' in your Liquibase

    @Column(nullable = false)
    private String password; // Store hashed password!

    // Getters and Setters are generated by Lombok
    // Constructors are generated by Lombok

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", name='" + name + '\'' +
                // DO NOT include password in toString() for security
                '}';
    }
}