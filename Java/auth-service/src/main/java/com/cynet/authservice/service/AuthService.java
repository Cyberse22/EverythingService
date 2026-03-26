package com.cynet.authservice.service;

import com.cynet.authservice.dto.LoginRequest;
import com.cynet.authservice.dto.LoginResponse;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    LoginResponse login(LoginRequest request);
}
