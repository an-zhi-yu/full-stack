/**
 * ============================================
 * 科学计算器：继承 SimpleCalculator，并增加更多运算
 * ============================================
 *
 * 【继承在这里的作用】
 * 已经有的加减乘除不用再写一遍，extends SimpleCalculator 就都有了；
 * 再在本类里增加「只有科学计算器才有的」方法：开方、幂。
 *
 * 【类 + 继承 + 接口 都齐了】
 * - 接口：BasicCalculator（约定四则运算）
 * - 实现类：SimpleCalculator implements BasicCalculator
 * - 子类：ScientificCalculator extends SimpleCalculator，同时「自然」也符合 BasicCalculator 约定
 */
public class ScientificCalculator extends SimpleCalculator {

    /** 开方 */
    public double sqrt(double a) {
        if (a < 0) {
            throw new IllegalArgumentException("不能对负数开方");
        }
        return Math.sqrt(a);
    }

    /** 幂：a 的 b 次方 */
    public double pow(double a, double b) {
        return Math.pow(a, b);
    }
}
