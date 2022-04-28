package com.danse.wedding.service.impl;

import java.util.UUID;

import com.danse.wedding.mapper.UserTokenMapper;
import com.danse.wedding.model.UserTokenDto;
import com.danse.wedding.model.UserTokenEntity;
import com.danse.wedding.repository.UserTokenRepository;
import com.danse.wedding.service.UserTokenService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserTokenServiceImpl implements UserTokenService{

    @Autowired
    private UserTokenRepository repository;

    public UserTokenDto getUserToken(String userId){
        UserTokenDto dto = null;
        UserTokenEntity entity = repository.findByUserId(userId);
        dto = UserTokenMapper.map(entity);
        return dto;
    }

    public String addUserToken(String userId){
        String token = UUID.randomUUID().toString();
        UserTokenEntity entity = new UserTokenEntity();
        entity.setUserId(userId);
        entity.setToken(token);
        entity.setNewFlag(true);
        repository.save(entity);
        return token;
    }
}
