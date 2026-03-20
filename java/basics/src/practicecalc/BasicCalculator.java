/**
 * 计算器接口（与 SimpleCalculator、ScientificCalculator、CalculatorDemo 同属包 practicecalc）
 *
 * 说明：原目录名 11-practice-calculator 以数字开头，不符合 Java 包名规则，IDE 会报大量红错。
 * 现统一放在包 practicecalc 下，运行见 CalculatorDemo 注释。
 */
package practicecalc;

public interface BasicCalculator {

    double add(double a, double b);

    double subtract(double a, double b);

    double multiply(double a, double b);

    double divide(double a, double b);
}
