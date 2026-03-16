/**
 * ============================================
 * 计算器「约定」：接口 BasicCalculator
 * ============================================
 *
 * 【接口在这里的作用】
 * 只规定「计算器能做什么」：加减乘除四个方法，每个都是 (double a, double b) -> double。
 * 不关心具体怎么算（用 int 还是 double、是否除零检查），由实现类去写。
 *
 * 【为什么用 double？】
 * 除法 3/2 用 int 会得到 1；用 double 得到 1.5，更符合计算器直觉。
 */
public interface BasicCalculator {

    double add(double a, double b);

    double subtract(double a, double b);

    double multiply(double a, double b);

    /**
     * 除法：接口只声明「有这个方法」，除零等细节在实现类里处理。
     */
    double divide(double a, double b);
}
