package com.kcterala.musicapp.model;



import lombok.Data;

@Data
public class AuthRequest {
    private String username;
    private String password;
}