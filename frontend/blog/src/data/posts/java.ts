/**
 * Java 基础系列文章（7 篇）
 * 内容来源：java/basics/src/ 各示例文件
 * 新增文章直接在此文件末尾 javaPosts 数组里追加对象
 */
import type { Post } from '../types'

const javaPosts: Post[] = [
  // ─────────────────────────────────────────────────────────
  // 1. 变量与数据类型
  // ─────────────────────────────────────────────────────────
  {
    id: 'java-variables-types',
    title: 'Java 变量与数据类型完全指南',
    subtitle: '从 int 到 String，彻底搞懂 Java 类型系统；含与前端 JS/TS 的对比',
    category: 'Java 后端',
    categorySlug: 'java',
    tags: ['Java', '基础入门', '变量', '数据类型'],
    date: '2026-03-12',
    readTime: 8,
    pinned: true,
    content: [
      {
        type: 'paragraph',
        text: 'Java 是强类型语言——每个变量在声明时就必须明确指定类型，编译器会在编译阶段做类型检查。这与 JavaScript 的动态类型有本质区别，但与 TypeScript 非常相似。',
      },
      { type: 'heading', level: 2, text: '一、变量的定义与赋值', anchor: 'variables' },
      {
        type: 'paragraph',
        text: '变量是"有名字的一块内存"，用来存储数据，之后可以修改。定义格式：数据类型 变量名 = 值;',
      },
      {
        type: 'code',
        lang: 'java',
        caption: '变量定义的两种写法',
        code: `// 定义并赋初值（推荐）
int age = 18;
String name = "张三";

// 先定义，后赋值
double price;
price = 99.5;`,
      },
      {
        type: 'tip',
        title: '与前端对比',
        text: '前端 let age = 18 不需要类型；Java 必须写 int age = 18。TypeScript 的 const age: number = 18 与 Java 最像。',
      },
      { type: 'heading', level: 2, text: '二、基本数据类型（8种）', anchor: 'primitive' },
      {
        type: 'paragraph',
        text: 'Java 有 8 种基本类型，变量直接存储值本身（不是对象引用），性能更高。',
      },
      {
        type: 'table',
        headers: ['分类', '类型', '占用字节', '默认值', '示例'],
        rows: [
          ['整数', 'byte', '1', '0', '127'],
          ['整数', 'short', '2', '0', '30000'],
          ['整数', 'int', '4', '0', '2_000_000'],
          ['整数', 'long', '8', '0L', '9_000_000_000L'],
          ['小数', 'float', '4', '0.0f', '3.14f'],
          ['小数', 'double', '8', '0.0', '3.1415926'],
          ['布尔', 'boolean', '1', 'false', 'true / false'],
          ['字符', 'char', '2', "'\\u0000'", "'A' / '中'"],
        ],
      },
      {
        type: 'code',
        lang: 'java',
        caption: '8 种基本类型示例',
        code: `// 整数
byte  b = 127;
short s = 30000;
int   i = 2_000_000_000;   // 下划线只是便于阅读
long  l = 9_000_000_000L;  // 末尾加 L 表示 long

// 小数
float  f = 3.14f;          // 末尾加 f
double d = 3.1415926;      // 默认小数即 double（常用）

// 布尔：只有 true / false，不像 JS 的 "truthy/falsy"
boolean ok   = true;
boolean fail = false;

// 字符：单个字符，单引号
char c  = 'A';
char ch = '中';`,
      },
      {
        type: 'warning',
        title: '常见坑',
        text: 'Java 的 boolean 不能像 JS 一样用 0 / "" / null 表示 false。if (1) 会报编译错误，条件必须是 boolean 类型。',
      },
      { type: 'heading', level: 2, text: '三、引用类型', anchor: 'reference' },
      {
        type: 'paragraph',
        text: '引用类型的变量存储的是"对象在堆内存中的地址"，而不是值本身。最常用的是 String 和数组。',
      },
      {
        type: 'code',
        lang: 'java',
        caption: '引用类型：String 与数组',
        code: `// String：双引号，S 大写（String 是类）
String name = "张三";

// 数组：声明并赋初值
int[]    nums  = { 10, 20, 30 };           // 简写（仅声明时可用）
String[] words = new String[]{ "你好", "世界" }; // 完整写法

// ⚠️ 简写只能在「声明+初始化」时用，传参场景必须用完整写法：
// Main.main(new String[]{ "你好" });       // ✅
// Main.main({ "你好" });                  // ❌ 编译错误`,
      },
      {
        type: 'tip',
        title: '与前端对比',
        text: 'JS 的 const arr = [1, 2, 3] 对应 Java 的 int[] arr = {1, 2, 3}；JS 的 const s = "hello" 对应 Java 的 String s = "hello"（注意 String 大写）。',
      },
      { type: 'heading', level: 2, text: '四、类型转换', anchor: 'casting' },
      {
        type: 'code',
        lang: 'java',
        caption: '自动转换 vs 强制转换',
        code: `// 自动类型转换（小 → 大，不丢失精度）
int   a = 100;
long  b = a;       // int → long，自动
double c = a;      // int → double，自动

// 强制类型转换（大 → 小，可能丢精度）
double d  = 3.99;
int    e  = (int) d;   // 截断小数，e = 3

// String ↔ 数字
String s  = String.valueOf(42);     // int → String
int    n  = Integer.parseInt("42"); // String → int`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // 2. 控制流
  // ─────────────────────────────────────────────────────────
  {
    id: 'java-control-flow',
    title: 'Java 控制流：if、for、while 详解',
    subtitle: '条件判断与循环的完整用法，附 for-each 与 break/continue 实战',
    category: 'Java 后端',
    categorySlug: 'java',
    tags: ['Java', '基础入门', '控制流', '循环'],
    date: '2026-03-12',
    readTime: 7,
    content: [
      {
        type: 'paragraph',
        text: '控制流决定了程序"按什么顺序"执行代码。Java 的 if/for/while 语法与 JavaScript 高度相似，但有一些值得注意的差异。',
      },
      { type: 'heading', level: 2, text: '一、if / else if / else', anchor: 'if' },
      {
        type: 'code',
        lang: 'java',
        caption: 'if-else 基本结构',
        code: `int score = 85;

if (score >= 90) {
    System.out.println("优秀");
} else if (score >= 60) {
    System.out.println("及格");    // 输出这行
} else {
    System.out.println("不及格");
}`,
      },
      {
        type: 'warning',
        title: '注意',
        text: 'Java 的 if 条件必须是 boolean 类型，不能写 if (1) 或 if ("") — 这在 JavaScript 里合法，但 Java 编译直接报错。',
      },
      { type: 'heading', level: 2, text: '二、for 循环（三种写法）', anchor: 'for' },
      {
        type: 'code',
        lang: 'java',
        caption: '普通 for / for-each / 索引遍历',
        code: `int[] nums = { 10, 20, 30 };

// ① 普通 for（需要索引时用）
for (int i = 0; i < nums.length; i++) {
    System.out.println(i + " -> " + nums[i]);
}

// ② 增强 for（for-each）：类似 JS 的 for...of，只要元素不要索引
for (int n : nums) {
    System.out.println(n);
}

// ③ 字符串数组同理
String[] words = { "Java", "Hello", "World" };
for (String w : words) {
    System.out.println(w.toLowerCase());
}`,
      },
      {
        type: 'tip',
        title: '选哪种？',
        text: '只需遍历元素 → 用 for-each（简洁）；需要索引或修改元素 → 用普通 for。',
      },
      { type: 'heading', level: 2, text: '三、while 与 do-while', anchor: 'while' },
      {
        type: 'code',
        lang: 'java',
        caption: 'while vs do-while',
        code: `// while：先判断，再执行（条件一开始就不满足则一次都不执行）
int n = 0;
while (n < 3) {
    System.out.println("n = " + n);
    n++;
}

// do-while：先执行一次，再判断（至少执行一次）
int m = 0;
do {
    System.out.println("m = " + m);
    m++;
} while (m < 3);`,
      },
      { type: 'heading', level: 2, text: '四、break 与 continue', anchor: 'break-continue' },
      {
        type: 'code',
        lang: 'java',
        caption: 'break 与 continue 示例',
        code: `// break：跳出整个循环
for (int i = 0; i < 10; i++) {
    if (i == 5) break;
    System.out.println(i);    // 输出 0 1 2 3 4
}

// continue：跳过本次迭代，继续下一次
for (int i = 0; i < 5; i++) {
    if (i == 2) continue;
    System.out.println(i);    // 输出 0 1 3 4
}`,
      },
      { type: 'heading', level: 2, text: '五、switch 语句', anchor: 'switch' },
      {
        type: 'code',
        lang: 'java',
        caption: 'switch 语句（Java 14+ 新写法）',
        code: `// 传统写法（需要 break 防止穿透）
int day = 3;
switch (day) {
    case 1: System.out.println("周一"); break;
    case 3: System.out.println("周三"); break;  // 输出
    default: System.out.println("其他");
}

// Java 14+ 箭头写法（不会穿透，更简洁）
String result = switch (day) {
    case 1 -> "周一";
    case 2 -> "周二";
    case 3 -> "周三";
    default -> "其他";
};`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // 3. 数组与 Arrays + Stream
  // ─────────────────────────────────────────────────────────
  {
    id: 'java-arrays',
    title: 'Java 数组与 Arrays 工具类实战',
    subtitle: '数组创建、遍历、排序、复制，以及 Stream API 的链式操作',
    category: 'Java 后端',
    categorySlug: 'java',
    tags: ['Java', '数组', 'Arrays', 'Stream', 'List'],
    date: '2026-03-12',
    readTime: 10,
    pinned: true,
    content: [
      {
        type: 'paragraph',
        text: 'Java 数组是固定长度、同类型元素的有序集合。与 JavaScript 的数组相比，Java 数组一旦创建长度就不能改变；需要动态长度时应使用 List。',
      },
      { type: 'heading', level: 2, text: '一、创建与访问', anchor: 'create' },
      {
        type: 'code',
        lang: 'java',
        caption: '三种创建方式',
        code: `// ① 声明 + 赋初值（简写，仅限此处）
int[] nums = { 3, 1, 4, 1, 5 };

// ② 完整写法（传参、赋值给已有变量时必须用此写法）
int[] nums2 = new int[]{ 3, 1, 4, 1, 5 };

// ③ 指定长度，元素默认为 0
int[] arr = new int[5];  // [0, 0, 0, 0, 0]

System.out.println(nums.length);  // 5
System.out.println(nums[0]);      // 3
nums[0] = 99;                     // 修改`,
      },
      { type: 'heading', level: 2, text: '二、Arrays 工具类（必会 API）', anchor: 'arrays-api' },
      {
        type: 'code',
        lang: 'java',
        caption: 'Arrays 常用 API',
        code: `import java.util.Arrays;

int[] nums = { 3, 1, 4, 1, 5 };

// 打印：直接 println(nums) 只会打地址，要用 toString
System.out.println(Arrays.toString(nums));  // [3, 1, 4, 1, 5]

// 排序（原地修改）
int[] copy = Arrays.copyOf(nums, nums.length);
Arrays.sort(copy);
System.out.println(Arrays.toString(copy));   // [1, 1, 3, 4, 5]

// 复制
int[] front3 = Arrays.copyOf(nums, 3);           // [3, 1, 4]
int[] mid    = Arrays.copyOfRange(nums, 1, 4);   // [1, 4, 1]

boolean same = Arrays.equals(nums, copy);         // false`,
      },
      { type: 'heading', level: 2, text: '三、数组 → List', anchor: 'to-list' },
      {
        type: 'code',
        lang: 'java',
        caption: 'Arrays.asList 快速构造 List',
        code: `import java.util.Arrays;
import java.util.List;

// 用元素直接构造（类似 JS 的 [10, 20, 30]）
List<Integer> list = Arrays.asList(10, 20, 30, 40);

// 引用类型数组转 List
String[] arr = { "a", "b", "c" };
List<String> strList = Arrays.asList(arr);

// ⚠️ asList 返回的 List 大小固定，不能 add / remove`,
      },
      { type: 'heading', level: 2, text: '四、Stream API（链式操作）', anchor: 'stream' },
      {
        type: 'paragraph',
        text: 'Stream 是 Java 8 引入的函数式 API，与前端的 Array.filter/map/reduce 思路完全一致。',
      },
      {
        type: 'code',
        lang: 'java',
        caption: 'filter / map / anyMatch / allMatch',
        code: `import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

List<Integer> list = Arrays.asList(10, 20, 30, 40);

// filter → 类似 JS 的 .filter()
List<Integer> big = list.stream()
    .filter(x -> x > 25)
    .collect(Collectors.toList());   // [30, 40]

// map → 类似 JS 的 .map()
List<Integer> doubled = list.stream()
    .map(x -> x * 2)
    .collect(Collectors.toList());   // [20, 40, 60, 80]

boolean has = list.stream().anyMatch(x -> x > 35);  // true（类似 .some）
boolean all = list.stream().allMatch(x -> x > 5);   // true（类似 .every）

// 基本类型数组：Arrays.stream → IntStream
int[] intArr = { 1, 2, 3, 4, 5 };
int sum  = Arrays.stream(intArr).sum();               // 15
long cnt = Arrays.stream(intArr).filter(x -> x > 2).count(); // 3`,
      },
      {
        type: 'tip',
        title: '工具类模式',
        text: '工具方法（如求最大最小值）应放在独立工具类里（如 ArrayUtils），方法设为 public static，用类名调用：ArrayUtils.findMax(arr)。这与前端的 utils.ts 是同一个思路。',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // 4. 字符串
  // ─────────────────────────────────────────────────────────
  {
    id: 'java-strings',
    title: 'Java 字符串 API 全解析',
    subtitle: '从 length() 到 StringBuilder，常用字符串操作一网打尽',
    category: 'Java 后端',
    categorySlug: 'java',
    tags: ['Java', '字符串', 'String', 'StringBuilder'],
    date: '2026-03-12',
    readTime: 9,
    content: [
      {
        type: 'paragraph',
        text: 'Java 的 String 是不可变对象（immutable）——每次"修改"字符串都会产生新对象，原字符串不变。这和 JavaScript 中字符串的行为一致，但在 Java 中更需要注意性能问题。',
      },
      { type: 'heading', level: 2, text: '一、常用查询 API', anchor: 'query' },
      {
        type: 'code',
        lang: 'java',
        caption: '查询方法',
        code: `String s = "Hello, Java!";

s.length()              // 12       → 字符个数
s.isEmpty()             // false    → 是否 ""
s.charAt(7)             // 'J'      → 下标 7 的字符
s.indexOf("Java")       // 7        → 首次出现下标，无则 -1
s.lastIndexOf("a")      // 10       → 最后出现下标
s.contains("Java")      // true     → 是否包含
s.startsWith("Hello")   // true
s.endsWith("!")         // true`,
      },
      { type: 'heading', level: 2, text: '二、截取与拼接', anchor: 'slice-join' },
      {
        type: 'code',
        lang: 'java',
        caption: '截取、替换、拼接',
        code: `String s = "Hello, Java!";

// 截取
s.substring(7)       // "Java!"
s.substring(7, 11)   // "Java"（[7,11) 不含11）

// 替换（返回新字符串，s 本身不变）
s.replace("Java", "World")   // "Hello, World!"
s.replaceFirst("l", "L")     // "HeLlo, Java!"

// 大小写 / 去空白
s.toUpperCase()        // "HELLO, JAVA!"
"  hello  ".trim()    // "hello"

// 分割 / 拼接
"a,b,c".split(",")                          // ["a", "b", "c"]
String.join("-", "a", "b", "c")            // "a-b-c"`,
      },
      { type: 'heading', level: 2, text: '三、比较字符串', anchor: 'compare' },
      {
        type: 'warning',
        title: '高频坑：不能用 == 比较字符串内容',
        text: '== 比较的是对象引用地址，不是内容。比较内容必须用 equals()。',
      },
      {
        type: 'code',
        lang: 'java',
        caption: '正确的字符串比较',
        code: `String a = new String("hello");
String b = new String("hello");

System.out.println(a == b);                       // false（地址不同）
System.out.println(a.equals(b));                 // true  ✅
System.out.println(a.equalsIgnoreCase("HELLO")); // true（忽略大小写）

// 格式化
String msg = String.format("你好，%s！今年 %d 岁。", "张三", 18);`,
      },
      {
        type: 'heading',
        level: 2,
        text: '四、StringBuilder（大量拼接时用）',
        anchor: 'string-builder',
      },
      {
        type: 'paragraph',
        text: '循环里用 + 拼接字符串会产生大量临时对象，性能差。应用 StringBuilder，它在内部用可变缓冲区，拼接完再 toString() 得到字符串。',
      },
      {
        type: 'code',
        lang: 'java',
        caption: 'StringBuilder 用法',
        code: `// 链式写法（推荐）
String result = new StringBuilder()
    .append("Hello")
    .append(", ")
    .append("Java!")
    .toString();  // "Hello, Java!"

StringBuilder sb = new StringBuilder("Hello");
sb.insert(5, " World");  // 在下标5处插入
sb.delete(5, 11);        // 删除 [5,11) 区间
sb.reverse();            // 反转`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // 5. 数值与 Math
  // ─────────────────────────────────────────────────────────
  {
    id: 'java-numbers-math',
    title: 'Java 数值运算与 Math 类',
    subtitle: '基本类型运算、包装类、类型转换与 Math 工具方法速查',
    category: 'Java 后端',
    categorySlug: 'java',
    tags: ['Java', '数值', 'Math', '包装类', '类型转换'],
    date: '2026-03-13',
    readTime: 7,
    content: [
      { type: 'heading', level: 2, text: '一、基本运算符', anchor: 'operators' },
      {
        type: 'code',
        lang: 'java',
        caption: '算术与赋值运算符',
        code: `int a = 10, b = 3;

a + b   // 13    a - b  // 7    a * b  // 30
a / b   // 3   ← 整数除法，小数直接丢弃
a % b   // 1   ← 取余

// 整数除法要小数结果：强转其中一个
(double) a / b  // 3.3333...

// 自增/自减
int x = 5;
x++;    // x = 6（先用后加）
++x;    // x = 7（先加后用）

// 复合赋值
a += 5;  a *= 2;`,
      },
      { type: 'heading', level: 2, text: '二、包装类（Integer / Double 等）', anchor: 'wrapper' },
      {
        type: 'paragraph',
        text: '基本类型不是对象，不能直接放入泛型集合（List<Integer>）。Java 为每种基本类型提供了对应的包装类（Wrapper Class）。',
      },
      {
        type: 'table',
        headers: ['基本类型', '包装类', '常用静态方法'],
        rows: [
          ['int', 'Integer', 'parseInt(s) / toString(n) / compare(a,b)'],
          ['double', 'Double', 'parseDouble(s) / toString(d)'],
          ['long', 'Long', 'parseLong(s)'],
          ['boolean', 'Boolean', 'parseBoolean(s)'],
          ['char', 'Character', 'isDigit(c) / isLetter(c) / toUpperCase(c)'],
        ],
      },
      {
        type: 'code',
        lang: 'java',
        caption: '包装类与自动装箱/拆箱',
        code: `// String ↔ 数字
int    n  = Integer.parseInt("42");
double d  = Double.parseDouble("3.14");
String s  = String.valueOf(42);       // 42 → "42"

// 自动装箱（int → Integer）
Integer boxed = 42;       // 等价于 Integer.valueOf(42)
// 自动拆箱（Integer → int）
int unboxed = boxed;

// ⚠️ 比较包装类的值：用 equals，不能用 ==
Integer x = 200, y = 200;
x.equals(y);  // true ✅
x == y;       // false（> 127 时不复用缓存）`,
      },
      { type: 'heading', level: 2, text: '三、Math 工具类', anchor: 'math' },
      {
        type: 'code',
        lang: 'java',
        caption: 'Math 常用方法速查',
        code: `Math.max(3, 7)      // 7
Math.min(3, 7)      // 3
Math.abs(-5)        // 5
Math.round(3.7)     // 4（四舍五入，返回 long）
Math.floor(3.9)     // 3.0（向下取整）
Math.ceil(3.1)      // 4.0（向上取整）
Math.pow(2, 10)     // 1024.0（2的10次方）
Math.sqrt(16)       // 4.0（平方根）
Math.random()       // [0.0, 1.0) 随机数

// 生成 [min, max] 范围内的随机整数
int rand = (int)(Math.random() * (max - min + 1)) + min;`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // 6. 面向对象基础
  // ─────────────────────────────────────────────────────────
  {
    id: 'java-oop-basics',
    title: '面向对象基础：类、对象、构造方法与封装',
    subtitle: '从 new Book() 到 getter/setter，理解 OOP 的封装思想',
    category: 'Java 后端',
    categorySlug: 'java',
    tags: ['Java', 'OOP', '类', '对象', '封装', '构造方法'],
    date: '2026-03-13',
    readTime: 11,
    pinned: true,
    content: [
      {
        type: 'paragraph',
        text: '面向对象编程（OOP）的核心思想是用"类"描述一类事物，用"对象"代表具体实例。Java 从底层就是面向对象的语言（除了基本类型外，一切都是对象）。',
      },
      { type: 'heading', level: 2, text: '一、类与对象', anchor: 'class-object' },
      {
        type: 'code',
        lang: 'java',
        caption: '定义一个 Book 类',
        code: `public class Book {

    // ① 字段：用 private 封装，外部不能直接访问
    private String title;
    private String author;
    private double price;

    // ② 构造方法：与类同名，无返回类型，new 时调用
    public Book(String title, String author, double price) {
        this.title  = title;    // this 指向当前对象
        this.author = author;
        this.price  = price;
    }

    // 无参构造（重载）：new Book() 时调用
    public Book() {
        this.title = "";  this.author = "";  this.price = 0.0;
    }

    // ③ getter：读取私有字段
    public String getTitle()  { return title;  }
    public String getAuthor() { return author; }
    public double getPrice()  { return price;  }

    // ④ setter：修改前可以做校验
    public void setPrice(double price) {
        if (price < 0) throw new IllegalArgumentException("价格不能为负");
        this.price = price;
    }

    @Override
    public String toString() {
        return "Book{title='" + title + "', price=" + price + "}";
    }
}`,
      },
      {
        type: 'code',
        lang: 'java',
        caption: '使用 Book 对象',
        code: `Book b1 = new Book("Java 核心技术", "Horstmann", 129.0);
Book b2 = new Book();   // 调用无参构造

System.out.println(b1.getTitle());  // "Java 核心技术"
System.out.println(b1);             // Book{title='Java 核心技术', price=129.0}

b2.setPrice(59.0);
// b2.setPrice(-1);  // 抛出 IllegalArgumentException`,
      },
      {
        type: 'tip',
        title: '与前端类对比',
        text: 'JS/TS 的 class Book { constructor(...) {} } 结构上与 Java 一致。主要差异：Java 的 private 由编译器强制执行；TS 的 private 只在编译时约束，运行时仍可访问。',
      },
      { type: 'heading', level: 2, text: '二、访问修饰符', anchor: 'access' },
      {
        type: 'table',
        headers: ['修饰符', '本类', '同包', '子类（跨包）', '其他类'],
        rows: [
          ['public', '✅', '✅', '✅', '✅'],
          ['protected', '✅', '✅', '✅', '❌'],
          ['(不写，默认)', '✅', '✅', '❌', '❌'],
          ['private', '✅', '❌', '❌', '❌'],
        ],
      },
      { type: 'heading', level: 2, text: '三、构造方法重载', anchor: 'constructor-overload' },
      {
        type: 'code',
        lang: 'java',
        caption: '参数列表不同即可重载',
        code: `public class Person {
    private String name;
    private int    age;

    public Person(String name, int age) {
        this.name = name;  this.age = age;
    }

    // 一个参数：调用上面的构造方法
    public Person(String name) {
        this(name, 0);   // this(...) 委托给其他构造方法
    }

    // 无参：默认值
    public Person() { this("匿名", 0); }
}

Person p1 = new Person("张三", 18);
Person p2 = new Person("李四");    // age = 0
Person p3 = new Person();           // name="匿名", age=0`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // 7. 方法详解
  // ─────────────────────────────────────────────────────────
  {
    id: 'java-methods',
    title: 'Java 方法详解：static、实例方法与修饰符',
    subtitle: '搞清楚构造方法、实例方法、静态方法的区别，以及 public/private/static 的含义',
    category: 'Java 后端',
    categorySlug: 'java',
    tags: ['Java', '方法', 'static', '修饰符', '工具类'],
    date: '2026-03-13',
    readTime: 10,
    content: [
      {
        type: 'paragraph',
        text: 'Java 中的方法分为三种主要类型：构造方法、实例方法、静态方法。搞清楚它们的区别是理解 Java OOP 的关键。',
      },
      { type: 'heading', level: 2, text: '一、三种方法总览', anchor: 'overview' },
      {
        type: 'table',
        headers: ['种类', '有无 static', '调用方式', '能访问 this？'],
        rows: [
          ['构造方法', '❌ 不能加', 'new 类名(参数)', '✅（初始化 this 的字段）'],
          ['实例方法', '❌ 无 static', '对象.方法名()', '✅'],
          ['静态方法', '✅ 有 static', '类名.方法名()', '❌'],
          ['main 入口', '✅ 有 static', 'JVM 自动调用', '❌'],
        ],
      },
      { type: 'heading', level: 2, text: '二、代码示例', anchor: 'demo' },
      {
        type: 'code',
        lang: 'java',
        caption: '四种方法写法对照',
        code: `public class MethodDemo {

    private int count;

    // ① 构造方法
    public MethodDemo() { this.count = 0; }

    // ② 实例方法：无 static，可访问 this
    public void increment() { this.count++; }
    public int  getCount()  { return count; }

    // ③ 私有实例方法：仅本类内部可调
    private void doInternal() { System.out.println("仅本类可见"); }

    // ④ 静态方法：属于类，不依赖对象，不能访问实例字段
    public static int add(int a, int b) { return a + b; }

    public static void main(String[] args) {
        MethodDemo obj = new MethodDemo();
        obj.increment();
        obj.increment();
        System.out.println(obj.getCount());     // 2

        int sum = MethodDemo.add(10, 20);
        System.out.println(sum);                // 30
    }
}`,
      },
      {
        type: 'heading',
        level: 2,
        text: '三、static 与 public 的区别',
        anchor: 'static-vs-public',
      },
      {
        type: 'table',
        headers: ['修饰符', '控制的维度', '作用'],
        rows: [
          ['static', '属于谁', '有 static → 属于类，无需对象；无 static → 属于对象'],
          ['public', '谁能访问', '任意类都能访问'],
          ['private', '谁能访问', '只有本类内部能访问'],
          ['public static', '两者都有', '任意处可用，且用类名调（如 Math.sqrt）'],
        ],
      },
      {
        type: 'tip',
        title: '记忆口诀',
        text: 'static → 管"要不要 new"；public/private → 管"谁能用"。两者独立，可任意组合：public static（工具方法）、private static（内部工具）、public void（实例方法）。',
      },
      { type: 'heading', level: 2, text: '四、工具类模式', anchor: 'utils' },
      {
        type: 'paragraph',
        text: '工具类（Utils）专门放 public static 方法，不需要实例化。与前端的 utils.ts 是同一思路。',
      },
      {
        type: 'code',
        lang: 'java',
        caption: 'ArrayUtils 工具类示例',
        code: `public class ArrayUtils {

    // private 构造：防止外部 new ArrayUtils()（工具类无需实例）
    private ArrayUtils() {}

    public static int findMax(int[] arr) {
        int max = arr[0];
        for (int n : arr) if (n > max) max = n;
        return max;
    }

    public static int findMin(int[] arr) {
        int min = arr[0];
        for (int n : arr) if (n < min) min = n;
        return min;
    }
}

// 调用：无需 new，直接类名.方法名
int[] nums = { 3, 1, 4, 1, 5 };
ArrayUtils.findMax(nums); // 5
ArrayUtils.findMin(nums); // 1`,
      },
      { type: 'heading', level: 2, text: '五、包（package）与跨文件调用', anchor: 'package' },
      {
        type: 'code',
        lang: 'java',
        caption: '包的声明与 import',
        code: `// 文件顶部声明所属包
package com.example.utils;

public class MathUtils {
    public static double square(double n) { return n * n; }
}

// 在另一个文件里使用：
import com.example.utils.MathUtils;

public class Main {
    public static void main(String[] args) {
        System.out.println(MathUtils.square(4));  // 16.0
    }
}`,
      },
      {
        type: 'tip',
        title: '默认包',
        text: '如果文件顶部没有 package 语句，类就在"默认包"里。同一目录下同为默认包的类可以直接互相调用，不需要 import，这就是 ArrayDemo 可以直接写 ArrayUtils.findMax(arr) 的原因。',
      },
    ],
  },
]

export default javaPosts
