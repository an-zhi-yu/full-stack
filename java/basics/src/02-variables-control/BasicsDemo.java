/**
 * ============================================
 * Java 基础：变量、数据类型、if/else、for、while
 * ============================================
 *
 * 数组与 Stream 见：ArrayDemo.java
 * 运行：javac src/BasicsDemo.java -d out && java -cp out BasicsDemo
 */
public class BasicsDemo {

    public static void main(String[] args) {

        // ==================== 一、变量 ====================
        /*
         * 【变量】就是「有名字的一块内存」，用来存数据，后面可以改。
         * 定义格式：数据类型 变量名 = 值;
         * 也可以先定义再赋值：数据类型 变量名; 变量名 = 值;
         */
        int age = 18;           // 定义一个整型变量 age，初始值 18
        double price;           // 只定义，不赋值（后面再赋值）
        price = 99.5;           // 赋值

        // ==================== 二、数据类型 ====================

        // ----- 2.1 基本类型（存的是「值」本身，类似前端的 number/boolean） -----

        // 整数
        byte b = 127;           // 字节，-128～127
        short s = 30000;        // 短整型
        int i = 2_000_000_000;  // 整型（常用），下划线只是方便读，不影响值
        long l = 9_000_000_000L; // 长整型，数字后加 L 表示 long

        // 小数
        float f = 3.14f;        // 单精度，数字后加 f
        double d = 3.1415926;    // 双精度（常用），默认小数就是 double

        // 布尔：只有 true / false，没有 JS 里 0、""、null 当假的说法
        boolean ok = true;
        boolean fail = false;

        // 字符：单个字符，单引号
        char c = 'A';
        char ch = '中';

        // ----- 2.2 引用类型（存的是「对象的引用」，类似前端的 object/array） -----

        // 字符串：双引号，String 是类，所以 S 大写
        String name = "张三";

        // 数组：声明并同时赋初值时，可以省略 new 类型[]，直接写 { 元素1, 元素2 }
        int[] numbers = new int[] { 10, 20, 30 };
        String[] words = { "你好", "世界" };   // 等价于 new String[] { "你好", "世界" }，简写只在「声明+初始化」时可用
        int[] arr = { 1, 2, 3 };
        // 注意：这种简写只能用在「定义变量并赋初值」的地方。传参、赋值给已有变量等必须写 new String[] { ... }
        // 例如：Main.main(new String[] { "你好", "世界" });  不能写成 Main.main({ "你好", "世界" });

        System.out.println("--- 变量与类型 ---");
        System.out.println("age=" + age + " price=" + price);
        System.out.println("name=" + name + " numbers[0]=" + numbers[0]);

        // ==================== 三、if / else ====================
        /*
         * 和前端一样：if (条件) { ... } else if (条件) { ... } else { ... }
         * 条件必须是 boolean，不能写 if (1) 或 if ("")，会报错。
         */
        int score = 85;
        if (score >= 90) {
            System.out.println("优秀");
        } else if (score >= 60) {
            System.out.println("及格");
        } else {
            System.out.println("不及格");
        }

        // 单行可以省略大括号（不推荐，容易出错）
        if (score > 80) System.out.println("分数大于 80");

        // ==================== 四、for 循环 ====================

        // ----- 4.1 普通 for：和前端 for (let i=0; i<3; i++) 类似 -----
        System.out.println("--- for 循环 ---");
        for (int idx = 0; idx < 3; idx++) {
            System.out.println("idx = " + idx);
        }

        // 遍历数组
        for (int j = 0; j < numbers.length; j++) {
            System.out.println("numbers[" + j + "] = " + numbers[j]);
        }

        // ----- 4.2 增强 for（for-each）：类似前端的 for (const x of arr) -----
        for (int num : numbers) {
            System.out.println("元素: " + num);
        }
        for (String w : words) {
            System.out.println("单词: " + w);
        }

        // ==================== 五、while 循环 ====================

        // ----- 5.1 while：先判断条件，再执行 -----
        System.out.println("--- while ---");
        int n = 0;
        while (n < 3) {
            System.out.println("n = " + n);
            n++;
        }

        // ----- 5.2 do-while：先执行一次，再判断条件 -----
        int m = 0;
        do {
            System.out.println("m = " + m);
            m++;
        } while (m < 3);

        System.out.println("--- BasicsDemo 结束 ---");
    }
}
