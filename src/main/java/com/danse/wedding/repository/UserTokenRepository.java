package com.danse.wedding.repository;

import java.util.List;

import com.danse.wedding.model.UserTokenEntity;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTokenRepository extends CrudRepository<UserTokenEntity, String>{
    UserTokenEntity findByUserId(String userId);
}
