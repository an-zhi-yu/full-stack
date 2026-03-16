/**
 * ============================================
 * 异常：try-catch 捕获、throws 声明、throw 抛出
 * ============================================
 *
 * 【异常是什么？】
 * 程序运行时的错误（如除零、数组越界、数字格式错误）。不处理会直接崩溃；用 try-catch 可以「抓住」异常并处理，程序继续跑。
 *
 * 【try-catch】
 * 把可能出错的代码放在 try { } 里；出错时跳到对应的 catch (异常类型 e) { } 里处理。
 *
 * 【throws】
 * 在方法签名上写 throws XxxException，表示「这个方法可能抛出这种异常，谁调用谁负责处理（或继续 throws）」。
 *
 * 【throw】
 * 主动抛出一个异常：throw new IllegalArgumentException("错误信息");
 *
 * 运行：javac src/13-exception/ExceptionDemo.java -d out && java -cp out ExceptionDemo
 */
public class ExceptionDemo {

    public static void main(String[] args) {
        // ----- 1. 会抛异常的代码：用 try-catch 捕获 -----
        try {
            int n = Integer.parseInt("abc");  // 数字格式错误，抛 NumberFormatException
            System.out.println(n);
        } catch (NumberFormatException e) {
            System.out.println("捕获到异常: " + e.getMessage());
        }

        try {
            int a = 10 / 0;  // 除零，抛 ArithmeticException
        } catch (ArithmeticException e) {
            System.out.println("除零异常: " + e.getMessage());
        }

        // ----- 2. 调用「会 throws 异常」的方法 -----
        try {
            setScore(105);  // 我们约定 0~100，105 会抛异常
        } catch (IllegalArgumentException e) {
            System.out.println("setScore 异常: " + e.getMessage());
        }

        // ----- 3. 捕获后程序继续执行 -----
        System.out.println("--- 程序正常结束 ---");
    }

    /**
     * throws 表示：本方法可能抛出 IllegalArgumentException，调用者必须 try-catch 或继续 throws。
     */
    public static void setScore(int score) throws IllegalArgumentException {
        if (score < 0 || score > 100) {
            throw new IllegalArgumentException("分数必须在 0~100 之间，当前: " + score);
        }
        System.out.println("分数已设为: " + score);
    }
}
