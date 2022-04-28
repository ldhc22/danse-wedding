package com.danse.wedding.mapper;

import com.danse.wedding.model.UserTokenDto;
import com.danse.wedding.model.UserTokenEntity;

public class UserTokenMapper {
    public static UserTokenDto map(UserTokenEntity entity){
        UserTokenDto dto = new UserTokenDto();
        dto.setUserId(entity.getUserId());
        dto.setToken(entity.getToken());
        return dto;
    }

    public static UserTokenEntity map(UserTokenDto dto){
        UserTokenEntity entity = new UserTokenEntity();
        entity.setUserId(dto.getUserId());
        entity.setToken(dto.getToken());
        return entity;
    }
}
