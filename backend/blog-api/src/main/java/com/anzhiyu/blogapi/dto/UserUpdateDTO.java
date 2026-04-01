package com.anzhiyu.blogapi.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserUpdateDTO {
  private String username;
  private String password;
  private String email;
  private String phone;
  private String address;
  private String city;
  private String state;
  private String zip;
  private String country;
  private String website;
  private String bio;
}