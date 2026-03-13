/**
 * ============================================
 * 分类：数值（Number / Math）常用 API
 * ============================================
 *
 * 基本类型 int/double 等没有方法，用包装类 Integer、Double 或 Math 工具类。
 * 运行：javac src/NumberDemo.java -d out && java -cp out NumberDemo
 */
public class NumberDemo {

    public static void main(String[] args) {

        // ==================== 一、字符串与数值互转 ====================
        String numStr = "42";
        int n = Integer.parseInt(numStr); // 字符串 → int
        double d = Double.parseDouble("3.14"); // 字符串 → double
        long l = Long.parseLong("100");

        String back = String.valueOf(n); // int → 字符串；也可 "" + n
        String back2 = Integer.toString(100); // 同上

        System.out.println("--- 解析与转回 ---");
        System.out.println("Integer.parseInt(\"42\") = " + n);
        System.out.println("Double.parseDouble(\"3.14\") = " + d);

        // ==================== 二、Math 常用方法 ====================
        int max = Math.max(10, 20);
        int min = Math.min(10, 20);
        int abs = Math.abs(-5);
        long round = Math.round(3.6); // 四舍五入，返回 long
        double floor = Math.floor(3.8); // 向下取整 3.0
        double ceil = Math.ceil(3.2); // 向上取整 4.0
        double pow = Math.pow(2, 10); // 2^10
        double sqrt = Math.sqrt(16); // 平方根
        double random = Math.random(); // [0.0, 1.0) 随机数

        System.out.println("--- Math ---");
        System.out.println("max(10,20) = " + max + ", abs(-5) = " + abs);
        System.out.println("round(3.6) = " + round + ", pow(2,10) = " + (int) pow);

        // ==================== 三、包装类 Integer / Double 的常用方法 ====================
        Integer obj = Integer.valueOf(100); // 基本类型 → 包装类
        int unbox = obj.intValue(); // 包装类 → 基本类型（拆箱）
        int compare = Integer.compare(2, 1); // 比较，<0（-1） =0（0） >0（1）

        System.out.println("Integer.valueOf(100) = " + obj);
        System.out.println("Integer.compare(2, 1) = " + compare);
        System.out.println("--- NumberDemo 结束 ---");
    }
}
