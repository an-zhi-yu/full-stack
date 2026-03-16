/**
 * ============================================
 * 简单计算器：实现 BasicCalculator 接口
 * ============================================
 *
 * 你最初的想法「一个类，有加减乘除四个方法」完全正确；
 * 这里只是把这四个方法提到「接口」里做约定，本类用 implements 实现它们。
 * 多变量、0-9 等：先做成「两数 + 一个运算」就够用，多步运算就多次调用。
 */
public class SimpleCalculator implements BasicCalculator {

    @Override
    public double add(double a, double b) {
        return a + b;
    }

    @Override
    public double subtract(double a, double b) {
        return a - b;
    }

    @Override
    public double multiply(double a, double b) {
        return a * b;
    }

    @Override
    public double divide(double a, double b) {
        if (b == 0) {
            throw new IllegalArgumentException("除数不能为 0");
        }
        return a / b;
    }
}
