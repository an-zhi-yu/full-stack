/**
 * 在 Run 里调用 Main 的入口方法 main。
 *
 * 传参的两种方式（本质都是给 Main.main(String[] args) 传一个字符串数组）：
 *
 * 1) 命令行传参：你执行 java -cp out Run 你好 世界 时，JVM 会把 "你好""世界" 放进 Run.main 的 args，
 *    你再把 args 原样传给 Main.main(args)。参数来源 = 用户在终端里输入的。
 *
 * 2) 在方法里传参：在代码里自己 new String[]{"你好", "世界"}，再调用 Main.main(...)。参数来源 = 代码写死的。
 *
 * 用法：
 * - 编译：javac src/Main.java src/Run.java -d out
 * - 运行 Run（不传参）：java -cp out Run
 * - 运行 Run 并传参：java -cp out Run 你好 世界  （需用方式一，见下）
 * - 直接运行 Main 并传参：java -cp out Main 你好 世界
 */
public class Run {
    public static void main(String[] args) {
        // 方式一：用命令行传来的参数（运行 java -cp out Run 你好 世界 时生效）
        Main.main(args);

        // 方式二：不用命令行，在代码里写死参数（适合在 IDE 里点运行时看到固定输出）
        // Main.main(new String[] { "你好", "世界" });
    }
}
