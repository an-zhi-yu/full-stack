package practicecalc;

/**
 * 实现 BasicCalculator：四则运算；除法里除零抛 IllegalArgumentException。
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
