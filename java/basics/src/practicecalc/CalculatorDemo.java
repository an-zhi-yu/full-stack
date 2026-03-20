/**
 * 运行（在 basics 目录下）：
 *   javac -d out src/practicecalc/*.java
 *   java -cp out practicecalc.CalculatorDemo
 */
package practicecalc;

public class CalculatorDemo {

    public static void main(String[] args) {

        BasicCalculator calc = new SimpleCalculator();
        System.out.println("3 + 2 = " + calc.add(3, 2));
        System.out.println("3 - 2 = " + calc.subtract(3, 2));
        System.out.println("3 * 2 = " + calc.multiply(3, 2));
        System.out.println("3 / 2 = " + calc.divide(3, 2));

        ScientificCalculator sci = new ScientificCalculator();
        System.out.println("sqrt(4) = " + sci.sqrt(4));
        System.out.println("2^10 = " + sci.pow(2, 10));
        System.out.println("1.5 + 2.5 = " + sci.add(1.5, 2.5));
    }
}
