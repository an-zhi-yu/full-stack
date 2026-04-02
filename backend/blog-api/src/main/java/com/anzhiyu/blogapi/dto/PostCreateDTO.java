package com.anzhiyu.blogapi.dto;

import java.util.List;

import com.anzhiyu.blogapi.vo.PostContentBlockVO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PostCreateDTO(
    @NotBlank(message = "title 不能为空") String title,
    String subtitle,
    String category,
    String categorySlug,
    List<String> tags,
    @NotNull(message = "content 不能为 null") List<PostContentBlockVO> content) {
}
