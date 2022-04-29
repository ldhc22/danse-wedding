package com.danse.wedding.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.danse.model.UserToken;
import com.danse.wedding.exception.DanseException;
import com.danse.wedding.mapper.UserTokenMapper;
import com.danse.wedding.model.UserTokenEntity;
import com.danse.wedding.repository.UserTokenRepository;
import com.danse.wedding.service.UserTokenService;
import com.danse.wedding.util.DanseConstants;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserTokenServiceImpl implements UserTokenService{

    @Autowired
    private UserTokenRepository repository;

    public UserToken getUserToken(String userId){
        UserToken dto = null;
        Optional<UserTokenEntity> entity = repository.findById(userId);
        if(entity.isPresent()){
            dto = UserTokenMapper.map(entity.get());
        }
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

    @Override
    public List<UserToken> listUserToken() {
        List<UserToken> tokenList = new ArrayList<>();
        Iterable<UserTokenEntity> tokens = repository.findAll();
        tokens.forEach(token -> {
            tokenList.add(UserTokenMapper.map(token));
        });
        return tokenList;
    }

    @Override
    public void deleteUserToken(String userId) throws DanseException {
        Optional<UserTokenEntity> entity = repository.findById(userId);
        if(entity.isPresent()){
            repository.delete(entity.get());
        } else{
            throw new DanseException(DanseConstants.DELETE_ERROR, DanseConstants.CODE_BAD_REQUEST);
        }
        
    }
}
