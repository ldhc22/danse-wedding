package com.danse.wedding.controller;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import com.danse.api.RsvpApi;
import com.danse.model.Response;
import com.danse.model.Rsvp;
import com.danse.wedding.exception.DanseException;
import com.danse.wedding.service.RsvpService;
import com.danse.wedding.util.DanseConstants;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping(value = "/invitation/api/v1/rsvp")
public class RsvpController implements RsvpApi{

    private final ObjectMapper objectMapper;

    private final HttpServletRequest request;

    @Autowired
    private RsvpService service;

    @Autowired
    public RsvpController(ObjectMapper objectMapper, HttpServletRequest request) {
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
    @PostMapping
    public ResponseEntity<Response> rsvp(@Valid @RequestBody Rsvp body) {
        Response resp = new Response();
        try {
            service.processRsvp(body);
            resp.setCode(DanseConstants.CODE_OK);
            resp.setMessage(DanseConstants.SUCCESS);
            return new ResponseEntity<Response>(resp, HttpStatus.OK);
        } catch (DanseException e) {
            resp.setCode(e.getCode());
            resp.setMessage(e.getMessage());
            if(e.getCode() != null && e.getCode().equals(DanseConstants.CODE_BAD_REQUEST)){
                return new ResponseEntity<Response>(resp, HttpStatus.BAD_REQUEST);
            } else {
                return new ResponseEntity<Response>(resp, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    
}
