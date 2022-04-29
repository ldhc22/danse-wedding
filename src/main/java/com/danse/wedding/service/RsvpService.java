package com.danse.wedding.service;

import com.danse.model.Rsvp;
import com.danse.wedding.exception.DanseException;

public interface RsvpService  {
    void processRsvp(Rsvp rsvp) throws DanseException;
}
