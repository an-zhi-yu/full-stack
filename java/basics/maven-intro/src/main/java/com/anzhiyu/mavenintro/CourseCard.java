package com.anzhiyu.mavenintro;

/**
 * 给 Gson 做演示用的「普通 Java 对象」（POJO）。
 *
 * Gson 会把 JSON 字段名和这里的 **字段名** 对应起来（默认规则）。
 * 无参构造：反序列化（JSON → 对象）时 Gson 需要能创建实例。
 */
public class CourseCard {

    public String title;
    public int lessonCount;

    public CourseCard() {
    }

    public CourseCard(String title, int lessonCount) {
        this.title = title;
        this.lessonCount = lessonCount;
    }

    @Override
    public String toString() {
        return "CourseCard{title='" + title + "', lessonCount=" + lessonCount + "}";
    }
}
