package com.melodystream.authservice.controller;

import com.melodystream.authservice.model.User;
import com.melodystream.authservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        String result = userService.signupUser(user);
        Map<String, String> response = new HashMap<>();
        response.put("message", result);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        String result = userService.loginUser(user);
        Map<String, String> response = new HashMap<>();
        
        if (result.equals("Login successful!")) {
            String token = UUID.randomUUID().toString();
            response.put("message", "Login successful!");
            response.put("token", token);
            return ResponseEntity.ok(response);
        } else {
            response.put("message", result);
            return ResponseEntity.badRequest().body(response);
        }
    }
} 