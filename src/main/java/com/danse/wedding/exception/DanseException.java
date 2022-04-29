package com.danse.wedding.exception;

import lombok.Getter;
import lombok.Setter;

public class DanseException extends Exception{
    @Getter
    @Setter
    private String code;
    public DanseException(String message, String code){
        super(message);
        this.code = code;
    }
}
