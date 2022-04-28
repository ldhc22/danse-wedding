package com.danse.wedding.model;

import lombok.Data;

@Data
public class GuestDto {
    private String guestId;
    private String guestName;
    private String menu;
    private String allergies;
}
