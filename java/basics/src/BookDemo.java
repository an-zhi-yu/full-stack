/**
 * ============================================
 * 使用 Book 类：对象创建、构造方法、getter/setter（封装）
 * ============================================
 *
 * 运行：先编译 Book（BookDemo 依赖它），再运行 BookDemo
 *   javac src/Book.java src/BookDemo.java -d out
 *   java -cp out BookDemo
 */
public class BookDemo {

    public static void main(String[] args) {

        // ----- 用带参构造方法创建对象 -----
        Book b1 = new Book("Java 核心技术", "Cay S. Horstmann", 99.0);
        System.out.println("b1: " + b1);
        System.out.println("书名: " + b1.getTitle() + ", 作者: " + b1.getAuthor() + ", 价格: " + b1.getPrice());

        // ----- 用无参构造 + setter 赋值（封装：通过 set 方法修改，可做校验） -----
        Book b2 = new Book();
        b2.setTitle("Effective Java");
        b2.setAuthor("Joshua Bloch");
        b2.setPrice(89.5);
        System.out.println("b2: " + b2);

        // ----- 修改价格：只能通过 setPrice，不能 b2.price = -1 -----
        b2.setPrice(79.0);
        System.out.println("修改后 b2 价格: " + b2.getPrice());
        // b2.setPrice(-1);  // 会抛异常：价格不能为负
    }
}
