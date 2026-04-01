package com.anzhiyu.blogapi.common.util;

import java.beans.PropertyDescriptor;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;

public class BeanUtil {
  /**
   * 只复制非 null 的属性
   * 
   * @param source 源（request）
   * @param target 目标（旧对象）
   */
  public static void copyNonNullProperties(Object source, Object target) {
    BeanUtils.copyProperties(source, target, getNullPropertyNames(source));
  }

  /**
   * 获取所有值为 null 的属性名
   */
  public static String[] getNullPropertyNames(Object source) {
    BeanWrapper wrapper = new BeanWrapperImpl(source);
    List<String> nullNames = new ArrayList<>();

    for (PropertyDescriptor pd : wrapper.getPropertyDescriptors()) {
      if (wrapper.getPropertyValue(pd.getName()) == null) {
        nullNames.add(pd.getName());
      }
    }
    return nullNames.toArray(new String[0]);
  }
}
