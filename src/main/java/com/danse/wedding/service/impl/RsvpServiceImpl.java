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
        Optional<UserTokenEntity> userToken = tokenRepo.findByToken(rsvp.getUserToken());
        if(userToken.isPresent() && rsvp.getGuests() != null && !rsvp.getGuests().isEmpty()) {
            UserTokenEntity tokenEntity = userToken.get();
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
            throw new DanseException(DanseConstants.REQUEST_ERROR, DanseConstants.CODE_BAD_REQUEST);
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
    
}
