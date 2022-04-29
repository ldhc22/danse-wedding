package com.danse.wedding.service.impl;

import java.util.ArrayList;
import java.util.List;

import com.danse.model.Guest;
import com.danse.wedding.mapper.GuestsMapper;
import com.danse.wedding.model.GuestEntity;
import com.danse.wedding.repository.GuestsRepository;
import com.danse.wedding.service.GuestsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GuestServiceImpl implements GuestsService {

    @Autowired
    private GuestsRepository repository;

    @Override
    public List<Guest> listGuests() {
        List<Guest> guests = new ArrayList<>();
        Iterable<GuestEntity> entities = repository.findAll();
        entities.forEach(entity -> {
            guests.add(GuestsMapper.map(entity));
        });
        return guests;
    }
    
}
