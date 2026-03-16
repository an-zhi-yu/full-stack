/**
 * ============================================
 * 练习：字符串拼接、截取、判断
 * ============================================
 *
 * 对应文章：Java 字符串 API 全解析（String 常用方法、StringBuilder）
 * 本类只做三件事：拼接、截取、判断，便于单独练习。
 *
 * 运行：javac src/05-string/StringPractice.java -d out && java -cp out StringPractice
 */
public class StringPractice {

    public static void main(String[] args) {

        // ---------- 1. 拼接 ----------
        String a = "Hello";
        String b = "World";
        String concatPlus = a + ", " + b;                    // + 拼接（少量可用）
        String concatJoin = String.join(" | ", a, b, "Java"); // join 拼接多个
        StringBuilder sb = new StringBuilder();
        sb.append(a).append(", ").append(b);                 // 大量拼接用 StringBuilder
        String fromSb = sb.toString();

        System.out.println("拼接 + : " + concatPlus);
        System.out.println("join : " + concatJoin);
        System.out.println("StringBuilder: " + fromSb);

        // ---------- 2. 截取 ----------
        String s = "Hello, Java!";
        String sub1 = s.substring(0, 5);   // [0,5) → "Hello"
        String sub2 = s.substring(7);       // 从 7 到末尾 → "Java!"
        System.out.println("截取 [0,5): " + sub1);
        System.out.println("截取 7 到末尾: " + sub2);

        // ---------- 3. 判断 ----------
        boolean hasJava = s.contains("Java");
        boolean start = s.startsWith("Hello");
        boolean end = s.endsWith("!");
        boolean eq = s.equals("Hello, Java!");
        boolean empty = "".isEmpty();

        System.out.println("包含 Java? " + hasJava);
        System.out.println("以 Hello 开头? " + start);
        System.out.println("以 ! 结尾? " + end);
        System.out.println("等于 \"Hello, Java!\"? " + eq);
    }
}
