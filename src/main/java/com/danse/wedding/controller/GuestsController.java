package com.danse.wedding.controller;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import com.danse.api.GuestsApi;
import com.danse.model.Guest;
import com.danse.wedding.service.GuestsService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/invitation/api/v1/guests")
public class GuestsController implements GuestsApi{

    @Autowired
    private GuestsService service;

    private final ObjectMapper objectMapper;

    private final HttpServletRequest request;

    @Autowired
    public GuestsController(ObjectMapper objectMapper, HttpServletRequest request) {
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
    @GetMapping(value = "/")
    public ResponseEntity<List<Guest>> listGuests() {
        List<Guest> guests = service.listGuests();
        return new ResponseEntity<List<Guest>>(guests, HttpStatus.OK);
    }
    
}
