/**
 * ============================================
 * 方法定义：种类、修饰符、调用方式 —— 整理与示例
 * ============================================
 *
 * 【.java 文件按用途分的种类】
 * - 实体/模型类：如 Book.java、User，主要放字段、构造方法、getter/setter，描述「一种数据」。
 * - 演示/入口类：如 ArrayDemo.java、BookDemo.java、Main.java，带 main(String[] args)，用来运行示例。
 * - 工具类（Utils）：如 ArrayUtils.java、JDK 的 Arrays/Math，专门放 public static 方法，类似前端的 utils。
 * - 混合：一个类里既有 static 方法又有实例方法也可以，但工具类通常只放 static 方法。
 *
 * 【方法定义的几种】
 * ┌────────────────┬──────────────────────────────────────────────────────────────────┐
 * │ 种类            │ 说明、写法、调用方式                                                │
 * ├────────────────┼──────────────────────────────────────────────────────────────────┤
 * │ 构造方法        │ 与类同名、无返回类型；只有 new 类名(...) 时由 JVM 调用。不能写 static。  │
 * │ 实例方法        │ 无 static；操作「当前对象」的字段（this.xxx）。必须 对象.方法名(参数) 调用。 │
 * │ 静态方法        │ 有 static；不依赖对象，用 类名.方法名(参数) 调用。可放在工具类里。        │
 * │ 程序入口 main   │ public static void main(String[] args)；运行 java 类名 时 JVM 自动调。   │
 * └────────────────┴──────────────────────────────────────────────────────────────────┘
 *
 * 【常用修饰符】
 * ┌────────────┬────────────┬─────────────────────────────────────────────────────────┐
 * │ 修饰符      │ 用于        │ 含义                                                      │
 * ├────────────┼────────────┼─────────────────────────────────────────────────────────┤
 * │ public     │ 类/方法/字段 │ 任意包都可访问                                             │
 * │ private    │ 方法/字段   │ 仅本类内部可访问（字段常用，封装）                           │
 * │ protected  │ 方法/字段   │ 本类 + 同包 + 子类可访问                                    │
 * │ 不写(默认)  │ 类/方法/字段 │ 仅同包可访问（包私有）                                      │
 * │ static     │ 方法/字段   │ 属于「类」，不需对象即可用 类名.xxx 访问/调用                 │
 * │ final      │ 类/方法/变量 │ 类不可被继承；方法不可被重写；变量只能赋一次                   │
 * └────────────┴────────────┴─────────────────────────────────────────────────────────┘
 *
 * 【静态方法的正确理解】
 * - 属于类的方法 → 用 static 定义，用 类名.方法名(参数) 调用。不用 static 定义会怎样？就变成实例方法，不能写 MethodDemo.xxx()，必须先 new 出对象再 对象.xxx()。
 * - 要访问 this 的 → 不能用 static；不访问 this 的 → 可以（也通常）用 static。
 *
 * 【main 里能再定义方法吗？】
 * - Java 不允许在方法「内部」再定义另一个方法（不像 JS 可以在函数里写子函数）。所有方法都只能定义在「类的顶层」，和 main 平级。
 * - main 里只能「调用」本类里已定义好的方法：static 的用 类名.方法名() 或直接 方法名()；实例的用 对象.方法名()。想复用的逻辑就提到类里单独一个方法，再在 main 里调。
 *
 * 【包（package）与能否直接调用】
 * - 文件头不写 package 时，类在「默认包」里。同一目录下没写 package 的类都在同一默认包，互相可直接用类名调（再配合 public）。
 * - package xxx 表示「把这个类归到 xxx 这个包」；常和文件夹对应，如 package com.example.utils 对应目录 com/example/utils/。
 * - 跨包调用：需要 import 或写全限定名，且被调用的类/方法必须是 public。同包则不需要 import。
 *
 * 运行：javac src/ArrayUtils.java src/MethodDemo.java -d out && java -cp out MethodDemo
 */
public class MethodDemo {

    // ----- 示例：private 字段，仅本类可访问 -----
    private int count;

    /**
     * 【构造方法】无参；new MethodDemo() 时调用。
     */
    public MethodDemo() {
        this.count = 0;
    }

    /**
     * 【实例方法】无 static；必须用 对象.方法名() 调用，内部可访问 this.count。
     */
    public void increment() {
        this.count++;
    }

    /**
     * 【实例方法 + 返回值】
     */
    public int getCount() {
        return count;
    }

    /**
     * 【private 实例方法】仅本类内部可调，外部不能 obj.doInternal()。
     */
    private void doInternal() {
        System.out.println("仅本类可调用的内部方法");
    }

    /**
     * 【静态方法】属于类，用 MethodDemo.staticHelper() 或同包内直接 staticHelper() 调。
     */
    public static int staticHelper(int a, int b) {
        return a + b;
    }

    /**
     * 程序入口。下面的 staticHelper、increment、getCount 等都是定义在「类的顶层」、和 main 平级；
     * main 里只是调用它们，不能在 main 内部再写一个方法。
     */
    public static void main(String[] args) {

        System.out.println("--- 方法种类与修饰符示例 ---");

        // 1. 构造方法：new 时调用
        MethodDemo obj = new MethodDemo();
        System.out.println("构造方法执行后 count=" + obj.getCount());

        // 2. 实例方法：对象.方法名()
        obj.increment();
        obj.increment();
        System.out.println("实例方法 increment 后 count=" + obj.getCount());

        // 3. 静态方法：类名.方法名()，不需要 new
        int sum = MethodDemo.staticHelper(10, 20);
        System.out.println("静态方法 staticHelper(10,20)=" + sum);

        // 4. 工具类里的静态方法（类似前端 utils）。能直接写 ArrayUtils.xxx 是因为：同包（都没写 package）+ findMax/findMin 是 public static。跨包时需 import 或写全限定类名。
        int[] arr = { 3, 1, 4 };
        System.out.println("ArrayUtils.findMax(arr)=" + ArrayUtils.findMax(arr));
        System.out.println("ArrayUtils.findMin(arr)=" + ArrayUtils.findMin(arr));

        System.out.println("--- MethodDemo 结束 ---");
    }
}
