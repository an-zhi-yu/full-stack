/**
 * ============================================
 * 分类：字符串（String）常用 API
 * ============================================
 *
 * String 是不可变的，每次「修改」都会产生新字符串。大量拼接用 StringBuilder。
 * 运行：javac src/StringDemo.java -d out && java -cp out StringDemo
 */
import java.util.Arrays;

public class StringDemo {

    public static void main(String[] args) {

        // ==================== 一、创建与长度 ====================
        String s = "Hello, 世界";
        String s2 = new String("也可以 new，但通常直接双引号");  // 一般用字面量即可

        int len = s.length();   // 字符个数（不是字节数，中文也算 1）
        boolean empty = s.isEmpty();  // 是否 ""

        System.out.println("--- 字符串基础 ---");
        System.out.println("s = " + s + ", length = " + len);

        // ==================== 二、取子串与字符 ====================
        char c = s.charAt(0);              // 第 0 个字符 'H'
        String sub = s.substring(1, 5);   // [1,5) → "ello"
        String from3 = s.substring(3);     // 从下标 3 到末尾

        System.out.println("charAt(0) = " + c);
        System.out.println("substring(1,5) = " + sub);
        System.out.println("substring(3) = " + from3);

        // ==================== 三、查找与替换 ====================
        int idx = s.indexOf("ell");       // 首次出现下标，没有则 -1
        int idx2 = s.indexOf('o');        // 字符也可以
        int last = s.lastIndexOf("l");    // 最后一次出现
        boolean contains = s.contains("世界");
        boolean starts = s.startsWith("Hello");
        boolean ends = s.endsWith("界");

        String replaced = s.replace("Hello", "Hi");   // 替换（全部），得到新串
        String replacedFirst = s.replaceFirst("l", "L"); // 只替换第一个匹配

        System.out.println("indexOf(\"ell\") = " + idx);
        System.out.println("contains(\"世界\") = " + contains);
        System.out.println("replace(Hello, Hi) = " + replaced);

        // ==================== 四、大小写与空白 ====================
        String upper = s.toUpperCase();
        String lower = s.toLowerCase();
        String trimmed = "  ab c  ".trim();   // 去掉首尾空白

        System.out.println("toUpperCase = " + upper);
        System.out.println("trim \"  ab c  \" = \"" + trimmed + "\"");

        // ==================== 五、分割与拼接 ====================
        String line = "a,b,c";
        String[] parts = line.split(",");     // 按逗号分割成字符串数组
        String joined = String.join("-", "A", "B", "C");  // 用 "-" 拼接多个字符串
        String joinedArr = String.join(" ", parts);       // 数组也可

        System.out.println("split(\",\") = " + Arrays.toString(parts));
        System.out.println("String.join(\"-\", A,B,C) = " + joined);

        // ==================== 六、比较与格式化 ====================
        boolean eq = s.equals("Hello, 世界");   // 内容相等，不要用 ==
        boolean eqIgnore = s.equalsIgnoreCase("hello, 世界");
        int cmp = s.compareTo("Hi");           // 字典序比较，<0 =0 >0

        String formatted = String.format("名字: %s, 年龄: %d", "张三", 18);  // %s 字符串 %d 整数 %f 小数
        System.out.println("String.format: " + formatted);

        // ==================== 七、StringBuilder（大量拼接时用） ====================
        StringBuilder sb = new StringBuilder();
        sb.append("Hello");
        sb.append(", ");
        sb.append("World");
        sb.insert(5, "!!");       // 在下标 5 处插入
        sb.delete(5, 7);         // 删除 [5,7)
        String result = sb.toString();
        System.out.println("StringBuilder result: " + result);

        System.out.println("--- StringDemo 结束 ---");
    }
}
