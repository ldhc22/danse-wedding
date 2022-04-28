package com.danse.wedding.repository;

import java.util.List;

import com.danse.wedding.model.GuestEntity;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GuestsRepository extends CrudRepository<GuestEntity, String>{
    List<GuestEntity> findAll();
}
