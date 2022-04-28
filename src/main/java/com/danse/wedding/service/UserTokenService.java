package com.danse.wedding.service;

import com.danse.wedding.model.UserTokenDto;

public interface UserTokenService {
    UserTokenDto getUserToken(String userId);
    String addUserToken(String userId);
}
