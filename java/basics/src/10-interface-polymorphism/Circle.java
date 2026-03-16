/**
 * ============================================
 * 实现类 1：圆形（实现 Shape 接口）
 * ============================================
 *
 * 【implements 是什么意思？】
 * implements = 实现。表示 Circle 类「实现了 Shape 接口」，
 * 也就是承诺：我会把 Shape 里声明的所有方法都写出来，并且方法签名一致。
 *
 * 【必须做的事】
 * 接口 Shape 里有两个方法：describe() 和 getEdgeCount()，
 * 所以 Circle 里必须有两个方法，名字、参数、返回值类型和接口里一致，并写上方法体。
 *
 * 【多态】
 * 以后可以写：Shape s = new Circle();
 * 变量 s 的类型是「接口 Shape」，但实际指向的是 Circle 对象。
 * 调用 s.describe() 时，运行的是 Circle 里的 describe()，返回 "圆形"。
 */
public class Circle implements Shape {

    /** 半径（实现类可以有自己的字段） */
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    public double getRadius() {
        return radius;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }

    /**
     * 实现接口规定的 describe() 方法。
     * 必须和接口里一样：public String describe()，不能改名字、不能改返回值类型。
     * 方法体由我们自己写：圆形就返回 "圆形"。
     */
    @Override
    public String describe() {
        return "圆形";
    }

    /**
     * 实现接口规定的 getEdgeCount() 方法。
     * 圆没有「边」的概念，约定返回 0（或 1 表示「一条封闭曲线」均可，这里用 0 表示无棱角）。
     */
    @Override
    public int getEdgeCount() {
        return 0;
    }
}
