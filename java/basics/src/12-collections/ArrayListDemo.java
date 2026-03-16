/**
 * ============================================
 * 集合：ArrayList 增删改查 + 用 List 存多条数据
 * ============================================
 *
 * 【ArrayList 是什么？】
 * 可变长度的「列表」，比数组灵活：不用事先定长度，随时 add/remove。
 * 泛型 List<String> 表示「只能放 String 的列表」；List<Book> 表示「放 Book 对象的列表」。
 *
 * 【增删改查】
 * 增：add(e)、add(index, e)    删：remove(index)、remove(对象)
 * 改：set(index, e)           查：get(index)、size()、contains()
 *
 * 运行：javac src/12-collections/ArrayListDemo.java -d out && java -cp out ArrayListDemo
 */
import java.util.ArrayList;
import java.util.List;

public class ArrayListDemo {

    public static void main(String[] args) {

        // ---------- 一、List 存多条字符串（如多条记录） ----------
        List<String> names = new ArrayList<>();
        names.add("张三");
        names.add("李四");
        names.add("王五");
        System.out.println("初始: " + names);
        System.out.println("条数: " + names.size());

        // 查：按下标取
        String first = names.get(0);
        System.out.println("第一条: " + first);

        // 改：按下标改
        names.set(1, "李四四");
        System.out.println("改后: " + names);

        // 删：按下标删 或 按内容删
        names.remove(2);           // 删下标 2
        names.remove("李四四");    // 删掉内容为 "李四四" 的那条（有的话）
        System.out.println("删后: " + names);

        // 判断是否包含
        boolean has = names.contains("张三");
        System.out.println("包含张三? " + has);

        // ---------- 二、List 存多条「对象」数据（如多条订单/用户） ----------
        List<BookItem> books = new ArrayList<>();
        books.add(new BookItem("Java 入门", 59.0));
        books.add(new BookItem("Spring 实战", 89.0));
        books.add(new BookItem("MySQL 必知必会", 49.0));

        System.out.println("--- 用 List 存多条 Book 数据 ---");
        for (int i = 0; i < books.size(); i++) {
            BookItem b = books.get(i);
            System.out.println((i + 1) + ". " + b.title + " " + b.price + " 元");
        }
        // 或用 for-each
        for (BookItem b : books) {
            System.out.println("  " + b.title);
        }
    }

    /** 简单数据项：书名 + 价格（用 List 存多条时，每条是一个对象） */
    static class BookItem {
        String title;
        double price;
        BookItem(String title, double price) {
            this.title = title;
            this.price = price;
        }
    }
}
