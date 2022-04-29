package com.danse.wedding.controller;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import com.danse.api.UserTokenApi;
import com.danse.model.Response;
import com.danse.model.UserToken;
import com.danse.wedding.exception.DanseException;
import com.danse.wedding.service.UserTokenService;
import com.danse.wedding.util.DanseConstants;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/invitation/api/v1/userToken")
public class UserTokenController implements UserTokenApi{

    private static final Logger log = LoggerFactory.getLogger(UserTokenController.class);
    @Autowired
    private UserTokenService service;

    private final ObjectMapper objectMapper;

    private final HttpServletRequest request;

    @Autowired
    public UserTokenController(ObjectMapper objectMapper, HttpServletRequest request) {
        this.objectMapper = objectMapper;
        this.request = request;
    }
    @Override
    public Optional<ObjectMapper> getObjectMapper() {
        return Optional.ofNullable(objectMapper);
    }

    @Override
    public Optional<HttpServletRequest> getRequest() {
        return Optional.ofNullable(request);
    }

    @Override
    @PostMapping(value = "/{userId}")
    public ResponseEntity<String> createUserToken(@PathVariable String userId){
        log.debug("Create token for user {}", userId);
        String token = service.addUserToken(userId);
        return new ResponseEntity<String>(token, HttpStatus.OK);
    }

    @Override
    @DeleteMapping(value = "/{userId}")
    public ResponseEntity<Response> deleteUserToken(@PathVariable String userId) {
        Response resp = new Response();
        try {
            service.deleteUserToken(userId);
            resp.setCode(DanseConstants.CODE_OK);
            resp.setMessage("UserId "+userId+" deleted" );
            return new ResponseEntity<>(resp, HttpStatus.OK);
        } catch (DanseException e) {
            log.info("Error deleting user {}", userId );
            log.info(e.getMessage(),e);
            resp.setCode(e.getCode());
            resp.setMessage("Error deleting user " + userId );
            if(e.getCode() != null && e.getCode().equals(DanseConstants.CODE_BAD_REQUEST)){
                return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
            } else {
                return new ResponseEntity<>(resp, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }  
    }

    @Override
    @GetMapping(value = "/{userId}")
    public ResponseEntity<UserToken> getUserToken(@PathVariable String userId) {
        UserToken token = service.getUserToken(userId);
        return new ResponseEntity<UserToken>(token, HttpStatus.OK);
    }
    @Override
    @GetMapping(value = "/")
    public ResponseEntity<List<UserToken>> listUserToken() {
        List<UserToken> tokens = service.listUserToken();
        return new ResponseEntity<List<UserToken>>(tokens, HttpStatus.OK);
    }
}
