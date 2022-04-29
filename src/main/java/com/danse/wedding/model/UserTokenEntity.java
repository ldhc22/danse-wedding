package com.danse.wedding.model;

import java.util.HashSet;
import java.util.Set;

import com.danse.model.Guest;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.domain.Persistable;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import lombok.Data;

@Data
@Table("userToken")
public class UserTokenEntity implements Persistable<String>{
    @Id
    private String userId;
    private String token;

    @MappedCollection(keyColumn = "user_id", idColumn = "user_id")
    private Set<GuestEntity> guests;
    @Transient
    private boolean newFlag = false;
    @Override
    public String getId() {
        return userId;
    }
    @Override
    public boolean isNew() {
        return newFlag;
    }
    public Set<GuestEntity> getGuests(){
        return guests;
    }

    public UserTokenEntity addGuestsItem(GuestEntity guest){
        if(this.guests == null ){
            this.guests = new HashSet<>();
        }
        this.guests.add(guest);
        return this;
    }
}
