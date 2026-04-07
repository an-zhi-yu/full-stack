package com.anzhiyu.blogapi.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum PostContentType {

  HEADING("heading"),
  PARAGRAPH("paragraph"),
  CODE("code"),
  LIST("list"),
  TIP("tip"),
  WARNING("warning"),
  TABLE("table"),
  DIVIDER("divider");

  private final String value;

  PostContentType(String value) {
    this.value = value;
  }

  @JsonValue
  public String getValue() {
    return value;
  }
}