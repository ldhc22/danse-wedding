package com.danse.wedding.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.danse.model.Guest;
import com.danse.model.Guest.MenuEnum;
import com.danse.wedding.model.GuestEntity;

public class GuestsMapper {
    public static Guest map(GuestEntity entity){
        Guest dto = new Guest();
        dto.setId(entity.getGuestId());
        dto.setName(entity.getGuestName());
        dto.setMenu(MenuEnum.fromValue(entity.getMenu()));
        dto.setAllergies(entity.getAllergies());
        dto.setUserId(entity.getUserId());
        return dto;
    }

    public static GuestEntity map(Guest dto){
        GuestEntity entity = new GuestEntity();
        entity.setGuestId(dto.getId());
        entity.setGuestName(dto.getName());
        entity.setMenu(dto.getMenu().toString());
        entity.setAllergies(dto.getAllergies());
        entity.setUserId(dto.getUserId());
        return entity;
    }

    public static List<Guest> map(List<GuestEntity> entities){
        return entities.stream().map((entity) -> {
            return map(entity);
        }).collect(Collectors.toList());
    }
}
