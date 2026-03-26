package com.cynet.authservice.service.impl;

import com.cynet.authservice.dto.LoginRequest;
import com.cynet.authservice.dto.LoginResponse;
import com.cynet.authservice.service.AuthService;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    @Override
    public LoginResponse login(LoginRequest request) {
        return new LoginResponse("token");
    }
}
