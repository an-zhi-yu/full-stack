/**
 * ============================================
 * 类、对象、构造方法、封装（private + getter/setter）
 * ============================================
 *
 * 【类】对一类事物的描述，包含：字段（属性）、构造方法、普通方法。
 * 【对象】根据类 new 出来的具体实例。
 * 【构造方法】与类同名、无返回类型，用于在 new 时初始化对象。可重载（不同参数列表）。
 * 【封装】用 private 修饰字段，外部不能直接访问；通过 public 的 getter/setter 读写，便于校验与维护。
 */
public class Book {

    // ----- 私有字段（封装）：外部不能直接 book.title，必须通过 getTitle() / setTitle() -----
    private String title;
    private String author;
    private double price;

    /**
     * 【构造方法】与类同名，无返回类型（连 void 都不写）。
     * new Book("书名", "作者", 29.9) 时会调用这个构造方法，给 title、author、price 赋初值。
     */
    public Book(String title, String author, double price) {
        this.title = title;
        this.author = author;
        this.price = price;
    }

    /**
     * 【构造方法重载】无参构造，方便先创建对象再通过 setter 赋值。
     */
    public Book() {
        this.title = "";
        this.author = "";
        this.price = 0.0;
    }

    // ----- getter：读取私有字段 -----
    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public double getPrice() {
        return price;
    }

    // ----- setter：修改私有字段，可在方法内做校验（如价格不能为负） -----
    public void setTitle(String title) {
        this.title = title;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setPrice(double price) {
        if (price < 0) throw new IllegalArgumentException("价格不能为负");
        this.price = price;
    }

    @Override
    public String toString() {
        return "Book{title='" + title + "', author='" + author + "', price=" + price + "}";
    }
}
