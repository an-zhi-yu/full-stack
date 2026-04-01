package com.anzhiyu.blogapi.service;

import java.util.List;

import com.anzhiyu.blogapi.dto.UserDTO;
import com.anzhiyu.blogapi.dto.UserRegisterDTO;
import com.anzhiyu.blogapi.dto.UserUpdateDTO;

public interface UserService {
  List<UserDTO> getAllUsers();

  UserDTO register(UserRegisterDTO request);

  UserDTO login(String username, String password);

  UserDTO update(String id, UserUpdateDTO request);

  UserDTO getById(String id);

  String logout(String id);
}
