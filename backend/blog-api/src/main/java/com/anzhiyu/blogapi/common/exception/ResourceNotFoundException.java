package com.anzhiyu.blogapi.common.exception;

/** 资源不存在 → HTTP 404 + ApiResult code 404 */
public class ResourceNotFoundException extends BusinessException {

  public ResourceNotFoundException(String message) {
    super(404, message);
  }
}
