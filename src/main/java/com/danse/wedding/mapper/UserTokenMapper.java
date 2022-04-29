package com.danse.wedding.mapper;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import com.danse.model.UserToken;
import com.danse.wedding.model.UserTokenEntity;

public class UserTokenMapper {
    public static UserToken map(UserTokenEntity entity){
        UserToken dto = new UserToken();
        dto.setUserId(entity.getUserId());
        dto.setToken(entity.getToken());
        if(entity.getGuests() != null && !entity.getGuests().isEmpty()){
            entity.getGuests().stream().forEach(guest -> {
                dto.addGuestsItem(GuestsMapper.map(guest));
            });
        }
        return dto;
    }

    public static UserTokenEntity map(UserToken dto){
        UserTokenEntity entity = new UserTokenEntity();
        entity.setUserId(dto.getUserId());
        entity.setToken(dto.getToken());
        if(dto.getGuests() != null && !dto.getGuests().isEmpty()){
            dto.getGuests().stream().forEach(guest -> {
                entity.addGuestsItem(GuestsMapper.map(guest));
            });
        }
        return entity;
    }

    public static List<UserToken> map(List<UserTokenEntity> entities){
        return entities.stream().map((entity) -> {
            return map(entity);
        }).collect(Collectors.toList());
    }
}
