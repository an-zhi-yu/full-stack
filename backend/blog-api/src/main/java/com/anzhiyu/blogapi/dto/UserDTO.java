package com.anzhiyu.blogapi.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDTO {
  private String id;
  private String username;
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
