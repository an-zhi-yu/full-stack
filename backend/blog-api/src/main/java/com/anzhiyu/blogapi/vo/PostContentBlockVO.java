package com.anzhiyu.blogapi.vo;

import java.util.List;

public record PostContentBlockVo(
    String type, // 类型 heading, paragraph, code, list, tip, warning, table, divider
    Integer level, // 标题级别
    String text, // 文本
    Boolean ordered, // 有序列表
    String anchor, // 锚点
    List<String> items, // 列表项
    String title // 提示框标题
) {
}
