package com.danse.wedding.service;

import java.util.List;

import com.danse.model.UserToken;
import com.danse.wedding.exception.DanseException;

public interface UserTokenService {
    UserToken getUserToken(String userId);
    List<UserToken> listUserToken();
    void deleteUserToken(String userId) throws DanseException;
    String addUserToken(String userId);
}
