package com.danse.wedding.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import com.danse.model.Guest;
import com.danse.model.Rsvp;
import com.danse.model.UserToken;
import com.danse.wedding.exception.DanseException;
import com.danse.wedding.mapper.GuestsMapper;
import com.danse.wedding.mapper.UserTokenMapper;
import com.danse.wedding.model.GuestEntity;
import com.danse.wedding.model.UserTokenEntity;
import com.danse.wedding.repository.GuestsRepository;
import com.danse.wedding.repository.UserTokenRepository;
import com.danse.wedding.service.RsvpService;
import com.danse.wedding.util.DanseConstants;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class RsvpServiceImpl implements RsvpService{

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserTokenRepository tokenRepo;

    @Autowired
    private GuestsRepository guestsRepo;

    @Value("${mail.smtp.username}")
    private String username;

    @Value("${mail.to}")
    private String toEmail;

    @Override
    public void processRsvp(Rsvp rsvp) throws DanseException {
        validateRsvp(rsvp);
        Optional<UserTokenEntity> userToken = tokenRepo.findByToken(rsvp.getUserToken());
        if(userToken.isPresent()) {
            UserTokenEntity tokenEntity = userToken.get();
            if(tokenEntity.getGuests() == null || tokenEntity.getGuests().isEmpty()){
                List<GuestEntity> guests = rsvp.getGuests().stream().map(guest -> {
                    GuestEntity entity = GuestsMapper.map(guest);
                    entity.setNewFlag(true);
                    entity.setGuestId(UUID.randomUUID().toString());
                    entity.setUserId(tokenEntity.getId());
                    return entity;
                }).collect(Collectors.toList());
                guestsRepo.saveAll(guests);
                //tokenRepo.save(tokenEntity);
                sendEmailMessage(UserTokenMapper.map(tokenEntity), rsvp.getGuests());
            } else {
                throw new DanseException(
                    DanseConstants.REQUEST_ERROR + " Token was already used to register guests", 
                    DanseConstants.CODE_CONFLICT);
            }  
        } else {
            throw new DanseException(
                DanseConstants.REQUEST_ERROR + " Invalid userToken provided", 
                DanseConstants.CODE_BAD_REQUEST);
        }
    }

    private void sendEmailMessage(UserToken userToken, List<Guest> guests){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(username);
        message.setTo(toEmail);
        message.setSubject(DanseConstants.MAIL_SUBJECT + userToken.getUserId());
        StringBuilder sb = new StringBuilder(String.format(DanseConstants.MAIL_TEXT, userToken.getUserId()));
        guests.stream().forEach(guest -> {
            sb.append(String.format(
                DanseConstants.MAIL_TEXT_GUEST, guest.getName(), guest.getMenu().toString(), guest.getAllergies()
                ));
        });
        message.setText(sb.toString());
        mailSender.send(message);
    }

    private void validateRsvp(Rsvp rsvp) throws DanseException{
        if(rsvp.getUserToken() == null || rsvp.getUserToken().isEmpty() ){
            throw new DanseException(
                DanseConstants.REQUEST_ERROR + " UserToken is required", 
                DanseConstants.CODE_BAD_REQUEST);
        }
        if(rsvp.getUserToken().length() != 36){
            throw new DanseException(
                DanseConstants.REQUEST_ERROR + " Wrong userToken provided", 
                DanseConstants.CODE_BAD_REQUEST);
        }
        if(rsvp.getGuests() == null || rsvp.getGuests().isEmpty()){
            throw new DanseException(
                DanseConstants.REQUEST_ERROR + " Guests were not provided", 
                DanseConstants.CODE_BAD_REQUEST);
        }
        for(Guest guest : rsvp.getGuests()){
            if(guest.getName() == null || guest.getName().isEmpty()){
                throw new DanseException(
                    DanseConstants.REQUEST_ERROR + " Guests name should not be empty", 
                    DanseConstants.CODE_BAD_REQUEST);
            }
            if(guest.getMenu() == null){
                throw new DanseException(
                    DanseConstants.REQUEST_ERROR + " Guests menu should not be empty", 
                    DanseConstants.CODE_BAD_REQUEST);
            }
        }
    }
    
}
