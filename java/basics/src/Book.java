/**
 * ============================================
 * 类、对象、构造方法、封装（private + getter/setter）
 * ============================================
 *
 * 【类】对一类事物的描述，包含：字段（属性）、构造方法、普通方法。
 * 【对象】根据类 new 出来的具体实例。
 * 【构造方法】与类同名、无返回类型，用于在 new 时初始化对象。可重载（不同参数列表）。
 * 【封装】用 private 修饰字段，外部不能直接访问；通过 public 的 getter/setter 读写，便于校验与维护。
 *
 * 【为什么这里都是 public 没有 static？】
 * - 构造方法不能加 static，因为构造方法就是用来「创建对象」的，必须和对象绑定。
 * - getter/setter 是「实例方法」：要针对某一个 Book 对象（this）操作，所以不用 static。用 static 就变成「属于类」、无法访问 this.title，所以必须是普通实例方法。
 * - public 表示「对外可见」，这样别的类才能 new Book(...)、调用 b.getTitle() 等。
 *
 * 【为什么有两个 Book()？】
 * - 这叫「构造方法重载」：方法名相同（都是 Book）、参数列表不同。根据你 new 时传不传参、传几个参，Java 自动选一个匹配的构造方法。
 * - new Book("Java", "作者", 99.0) → 调用带三个参数的构造方法。
 * - new Book() → 调用无参构造方法。
 *
 * 通俗版（四种写法 + 前端类比）：见仓库 docs/static与包-通俗解释.md
 */
public class Book {

    /*
     * 【为什么字段用 private？】
     * - 不想让外部直接访问（如 book.title = null），避免随意改坏数据。通过 getter/setter 可以在 set 里做校验（如价格不能为负）。
     * 【访问修饰符有哪些？各自特点见类末尾注释表】
     */
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
     * 【构造方法重载】无参构造。new Book() 时调用这个；new Book("a","b",1.0) 时调用上面那个。
     * 有参数就用上面的，没有参数就用这个。
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

    /*
     * 【访问修饰符小结】
     * ┌──────────┬─────────────────────────────────────────────────────────┐
     * │ 修饰符    │ 谁可以访问                                                │
     * ├──────────┼─────────────────────────────────────────────────────────┤
     * │ public   │ 任意类（同一包、其他包都能访问）                              │
     * │ protected│ 本类 + 同包类 + 子类（不同包里的子类也可以）                   │
     * │ 不写(默认) │ 本类 + 同包类（俗称「包私有」package-private）               │
     * │ private  │ 仅本类内部                                                 │
     * └──────────┴─────────────────────────────────────────────────────────┘
     * 字段常用 private 封装；对外暴露用 public 方法（如 getter/setter）。构造方法一般 public，否则外部无法 new。
     */
}
