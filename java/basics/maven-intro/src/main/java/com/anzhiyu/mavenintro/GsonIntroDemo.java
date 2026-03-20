package com.anzhiyu.mavenintro;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Gson 依赖演示：JSON 字符串 ↔ Java 对象
 *
 * 【这个类为什么能 import com.google.gson？】
 * 因为 pom.xml 里声明了 Gson 的「坐标」，Maven 会从远程仓库下载 jar 到本机 ~/.m2/repository/，
 * 编译时把该 jar 放进 classpath，所以编译器能找到 Gson 类。
 *
 * 【和前端对比】
 * 类似 JSON.parse / JSON.stringify，但 Gson 能把 JSON 映射成 **强类型** 的 Java 对象。
 */
public final class GsonIntroDemo {

    private GsonIntroDemo() {
    }

    static void run() {
        System.out.println();
        System.out.println("========== Gson 依赖演示（Maven 已下载坐标对应的 jar）==========");

        Gson gson = new GsonBuilder().setPrettyPrinting().create();

        // 1) JSON 字符串 → Java 对象（类似 JSON.parse，但得到的是 CourseCard 类型）
        String jsonFromApi = """
            {
              "title": "Java 与 Maven 入门",
              "lessonCount": 12
            }
            """;
        CourseCard parsed = gson.fromJson(jsonFromApi, CourseCard.class);
        System.out.println("① 反序列化 fromJson → " + parsed);

        // 2) Java 对象 → JSON 字符串（类似 JSON.stringify）
        CourseCard card = new CourseCard("Spring Boot 基础", 8);
        String jsonOut = gson.toJson(card);
        System.out.println("② 序列化 toJson →");
        System.out.println(jsonOut);
        System.out.println("==============================================================");
    }
}
