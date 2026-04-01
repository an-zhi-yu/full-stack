package com.anzhiyu.blogapi;

import com.anzhiyu.blogapi.common.util.JwtUtil;
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

    @Autowired
    private JwtUtil jwtUtil;

    private String authHeader() {
        // 测试用的假用户，uid/username 随便填即可
        String token = jwtUtil.generateToken("test-user-id", "test-user");
        return "Bearer " + token;
    }

    @Test
    void listPosts() throws Exception {
        mockMvc.perform(get("/api/v1/posts").header("Authorization", authHeader()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data.length()").value(19));
    }

    @Test
    void listPostsByCategory() throws Exception {
        mockMvc.perform(get("/api/v1/posts").param("categorySlug", "java").header("Authorization", authHeader()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(19));
    }

    @Test
    void getPostDetail() throws Exception {
        mockMvc.perform(get("/api/v1/posts/java-spring-boot-blog-api").header("Authorization", authHeader()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.title").exists())
                .andExpect(jsonPath("$.data.content").isArray());
    }

    @Test
    void getPostNotFound() throws Exception {
        mockMvc.perform(get("/api/v1/posts/no-such-id").header("Authorization", authHeader()))
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
                        .header("Authorization", authHeader())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString();
        String id = objectMapper.readTree(createdJson).path("data").path("id").asText();

        mockMvc.perform(put("/api/v1/posts/" + id)
                        .header("Authorization", authHeader())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk());

        mockMvc.perform(delete("/api/v1/posts/" + id)
                        .header("Authorization", authHeader()))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/v1/posts/" + id)
                        .header("Authorization", authHeader()))
                .andExpect(status().isNotFound());
    }
}
