package practicecalc;

/** 在 SimpleCalculator 基础上增加 sqrt、pow。 */
public class ScientificCalculator extends SimpleCalculator {

    public double sqrt(double a) {
        if (a < 0) {
            throw new IllegalArgumentException("不能对负数开方");
        }
        return Math.sqrt(a);
    }

    public double pow(double a, double b) {
        return Math.pow(a, b);
    }
}
