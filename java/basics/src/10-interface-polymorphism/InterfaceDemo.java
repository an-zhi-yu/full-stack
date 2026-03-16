/**
 * ============================================
 * 接口 + 多态 演示：Shape、Circle、Rectangle
 * ============================================
 *
 * 【本类在练什么？】
 * 1. 用「接口类型」的变量引用不同的实现类对象（Circle、Rectangle）。
 * 2. 调用同一个方法（describe()、getEdgeCount()），运行时执行的是各自实现类里的逻辑 → 多态。
 *
 * 运行：先编译接口和两个实现类，再运行本类
 *   javac src/Shape.java src/Circle.java src/Rectangle.java src/InterfaceDemo.java -d out
 *   java -cp out InterfaceDemo
 */
public class InterfaceDemo {

    public static void main(String[] args) {

        // ----- 1. 接口类型的变量指向第一个实现类：Circle -----
        Shape s1 = new Circle(3.0);
        // 左边 Shape 是「接口类型」，右边 new Circle 是「实现类对象」。
        // 编译时：编译器只关心 Shape 里有没有 describe()、getEdgeCount()，有就可以调。
        // 运行时：s1 实际是 Circle，所以调 describe() 会执行 Circle 里的实现，返回 "圆形"。

        System.out.println("s1 (实际是 Circle): " + s1.describe() + ", 边数=" + s1.getEdgeCount());
        // 输出：s1 (实际是 Circle): 圆形, 边数=0


        // ----- 2. 同一个接口类型，指向第二个实现类：Rectangle -----
        Shape s2 = new Rectangle(5.0, 4.0);
        System.out.println("s2 (实际是 Rectangle): " + s2.describe() + ", 边数=" + s2.getEdgeCount());
        // 输出：s2 (实际是 Rectangle): 矩形, 边数=4


        // ----- 3. 多态：用数组或循环统一处理 -----
        // 把不同实现类对象都放进「接口类型」数组里，循环里同一句代码，实际执行各自类的逻辑。
        Shape[] shapes = { new Circle(1.0), new Rectangle(2.0, 3.0), new Circle(2.0) };
        System.out.println("--- 遍历 Shape 数组（多态调用）---");
        for (int i = 0; i < shapes.length; i++) {
            Shape s = shapes[i];
            System.out.println("  " + (i + 1) + ": " + s.describe() + ", 边数=" + s.getEdgeCount());
        }
        // 输出：
        //   1: 圆形, 边数=0
        //   2: 矩形, 边数=4
        //   3: 圆形, 边数=0
    }
}
