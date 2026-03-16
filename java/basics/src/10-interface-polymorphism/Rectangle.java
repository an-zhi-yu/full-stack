/**
 * ============================================
 * 实现类 2：矩形（实现 Shape 接口）
 * ============================================
 *
 * 和 Circle 一样，Rectangle 也 implements Shape，所以必须实现 describe() 和 getEdgeCount()。
 * 但实现逻辑不同：describe() 返回 "矩形"，getEdgeCount() 返回 4。
 *
 * 【多态的效果】
 * 用同一个「接口类型」变量，有时指向 Circle，有时指向 Rectangle；
 * 调用同一个方法名 describe()，运行时就会执行当前对象所属类的方法，这就是「多态」。
 */
public class Rectangle implements Shape {

    /** 宽、高（实现类自己的字段） */
    private double width;
    private double height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    public double getWidth() {
        return width;
    }

    public void setWidth(double width) {
        this.width = width;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    @Override
    public String describe() {
        return "矩形";
    }

    @Override
    public int getEdgeCount() {
        return 4;
    }
}
