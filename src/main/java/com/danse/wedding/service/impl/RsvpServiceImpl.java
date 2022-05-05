package com.danse.wedding.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class RsvpServiceImpl implements RsvpService{

    private static final Logger log = LoggerFactory.getLogger(RsvpServiceImpl.class);

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserTokenRepository tokenRepo;

    @Autowired
    private GuestsRepository guestsRepo;

    @Value("${mail.smtp.username}")
    private String username;

    @Value("${mail.to}")
    private String[] toEmail;

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
        MimeMessage message = mailSender.createMimeMessage();
        try{
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");
            helper.setFrom(username);
            helper.setTo(toEmail);
            helper.setSubject(DanseConstants.MAIL_SUBJECT + userToken.getUserId());
            StringBuilder sb = new StringBuilder(String.format(DanseConstants.MAIL_TEXT, userToken.getUserId()));
            
            for(int i = 0; i < guests.size(); i++){
                String row = "";
                if(i%2 == 0){
                    row = String.format(
                        DanseConstants.MAIL_TEXT_GUEST_EVEN, 
                        guests.get(i).getName(), 
                        guests.get(i).getMenu().toString(), 
                        guests.get(i).getAllergies()
                        );
                } else {
                    row = String.format(
                        DanseConstants.MAIL_TEXT_GUEST_ODD, 
                        guests.get(i).getName(), 
                        guests.get(i).getMenu().toString(), 
                        guests.get(i).getAllergies()
                        );
                }                
                sb.append(row);
            }
            sb.append(DanseConstants.MAIL_END);
            helper.setText(sb.toString(), true);
            mailSender.send(message);
        } catch(MessagingException me){
            log.error("Exception occured during email sending", me);
        }
        
        
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
