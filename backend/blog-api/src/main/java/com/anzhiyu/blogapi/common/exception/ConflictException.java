package com.anzhiyu.blogapi.common.exception;

/** 冲突（如用户名已注册）→ HTTP 409 + ApiResult code 409 */
public class ConflictException extends BusinessException {

  public ConflictException(String message) {
    super(409, message);
  }
}
