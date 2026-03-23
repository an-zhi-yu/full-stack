import type { Post } from '../../types'

export const javaOopPosts: Post[] = [
  // ─────────────────────────────────────────────────────────
  // 8. @Override 与 类、封装（Book）
  // ─────────────────────────────────────────────────────────
  {
    id: 'java-override-class-encapsulation',
    title: 'Java @Override 注解与类、封装（Book 示例）',
    subtitle: '搞懂 @Override 写在哪、类与对象、构造方法、private/getter/setter',
    category: 'Java 后端',
    categorySlug: 'java',
    tags: ['Java', '基础入门', 'Override', '封装', '类与对象'],
    date: '2026-03-16',
    readTime: 6,
    content: [
      {
        type: 'paragraph',
        text: '写 Java 时经常看到方法上面有 @Override，有的方法有、有的没有。本文先说清楚 @Override 是什么、什么时候要写，再结合 Book 类复习类、对象、构造方法与封装。',
      },
      { type: 'heading', level: 2, text: '一、@Override 是什么意思？', anchor: 'override' },
      {
        type: 'paragraph',
        text: '@Override 是 Java 的注解，表示：当前方法是「重写」父类（或接口）里已有的方法，不是本类新定义的方法。',
      },
      {
        type: 'table',
        headers: ['写法', '含义'],
        rows: [
          [
            '有 @Override',
            '告诉编译器：这是重写父类/接口的方法。若父类没有同名同参方法，编译会报错，可避免笔误。',
          ],
          [
            '没有 @Override',
            '可能是本类自己新写的方法（如 getTitle()、setPrice()），不是从 Object 或接口继承来的。',
          ],
        ],
      },
      {
        type: 'tip',
        title: '什么时候加？',
        text: '当方法确实是在重写父类方法时（例如重写 Object 的 toString()、equals()、hashCode()），建议都加上。这样父类方法签名变了或你写错方法名/参数时，编译器会直接报错。',
      },
      {
        type: 'paragraph',
        text: 'Book 类里只有 toString() 上面有 @Override，因为 toString() 是重写 Object 的方法；getTitle()、setPrice() 是 Book 自己新加的方法，不是重写，所以不用写。',
      },
      {
        type: 'heading',
        level: 2,
        text: '二、类、对象、构造方法、封装速览',
        anchor: 'class-encapsulation',
      },
      {
        type: 'table',
        headers: ['概念', '说明'],
        rows: [
          ['类（Class）', '对一类事物的描述，包含字段、构造方法、普通方法。'],
          ['对象（Object）', '根据类 new 出来的具体实例。'],
          ['构造方法', '与类同名、无返回类型，用于 new 时初始化；可重载（不同参数列表）。'],
          ['封装', '用 private 修饰字段，通过 public 的 getter/setter 读写，便于校验与维护。'],
        ],
      },
      {
        type: 'paragraph',
        text: '项目中的 Book 示例：basics/src/08-class-encapsulation/（Book.java、BookDemo.java）。运行：javac src/08-class-encapsulation/*.java -d out && java -cp out BookDemo。学习案例文档见 java/学习案例/类与封装-Book.md。',
      },
      {
        type: 'code',
        lang: 'text',
        caption: '运行结果（BookDemo）',
        code: `b1: Book{title='Java 核心技术', author='Cay S. Horstmann', price=99.0}
书名: Java 核心技术, 作者: Cay S. Horstmann, 价格: 99.0
b2: Book{title='Effective Java', author='Joshua Bloch', price=89.5}
修改后 b2 价格: 79.0`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // 9. 继承、super、重写（Animal -> Dog）
  // ─────────────────────────────────────────────────────────
  {
    id: 'java-inheritance-super-override',
    title: 'Java 继承、super 与重写（Animal -> Dog 示例）',
    subtitle: 'extends、super 调用父类构造与方法、@Override 方法重写与多态',
    category: 'Java 后端',
    categorySlug: 'java',
    tags: ['Java', '基础入门', '继承', 'super', '重写', '多态'],
    date: '2026-03-16',
    readTime: 6,
    content: [
      {
        type: 'paragraph',
        text: '继承让子类拥有父类的字段和方法，并可在子类中重写方法或调用 super 访问父类。本文用 Animal（父类）和 Dog（子类）把 extends、super、重写串起来。',
      },
      { type: 'heading', level: 2, text: '一、概念速览', anchor: 'concepts' },
      {
        type: 'table',
        headers: ['概念', '说明'],
        rows: [
          ['继承（extends）', '子类拥有父类的字段和方法，可在此基础上新增或重写。'],
          [
            'super',
            '在子类中：super(参数) 调用父类构造（必须放在子类构造第一行）；super.方法名() 调用父类方法。',
          ],
          [
            '重写（Override）',
            '子类定义与父类同名、同参数的方法，运行时按实际对象类型调用子类实现（多态）。',
          ],
        ],
      },
      { type: 'heading', level: 2, text: '二、父类 Animal', anchor: 'animal' },
      {
        type: 'code',
        lang: 'java',
        caption: 'Animal.java 要点',
        code: `public class Animal {
    private String name;
    private int age;

    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }
    // getter/setter ...

    public String makeSound() { return "（动物叫声）"; }
    public void eat() { System.out.println(name + " 在吃东西"); }
}`,
      },
      { type: 'heading', level: 2, text: '三、子类 Dog：super 与重写', anchor: 'dog' },
      {
        type: 'code',
        lang: 'java',
        caption: 'Dog 继承 Animal，super 与 @Override',
        code: `public class Dog extends Animal {
    private String breed;

    public Dog(String name, int age, String breed) {
        super(name, age);   // 必须先调用父类构造，且在第一行
        this.breed = breed;
    }

    @Override
    public String makeSound() { return "汪汪"; }

    @Override
    public void eat() {
        System.out.print("狗 ");
        super.eat();   // 调用父类 eat()
    }
}`,
      },
      {
        type: 'warning',
        title: '子类构造第一行',
        text: '必须先写 super(参数)，否则编译报错。',
      },
      { type: 'heading', level: 2, text: '四、多态', anchor: 'polymorphism' },
      {
        type: 'paragraph',
        text: '父类引用指向子类对象时，调用方法会执行子类重写后的实现。例如：Animal ref = new Dog("旺财", 3, "金毛"); ref.makeSound() 输出的是「汪汪」，而不是父类的「（动物叫声）」。',
      },
      {
        type: 'code',
        lang: 'text',
        caption: '运行结果（InheritanceDemo）',
        code: `Animal: Animal{name='小动物', age=2}
叫声: （动物叫声）
---
ref (实际是 Dog): Dog{name='旺财', age=3, breed='金毛'}
叫声: 汪汪
---
Dog: Dog{name='小黑', age=1, breed='柯基'}
小黑(柯基): 汪汪`,
      },
      {
        type: 'paragraph',
        text: '项目中的代码：basics/src/09-inheritance/（Animal.java、Dog.java、InheritanceDemo.java）。运行：javac src/09-inheritance/*.java -d out && java -cp out InheritanceDemo。学习案例文档见 java/学习案例/继承与重写-Animal-Dog.md。',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // 10. 接口、多态（Shape + Circle、Rectangle）
  // ─────────────────────────────────────────────────────────
  {
    id: 'java-interface-polymorphism',
    title: 'Java 接口与多态（Shape + Circle、Rectangle 示例）',
    subtitle: 'interface 约定、implements 实现类、同一接口类型多态调用',
    category: 'Java 后端',
    categorySlug: 'java',
    tags: ['Java', '基础入门', '接口', '多态', 'implements'],
    date: '2026-03-16',
    readTime: 6,
    content: [
      {
        type: 'paragraph',
        text: '接口是一份「约定」：只规定有哪些方法（方法名、参数、返回值），不写方法体。谁实现这个接口，谁就要把每个方法都写出来。用接口类型的变量引用不同实现类，调用同一方法时执行各自逻辑，就是多态。本文用 Shape 接口 + Circle、Rectangle 两个实现类来演示。',
      },
      { type: 'heading', level: 2, text: '一、接口是什么？', anchor: 'interface' },
      {
        type: 'paragraph',
        text: '接口（interface）只写方法「声明」：返回值、方法名、参数，没有方法体。实现类用 implements 表示「我实现这个接口」，必须实现接口里声明的所有方法，否则编译报错。',
      },
      {
        type: 'table',
        headers: ['概念', '说明'],
        rows: [
          ['接口（interface）', '约定「有什么方法」，不写具体实现。'],
          ['实现类（implements）', '类声明 implements 接口名，必须实现接口中所有方法。'],
          ['多态', '用接口类型变量引用不同实现类，同一方法名，运行时执行当前对象所属类的实现。'],
        ],
      },
      { type: 'heading', level: 2, text: '二、Shape 接口与两个实现类', anchor: 'shape' },
      {
        type: 'code',
        lang: 'java',
        caption: 'Shape 接口：只声明方法，不写方法体',
        code: `public interface Shape {
    String describe();   // 描述形状，如 "圆形" / "矩形"
    int getEdgeCount();  // 边数，圆 0，矩形 4
}`,
      },
      {
        type: 'code',
        lang: 'java',
        caption: 'Circle 实现 Shape',
        code: `public class Circle implements Shape {
    private double radius;
    public Circle(double radius) { this.radius = radius; }

    @Override
    public String describe() { return "圆形"; }

    @Override
    public int getEdgeCount() { return 0; }
}`,
      },
      {
        type: 'code',
        lang: 'java',
        caption: 'Rectangle 实现 Shape',
        code: `public class Rectangle implements Shape {
    private double width, height;
    public Rectangle(double w, double h) { width = w; height = h; }

    @Override
    public String describe() { return "矩形"; }

    @Override
    public int getEdgeCount() { return 4; }
}`,
      },
      { type: 'heading', level: 2, text: '三、多态调用', anchor: 'polymorphism' },
      {
        type: 'code',
        lang: 'java',
        caption: '接口类型变量指向不同实现，同一方法名执行各自逻辑',
        code: `Shape s1 = new Circle(3.0);
Shape s2 = new Rectangle(5.0, 4.0);
System.out.println(s1.describe());  // 圆形
System.out.println(s2.describe());  // 矩形

// 数组里放不同实现，循环里统一调用
Shape[] shapes = { new Circle(1.0), new Rectangle(2, 3) };
for (Shape s : shapes) {
    System.out.println(s.describe() + ", 边数=" + s.getEdgeCount());
}`,
      },
      {
        type: 'code',
        lang: 'text',
        caption: '运行结果（InterfaceDemo）',
        code: `s1 (实际是 Circle): 圆形, 边数=0
s2 (实际是 Rectangle): 矩形, 边数=4
--- 遍历 Shape 数组 ---
  1: 圆形, 边数=0
  2: 矩形, 边数=4
  3: 圆形, 边数=0`,
      },
      {
        type: 'tip',
        title: '和继承的区别',
        text: '继承是「is-a」：Dog 是一种 Animal。接口是「能做什么」的约定：Circle 能当作 Shape 用。一个类只能 extends 一个父类，但可以 implements 多个接口。',
      },
      {
        type: 'paragraph',
        text: '项目中的代码：basics/src/10-interface-polymorphism/（Shape.java、Circle.java、Rectangle.java、InterfaceDemo.java）。运行：javac src/10-interface-polymorphism/*.java -d out && java -cp out InterfaceDemo。学习案例文档见 java/学习案例/接口与多态-Shape.md。',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // 11. 集合 ArrayList、HashMap
  // ─────────────────────────────────────────────────────────
  {
    id: 'java-collections-list-map',
    title: 'Java 集合：ArrayList 与 HashMap 增删改查',
    subtitle: 'List 存多条数据、Map 键值对，常用 API 与示例',
    category: 'Java 后端',
    categorySlug: 'java',
    tags: ['Java', '集合', 'ArrayList', 'HashMap', 'List', 'Map'],
    date: '2026-03-16',
    readTime: 6,
    content: [
      {
        type: 'paragraph',
        text: 'ArrayList 是可变长度列表，HashMap 是键值对容器。日常开发里「多条数据」常用 List 存，「按 key 查 value」用 Map。本文整理增删改查用法，并给一个用 List 存多条数据的例子。',
      },
      { type: 'heading', level: 2, text: '一、ArrayList 增删改查', anchor: 'arraylist' },
      {
        type: 'code',
        lang: 'java',
        caption: 'List 增删改查',
        code: `List<String> names = new ArrayList<>();
names.add("张三");           // 增
names.add("李四");
String first = names.get(0);  // 查：按下标
names.set(1, "李四四");      // 改
names.remove(0);             // 删：按下标
names.remove("李四四");      // 删：按内容
boolean has = names.contains("张三");
int size = names.size();`,
      },
      {
        type: 'code',
        lang: 'text',
        caption: '运行结果',
        code: `初始: [张三, 李四]
改 set(1) 后: [张三, 李四四]
删 remove 后: [张三]
contains("张三") → true`,
      },
      { type: 'heading', level: 2, text: '二、用 List 存多条数据', anchor: 'list-many' },
      {
        type: 'paragraph',
        text: '每条数据可以是一个对象，多个对象放进同一个 List，再遍历。',
      },
      {
        type: 'code',
        lang: 'java',
        caption: 'List<BookItem> 存多条',
        code: `List<BookItem> books = new ArrayList<>();
books.add(new BookItem("Java 入门", 59.0));
books.add(new BookItem("Spring 实战", 89.0));
for (BookItem b : books) {
    System.out.println(b.title + " " + b.price);
}`,
      },
      {
        type: 'code',
        lang: 'text',
        caption: '运行结果',
        code: `1. Java 入门 59.0 元
2. Spring 实战 89.0 元
3. MySQL 必知必会 49.0 元`,
      },
      {
        type: 'heading',
        level: 3,
        text: 'List 里加对象必须 new 吗？能像 JS 的 { a: 1, b: 2 } 吗？',
        anchor: 'new-vs-js-object',
      },
      {
        type: 'paragraph',
        text: 'Java 没有「对象字面量」：不能写 books.add({ title: "x", price: 59 });，会编译错误。自定义类型必须用 new 调用构造方法，例如 new BookItem("Java 入门", 59.0)。若只要键值对、不想单独写类，可以用 Map<String, Object> 或 Map<String, Double>，但类型不如专用类清晰。Java 16+ 可用 record 简化类声明，仍然要 new BookItem(...)。',
      },
      { type: 'heading', level: 2, text: '三、HashMap 增删改查', anchor: 'hashmap' },
      {
        type: 'code',
        lang: 'java',
        caption: 'Map 键值对',
        code: `Map<String, Integer> scores = new HashMap<>();
scores.put("张三", 85);       // 增/改（同 key 会覆盖）
int n = scores.get("张三");  // 查
scores.remove("张三");       // 删
boolean has = scores.containsKey("张三");`,
      },
      {
        type: 'code',
        lang: 'text',
        caption: '运行结果',
        code: `初始: {张三=85, 李四=92, 王五=78}
李四分数: 92
改 put 王五=88 后: {张三=85, 李四=92, 王五=88}
删张三后: {李四=92, 王五=88}
size = 2`,
      },
      {
        type: 'paragraph',
        text: '项目中的代码：basics/src/12-collections/（ArrayListDemo.java、HashMapDemo.java）。学习案例见 java/学习案例/集合-ArrayList-HashMap.md。',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // 12. 异常 try-catch、throws
  // ─────────────────────────────────────────────────────────
  {
    id: 'java-exception-try-catch',
    title: 'Java 异常处理：try-catch、throws 与 throw',
    subtitle: '捕获异常、声明异常、主动抛出，一段会抛异常的代码并捕获',
    category: 'Java 后端',
    categorySlug: 'java',
    tags: ['Java', '异常', 'try-catch', 'throws', 'throw'],
    date: '2026-03-17',
    readTime: 7,
    content: [
      {
        type: 'paragraph',
        text: '程序运行时的错误（如除零、数字格式错误）会以「异常」的形式抛出。不处理会直接崩溃；用 try-catch 可以捕获并处理，用 throws 可以声明「本方法可能抛异常」，用 throw 可以主动抛出一个异常。',
      },
      { type: 'heading', level: 2, text: '常见异常类型有哪几种？', anchor: 'exception-types' },
      {
        type: 'paragraph',
        text: '所有异常与错误都继承自 Throwable：Error（如内存溢出，一般不捕获）与 Exception。Exception 里又分为：RuntimeException（运行时异常，非受检，不必强制 throws）和其他受检异常（如 IOException，必须处理或 throws）。',
      },
      {
        type: 'table',
        headers: ['异常类', '常见场景'],
        rows: [
          ['NumberFormatException', 'Integer.parseInt("abc") 等字符串转数字失败'],
          ['IllegalArgumentException', '参数不合法，主动 throw 或库方法抛出'],
          ['ArithmeticException', '整数除零等'],
          ['NullPointerException', '对 null 调方法或取字段'],
          ['IndexOutOfBoundsException', 'List/数组下标越界'],
          ['IllegalStateException', '对象当前状态不允许该操作'],
          ['ClassCastException', '强制类型转换失败'],
        ],
      },
      {
        type: 'tip',
        title: 'IllegalArgumentException 与 NumberFormatException',
        text: '二者都是 RuntimeException 的子类。NumberFormatException 专指数字解析失败；IllegalArgumentException 更通用，常用来表示「传进来的参数不符合业务规则」。',
      },
      { type: 'heading', level: 2, text: '一、try-catch 捕获', anchor: 'try-catch' },
      {
        type: 'code',
        lang: 'java',
        caption: '捕获可能抛出的异常',
        code: `try {
    int n = Integer.parseInt("abc");  // 数字格式错误
} catch (NumberFormatException e) {
    System.out.println("捕获: " + e.getMessage());
}

try {
    int a = 10 / 0;  // 除零
} catch (ArithmeticException e) {
    System.out.println("除零: " + e.getMessage());
}`,
      },
      {
        type: 'code',
        lang: 'text',
        caption: '运行结果',
        code: `捕获: For input string: "abc"
除零: / by zero`,
      },
      { type: 'heading', level: 2, text: '二、throws 声明', anchor: 'throws' },
      {
        type: 'paragraph',
        text: '方法签名上写 throws XxxException，表示该方法可能抛出该异常，由调用者 try-catch 或继续 throws。',
      },
      {
        type: 'code',
        lang: 'java',
        caption: 'throws 与 throw',
        code: `public static void setScore(int score) throws IllegalArgumentException {
    if (score < 0 || score > 100) {
        throw new IllegalArgumentException("分数必须在 0~100，当前: " + score);
    }
}
// 调用处必须处理
try {
    setScore(105);
} catch (IllegalArgumentException e) {
    System.out.println(e.getMessage());
}`,
      },
      {
        type: 'code',
        lang: 'text',
        caption: '运行结果',
        code: `setScore 异常: 分数必须在 0~100 之间，当前: 105`,
      },
      {
        type: 'paragraph',
        text: '项目中的代码：basics/src/13-exception/ExceptionDemo.java。学习案例见 java/学习案例/异常-try-catch-throws.md。',
      },
    ],
  },
]
