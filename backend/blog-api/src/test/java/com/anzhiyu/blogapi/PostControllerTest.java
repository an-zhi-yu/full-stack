package com.anzhiyu.blogapi;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class PostControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void listPosts() throws Exception {
        mockMvc.perform(get("/api/v1/posts"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data.length()").value(19));
    }

    @Test
    void listPostsByCategory() throws Exception {
        mockMvc.perform(get("/api/v1/posts").param("categorySlug", "java"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(19));
    }

    @Test
    void getPostDetail() throws Exception {
        mockMvc.perform(get("/api/v1/posts/java-spring-boot-blog-api"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.title").exists())
                .andExpect(jsonPath("$.data.content").isArray());
    }

    @Test
    void getPostNotFound() throws Exception {
        mockMvc.perform(get("/api/v1/posts/no-such-id"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value(404));
    }

    @Test
    void createUpdateDelete() throws Exception {
        var body = Map.of(
                "title", "测试文章",
                "subtitle", "副标题",
                "category", "Java 后端",
                "categorySlug", "java",
                "tags", List.of("测试"),
                "date", "2026-03-25",
                "readTime", 3,
                "pinned", false,
                "content", JsonNodeFactory.instance.arrayNode()
                        .add(JsonNodeFactory.instance.objectNode().put("type", "paragraph").put("text", "hi"))
        );
        String json = objectMapper.writeValueAsString(body);

        String createdJson = mockMvc.perform(post("/api/v1/posts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString();
        String id = objectMapper.readTree(createdJson).path("data").path("id").asText();

        mockMvc.perform(put("/api/v1/posts/" + id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk());

        mockMvc.perform(delete("/api/v1/posts/" + id))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/v1/posts/" + id))
                .andExpect(status().isNotFound());
    }
}
