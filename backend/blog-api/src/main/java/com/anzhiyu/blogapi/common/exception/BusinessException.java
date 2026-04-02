package com.anzhiyu.blogapi.common.exception;

/**
 * 业务异常基类：携带与 {@link com.anzhiyu.blogapi.common.ApiResult#code()} 对齐的业务码，
 * 由 {@link com.anzhiyu.blogapi.config.ApiExceptionHandler} 映射为 HTTP 状态。
 */
public class BusinessException extends RuntimeException {

  private final int apiCode;

  public BusinessException(int apiCode, String message) {
    super(message);
    this.apiCode = apiCode;
  }

  public int getApiCode() {
    return apiCode;
  }
}
