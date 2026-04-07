package com.anzhiyu.blogapi.model.common;

import com.anzhiyu.blogapi.enums.PostContentType;
import java.util.List;

/**
 * 文章内容块 VO
 * 对应富文本编辑器的一个内容块（标题、段落、代码、列表等）
 * 
 */
public record PostContent(

    /**
     * 内容块类型（必填）
     * 因为record的括号参数相当于在class内部定义字段 ，所以括号里的参数可以直接用内部定义的枚举Type。
     * 枚举：heading | paragraph | code | list | tip | warning | table | divider
     */
    PostContentType type,

    /**
     * 标题级别（仅对 heading 有效：1-6）
     */
    Integer level,

    /**
     * 文本内容（大部分块都用这个字段）
     */
    String text,

    /**
     * 是否有序列表（仅对 list 有效：true=有序，false=无序）
     */
    Boolean ordered,

    /**
     * 锚点 ID（用于标题跳转、目录导航）
     */
    String anchor,

    /**
     * 列表项数组（仅对 list 有效）
     */
    List<String> items,

    /**
     * 提示框标题（仅对 tip / warning 有效）
     */
    String title) {
}