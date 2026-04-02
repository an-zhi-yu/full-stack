package com.anzhiyu.blogapi.service.impl;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.anzhiyu.blogapi.common.exception.ConflictException;
import com.anzhiyu.blogapi.common.exception.ResourceNotFoundException;
import com.anzhiyu.blogapi.common.util.BeanUtil;
import com.anzhiyu.blogapi.dto.UserLoginDTO;
import com.anzhiyu.blogapi.dto.UserRegisterDTO;
import com.anzhiyu.blogapi.dto.UserUpdateDTO;
import com.anzhiyu.blogapi.entity.UserEntity;
import com.anzhiyu.blogapi.mapper.UserMapper;
import com.anzhiyu.blogapi.repository.UserRepository;
import com.anzhiyu.blogapi.service.UserService;
import com.anzhiyu.blogapi.vo.UserInfoVO;
import com.anzhiyu.blogapi.vo.UserListVO;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;

@Service
public class UserServiceJpaImpl implements UserService {

  private final UserMapper userMapper; // UserMapper 是 MapStruct 生成的实现类，用于将 UserEntity 转换为 UserDTO
  private final PasswordEncoder passwordEncoder; // BCrypt 哈希，类比 npm 的 <code>bcrypt</code>。
  private final UserRepository userRepository;

  public UserServiceJpaImpl(UserMapper userMapper, PasswordEncoder passwordEncoder, UserRepository userRepository) {
    this.userMapper = userMapper;
    this.passwordEncoder = passwordEncoder;
    this.userRepository = userRepository;
  }

  // 初始化Demo用户密码
  // @PostConstruct
  // private void initDemoUserPasswords() {
  // for (UserEntity user : userRepository.findAll()) {
  // user.setPassword(passwordEncoder.encode(user.getPassword()));
  // }
  // }

  // 分页查询用户
  @Override
  public Page<UserListVO> listUsers(Pageable pageable) {
    Page<UserEntity> page = userRepository.findAll(pageable);
    return page.map(userMapper::toVO);
  }

  // 注册用户
  @Override
  @Transactional // 对数据库操作进行操作必要
  public UserInfoVO register(UserRegisterDTO dto) {
    boolean exists = userRepository.existsByUsername(dto.username());
    if (exists) {
      throw new ConflictException("用户名已存在: " + dto.username());
    }

    UserEntity entity = UserEntity.builder()
        .username(dto.username())
        .password(passwordEncoder.encode(dto.password()))
        .build();
    userRepository.save(entity);
    return userMapper.toDto(entity);
  }

  // 根据ID查询用户
  @Override
  public Optional<UserInfoVO> getById(Long id) {
    return userRepository.findById(id)
        .map(userMapper::toDto);
  }

  // 更新用户
  @Override
  @Transactional
  public UserInfoVO update(Long id, UserUpdateDTO dto) {
    UserEntity entity = userRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("用户不存在: " + id));
    BeanUtil.copyNonNullProperties(dto, entity);
    if (dto.password() != null && !dto.password().isBlank()) {
      entity.setPassword(passwordEncoder.encode(dto.password()));
    }
    return userMapper.toDto(entity);
  }

  // 登录
  @Override
  public Optional<UserInfoVO> login(UserLoginDTO dto) {
    Optional<UserEntity> user = userRepository.findByUsername(dto.username());
    if (user.isPresent()) {
      if (passwordEncoder.matches(dto.password(), user.get().getPassword())) {
        return Optional.of(userMapper.toDto(user.get()));
      }
    }
    return Optional.empty();
  }

  // 登出
  @Override
  public boolean logout(String id) {
    // JWT 登出逻辑：
    // 后端不需要清理任何东西
    // 只需要前端删除 localStorage 里的 token
    return true;
  }

  // 删除用户
  @Override
  public boolean deleteById(Long id) {
    UserEntity entity = userRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("用户不存在: " + id));
    entity.setIsDeleted(1);
    userRepository.save(entity);
    return true;
  }
}
