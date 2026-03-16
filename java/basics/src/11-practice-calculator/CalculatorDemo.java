/**
 * ============================================
 * 计算器演示：接口类型引用、多态、继承
 * ============================================
 *
 * 运行（在 basics 目录下）：
 *   javac src/11-practice-calculator/BasicCalculator.java \
 *         src/11-practice-calculator/SimpleCalculator.java \
 *         src/11-practice-calculator/ScientificCalculator.java \
 *         src/11-practice-calculator/CalculatorDemo.java -d out
 *   java -cp out CalculatorDemo
 */
public class CalculatorDemo {

    public static void main(String[] args) {

        // ----- 用「接口类型」引用实现类（多态） -----
        BasicCalculator calc = new SimpleCalculator();
        System.out.println("3 + 2 = " + calc.add(3, 2));       // 5.0
        System.out.println("3 - 2 = " + calc.subtract(3, 2));  // 1.0
        System.out.println("3 * 2 = " + calc.multiply(3, 2));  // 6.0
        System.out.println("3 / 2 = " + calc.divide(3, 2));   // 1.5

        // ----- 子类：科学计算器，既有四则也有 sqrt、pow -----
        ScientificCalculator sci = new ScientificCalculator();
        System.out.println("sqrt(4) = " + sci.sqrt(4));        // 2.0
        System.out.println("2^10 = " + sci.pow(2, 10));        // 1024.0
        // 继承来的四则运算也能用
        System.out.println("1.5 + 2.5 = " + sci.add(1.5, 2.5)); // 4.0
    }
}
