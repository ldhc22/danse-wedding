package com.danse.wedding.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.domain.Persistable;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import lombok.Data;

@Data
@Table("guests")
public class GuestEntity implements Persistable<String>{
    @Id
    private String guestId;
    private String guestName;
    private String menu;
    private String allergies;
    @Transient
    private boolean newFlag = false;
    @Override
    public String getId() {
        return guestId;
    }
    @Override
    public boolean isNew() {
        return newFlag;
    }
}
