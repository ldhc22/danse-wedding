package com.danse.wedding.repository;

import java.util.List;
import java.util.Optional;

import com.danse.wedding.model.UserTokenEntity;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTokenRepository extends CrudRepository<UserTokenEntity, String>{
    Optional<UserTokenEntity> findByToken(String token);

}
