package com.anzhiyu.blogapi.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.anzhiyu.blogapi.model.dto.UserLoginDTO;
import com.anzhiyu.blogapi.model.dto.UserRegisterDTO;
import com.anzhiyu.blogapi.model.dto.UserUpdateDTO;
import com.anzhiyu.blogapi.model.vo.UserInfoVO;
import com.anzhiyu.blogapi.model.vo.UserListVO;

/**
 * 用户业务契约（接口）。
 *
 * <p>
 * 前端类比：你在 TS 里先写一个 <code>interface UserService</code>，再有一个具体实现类；
 * Spring 在 Controller 里注入的是<strong>接口类型</strong>，运行时用唯一的实现类
 * {@link com.anzhiyu.blogapi.service.impl.UserServiceJpaImpl}，方便以后换实现或做单元测试
 * Mock。
 * </p>
 */
public interface UserService {

  Page<UserListVO> listUsers(Pageable pageable);

  UserInfoVO register(UserRegisterDTO request);

  Optional<UserInfoVO> login(UserLoginDTO request);

  UserInfoVO update(Long id, UserUpdateDTO request);

  Optional<UserInfoVO> getById(Long id);

  boolean logout(String id);

  boolean deleteById(Long id);

}
