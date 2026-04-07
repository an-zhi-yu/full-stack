package com.anzhiyu.blogapi.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import com.anzhiyu.blogapi.model.entity.PostEntity;
import com.anzhiyu.blogapi.model.vo.PostDetailVO;
import com.anzhiyu.blogapi.model.vo.PostListVO;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PostMapper {
  PostListVO toListVO(PostEntity entity);

  PostDetailVO toDetailVO(PostEntity entity);

}
