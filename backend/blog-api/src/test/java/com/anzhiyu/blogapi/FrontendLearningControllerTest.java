package com.anzhiyu.blogapi;

import com.anzhiyu.blogapi.dto.EchoBody;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class FrontendLearningControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void ping() throws Exception {
        mockMvc.perform(get("/api/learn/ping"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").value("pong"));
    }

    @Test
    void configYmlDemo() throws Exception {
        mockMvc.perform(get("/api/learn/config-yml-demo"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.siteName").exists())
                .andExpect(jsonPath("$.data.serverPort").value(8080));
    }

    @Test
    void echoPostJson() throws Exception {
        var body = new EchoBody("张三", "hi");
        mockMvc.perform(post("/api/learn/echo")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(body)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("echo"))
                .andExpect(jsonPath("$.data.name").value("张三"))
                .andExpect(jsonPath("$.data.note").value("hi"));
    }
}
