/**
 * ============================================
 * 集合：HashMap 增删改查
 * ============================================
 *
 * 【HashMap 是什么？】
 * 键值对（key-value）容器：根据 key 快速找到 value。如：学号 -> 姓名、单词 -> 释义。
 *
 * 【增删改查】
 * 增/改：put(key, value)  若 key 已存在则覆盖
 * 删：remove(key)
 * 查：get(key)、containsKey(key)、containsValue(value)、size()
 *
 * 运行：javac src/12-collections/HashMapDemo.java -d out && java -cp out HashMapDemo
 */
import java.util.HashMap;
import java.util.Map;

public class HashMapDemo {

    public static void main(String[] args) {

        Map<String, Integer> scores = new HashMap<>();
        // 增
        scores.put("张三", 85);
        scores.put("李四", 92);
        scores.put("王五", 78);
        System.out.println("初始: " + scores);

        // 查
        Integer li = scores.get("李四");
        System.out.println("李四分数: " + li);
        System.out.println("是否有王五? " + scores.containsKey("王五"));

        // 改（用 put 覆盖）
        scores.put("王五", 88);
        System.out.println("改后: " + scores);

        // 删
        scores.remove("张三");
        System.out.println("删张三后: " + scores);
        System.out.println("条数: " + scores.size());
    }
}
