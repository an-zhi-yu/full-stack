package com.anzhiyu.blogapi;

import com.anzhiyu.blogapi.common.util.JwtUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class HelloControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtUtil jwtUtil;

    private String authHeader() {
        String token = jwtUtil.generateToken("test-user-id", "test-user");
        return "Bearer " + token;
    }

    @Test
    void helloReturnsUnifiedJson() throws Exception {
        mockMvc.perform(get("/api/hello").header("Authorization", authHeader()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(0))
                .andExpect(jsonPath("$.message").value("ok"))
                .andExpect(jsonPath("$.data").value("Hello, Spring Boot 3 + Java 17!"));
    }

    @Test
    void healthReturnsUnifiedJson() throws Exception {
        mockMvc.perform(get("/api/health").header("Authorization", authHeader()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(0))
                .andExpect(jsonPath("$.data.status").value("UP"));
    }
}
