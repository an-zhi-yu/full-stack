package com.anzhiyu.blogapi.dto;

import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class UserRegisterDTO {
    private String username;
    private String password;
}
