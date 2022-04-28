package com.danse.wedding.model;

import lombok.Data;

@Data
public class UserTokenDto {
    private String userId;
    private String token;
}
