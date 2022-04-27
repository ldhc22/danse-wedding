package com.danse.wedding.controller;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import com.danse.api.HelloWorldApi;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/invitation/api/v1")
public class HelloWorldController implements HelloWorldApi{

    private static final Logger log = LoggerFactory.getLogger(HelloWorldController.class);

    private final ObjectMapper objectMapper;

    private final HttpServletRequest request;

    @Value("${mail.smtp.host}")
    private String smtp;

    @Autowired
    public HelloWorldController(ObjectMapper objectMapper, HttpServletRequest request) {
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

    @GetMapping(value = "/helloWorld")
    public ResponseEntity<String> helloWorld() {
        return new ResponseEntity<String>("Hello World: " +smtp, HttpStatus.OK);
    }
    
}
