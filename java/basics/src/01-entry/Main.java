/**
 * ============================================
 * 新手向：Java Hello World 逐行注释
 * ============================================
 *
 * 这个文件里每一行「为什么这样写」都会在下面用注释说明。
 * 先记住：Java 程序必须有一个「入口」——也就是程序从哪儿开始执行。
 * 这个入口就是 main 方法。没有 main，程序就不知道从哪跑起。
 */

/*
 * 【为什么要用 public？】
 * public 是「访问修饰符」，表示「公开的、谁都能访问」。
 * - 如果类不是 public，Java 运行时会找不到程序的入口（main 在类里），所以能作为程序入口的类一般要写成 public。
 * - 另外，文件名必须和这个 public 类的名字完全一致，所以这个文件叫 Main.java。
 * 简单记：写主程序的类用 public，这样 JVM（Java 虚拟机）才能从外面找到并运行它。
 */
public class Main {

    /*
     * 【程序的入口：main 方法】
     * 下面这一行是 Java 规定的「程序入口」的固定写法，少一个词、换一个词都不行。
     * 你暂时可以把它背下来，以后写每个可运行的 Java 程序都会用到。
     */

    /*
     * 【为什么是 public？】
     * main 必须能被 JVM 从「类的外面」调用，所以要用 public，否则 JVM 找不到入口。
     */

    /*
     * 【为什么是 static？】
     * 可以这样理解：
     * - 普通方法要「先有一个对象」才能调用，例如：Main m = new Main(); m.某个方法();
     * - 程序刚启动时，还没有任何对象，JVM 没法先 new Main() 再调方法。
     * 所以入口方法必须标成 static，表示「属于类本身」，不需要先创建对象，直接通过类名就能执行。
     * 简单记：程序入口必须是 static，因为一启动就要跑，还没对象可用。
     */

    /*
     * 【为什么是 void？】
     * void 表示「这个方法不返回任何值」。
     * main 是给 JVM 调用的，JVM 不指望你返回一个数或字符串，所以约定写成 void。
     */

    /*
     * 【(String[] args) 是什么？为什么没用到也要写？】
     * - args 是「命令行参数」：在终端里写 java Main 你好 世界 时，"你好""世界" 会传进 args。
     * - String[] 表示字符串数组，args[0] 是第一个参数，args[1] 是第二个，args.length 是个数。
     * - Java 规定：程序入口必须且只能写成 main(String[] args)，这样 JVM 才能认出这是入口。
     * 所以即使你现在不用参数，也必须写这个签名，否则就不是合法的 main。
     *
     * 【怎么用这个参数？】下面用注释写了一个例子，取消注释后，在终端运行：
     * javac src/Main.java -d out && java -cp out Main 你好 世界
     * 会先打印 Hello, World! 再打印你传入的两个参数。
     */
    public static void main(String[] args) {

        /*
         * 【System.out.println 是什么？】
         * - System：Java 自带的「系统」类，和你的电脑环境、标准输入输出有关。
         * - out：System 里的一个静态成员，代表「标准输出」，通常就是你运行程序时看到的终端/控制台。
         * - println：print line 的缩写，表示「打印一行」，会在末尾自动换行。
         *
         * 合起来：把 "Hello, World!" 这串文字打印到控制台，并换行。
         * 这是学任何语言时最经典的「第一行输出」。
         *
         * 【重要】如果你在 Cursor 里看到括号里显示成 x: "Hello, World!"，那个 x: 是 IDE 的
         * 「参数提示」，不是 Java 语法！你写的代码里不要加 x:，只写 "Hello, World!" 即可。
         */
        System.out.println("Hello, World!");

        // 使用 args 的示例：有参数时逐个打印
        if (args.length > 0) {
            for (int i = 0; i < args.length; i++) {
                System.out.println("参数 " + (i + 1) + ": " + args[i]);
            }
        }
    }
}
