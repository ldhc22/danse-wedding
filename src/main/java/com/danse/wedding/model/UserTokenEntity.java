package com.danse.wedding.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.domain.Persistable;
import org.springframework.data.relational.core.mapping.Table;

import lombok.Data;

@Data
@Table("userToken")
public class UserTokenEntity implements Persistable<String>{
    @Id
    private String userId;
    private String token;
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
}
