package com.cynet.authservice.controller;

import com.cynet.authservice.dto.LoginRequest;
import com.cynet.authservice.dto.LoginResponse;
import com.cynet.authservice.service.AuthService;
import com.cynet.authservice.service.KeycloakService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final KeycloakService keycloakService;


    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest requests){
        return authService.login(requests);
    }

    @PostMapping("/create-user")
    public String createUser() {

        keycloakService.createUser("testuser2", "test2@test.com");

        return "User created!";
    }
}
