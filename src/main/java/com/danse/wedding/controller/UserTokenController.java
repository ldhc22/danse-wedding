package com.danse.wedding.controller;

import com.danse.wedding.model.UserTokenDto;
import com.danse.wedding.service.UserTokenService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/invitation/api/v1/userToken")
public class UserTokenController {

    private static final Logger log = LoggerFactory.getLogger(UserTokenController.class);
    @Autowired
    private UserTokenService service;
    @PostMapping(value = "/")
    public ResponseEntity<String> createUserToken(@RequestBody String userId){
        log.debug("Create token for user {}", userId);
        String token = service.addUserToken(userId);
        return new ResponseEntity<String>(token, HttpStatus.OK);
    }
}
