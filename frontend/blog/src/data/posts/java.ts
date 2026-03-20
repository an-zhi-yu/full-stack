/**
 * Java 基础系列文章（17 篇）
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
      {
        type: 'code',
        lang: 'text',
        caption: '运行结果',
        code: `5
3`,
      },
      {
        type: 'heading',
        level: 3,
        text: '数组与 List 的几种定义、什么时候用哪种',
        anchor: 'when-to-use',
      },
      {
        type: 'table',
        headers: ['写法', '是什么', '什么时候用'],
        rows: [
          ['int[] nums = { 1,2,3 }; 或 new int[]{ 1,2,3 }', '数组，长度固定', '元素个数不变、用下标访问、基本类型 int 等时用数组。传参/赋值给变量时必须写 new int[]{ ... }。'],
          ['List<Integer> list = Arrays.asList(10, 20, 30);', '固定大小的 List，不能 add/remove', '只读、做 Stream、传参给要 List 的 API 时用。不能后续增删元素。'],
          ['List<String> names = new ArrayList<>();', '可变的 List，可 add/remove', '需要动态增删、存「多条数据」时用。日常业务里最常用。'],
        ],
      },
      {
        type: 'tip',
        title: '记忆',
        text: '数组 = 定长；Arrays.asList = 定长 List（只读）；new ArrayList = 可变 List（增删）。',
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
      {
        type: 'code',
        lang: 'text',
        caption: '运行结果',
        code: `[3, 1, 4, 1, 5]
[1, 1, 3, 4, 5]`,
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
      {
        type: 'paragraph',
        text: '上面 asList 只是把数组或一组元素「包装」成 List 视图，没有运行输出；真正打印或 Stream 时才会看到 [10, 20, 30, 40] 等。',
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
        type: 'code',
        lang: 'text',
        caption: '运行结果（big、doubled、has、all、sum、cnt）',
        code: `big = [30, 40]
doubled = [20, 40, 60, 80]
has = true
all = true
sum = 15
cnt = 3`,
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
      {
        type: 'code',
        lang: 'text',
        caption: '运行结果（length=12, charAt(7)="J", indexOf=7, contains=true 等）',
        code: `length() → 12
charAt(7) → 'J'
indexOf("Java") → 7
contains("Java") → true`,
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
      {
        type: 'code',
        lang: 'text',
        caption: '运行结果',
        code: `substring(7) → "Java!"
substring(7,11) → "Java"
replace → "Hello, World!"
trim("  hello  ") → "hello"
join → "a-b-c"`,
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
        type: 'code',
        lang: 'text',
        caption: '运行结果',
        code: `a == b → false
a.equals(b) → true
msg → "你好，张三！今年 18 岁。"`,
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
      {
        type: 'code',
        lang: 'text',
        caption: '运行结果',
        code: `result → "Hello, Java!"
insert(5, " World") 后 → "Hello World"
delete(5,11) 后 → "Hello"
reverse() 后 → "olleH"`,
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

  // ─────────────────────────────────────────────────────────
  // 13. Maven 入门（前端视角）
  // ─────────────────────────────────────────────────────────
  {
    id: 'java-maven-intro-pom',
    title: 'Maven 入门：安装、建项目与 pom.xml（前端视角）',
    subtitle: '为 AI 全栈铺路：认识 Java 项目构建工具，对标 npm 与 package.json',
    category: 'Java 后端',
    categorySlug: 'java',
    tags: ['Java', 'Maven', 'pom.xml', '构建工具', '全栈'],
    date: '2026-03-18',
    readTime: 12,
    content: [
      {
        type: 'paragraph',
        text: '你是前端，要学 Java 后端：除了语法，迟早要面对 **Maven**（或 Gradle）。Maven 负责：约定目录、拉依赖、编译、打包、跑插件。本文用「对标 npm」的方式讲清：**安装 / IDEA 自带**、**用 Maven 建项目的本质**、**pom.xml 里每一块是什么**。仓库里已放好可运行示例 `full-stack/java/basics/maven-intro/`。文末 **第六节** 整理了 Maven 学习中的常见疑问（含 main、mainClass、依赖下载、后端运行模型等）。',
      },
      { type: 'heading', level: 2, text: '一、Maven 与前端工具怎么对应', anchor: 'npm-map' },
      {
        type: 'table',
        headers: ['前端', 'Maven（Java）'],
        rows: [
          ['package.json', 'pom.xml（项目模型 + 依赖 + 插件）'],
          ['npm install', '首次编译时自动解析依赖，或 mvn dependency:resolve'],
          ['node_modules/', '~/.m2/repository/（本机依赖缓存）'],
          ['npm run build', 'mvn compile / mvn package'],
          ['src/', 'src/main/java（主代码）、src/test/java（测试）'],
        ],
      },
      {
        type: 'tip',
        title: '为什么要学 Maven',
        text: 'Spring Boot、公司后端项目几乎都基于 Maven/Gradle。会看 pom、会加依赖、会 package，是接真实项目的门槛。',
      },
      { type: 'heading', level: 2, text: '二、安装 Maven', anchor: 'install' },
      {
        type: 'list',
        ordered: true,
        items: [
          '**IntelliJ IDEA 自带（推荐）**：Settings → Build Tools → Maven，使用 Bundled Maven；用 IDEA Open 本仓库的 maven-intro 文件夹即可。',
          '**Mac Homebrew**：brew install maven，然后 mvn -v 验证。',
          '**只用 Cursor**：可装 Maven CLI，或在 IDEA 里打开同一目录用图形化 Lifecycle。',
        ],
      },
      { type: 'heading', level: 2, text: '三、pom.xml 最核心几块', anchor: 'pom-core' },
      {
        type: 'paragraph',
        text: 'pom = Project Object Model。你最先要认的是下面四块（示例项目里都有 XML 中文注释）：',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          '**GAV**：groupId、artifactId、version —— 唯一标识这个项目（类似 npm 包名 + 版本）。',
          '**properties**：如 Java 17，避免版本写散在各处。',
          '**dependencies**：第三方库（Spring、JUnit 等），以后最常改这里。',
          '**build / plugins**：编译插件、打包插件、本示例里的 exec 插件用于 mvn exec:java 直接跑 main。',
        ],
      },
      {
        type: 'code',
        lang: 'xml',
        caption: 'GAV 与 Java 版本（节选）',
        code: `<groupId>com.anzhiyu</groupId>
<artifactId>maven-intro</artifactId>
<version>1.0-SNAPSHOT</version>

<properties>
  <maven.compiler.source>17</maven.compiler.source>
  <maven.compiler.target>17</maven.compiler.target>
</properties>`,
      },
      { type: 'heading', level: 2, text: '四、本仓库示例怎么跑', anchor: 'run-demo' },
      {
        type: 'code',
        lang: 'bash',
        caption: '在 maven-intro 目录下',
        code: `cd full-stack/java/basics/maven-intro
mvn compile exec:java`,
      },
      {
        type: 'code',
        lang: 'text',
        caption: '运行结果',
        code: `========== Maven 入门示例 ==========
若你看到本行，说明：pom.xml 配置正确，且 mvn compile exec:java 已成功执行。
...（下方还有 Gson 演示输出，见文章《Maven 依赖与 Gson》）`,
      },
      {
        type: 'paragraph',
        text: '源码路径：`basics/maven-intro/`（含 `MavenIntroApp.java`、Gson 示例与 `pom.xml`）。学习案例：`java/学习案例/Maven入门-安装与pom.md`；加依赖见 `Maven依赖坐标与Gson.md`。',
      },
      {
        type: 'heading',
        level: 2,
        text: '五、常用命令备忘',
        anchor: 'mvn-cmds',
      },
      {
        type: 'code',
        lang: 'bash',
        caption: '',
        code: `mvn compile          # 编译到 target/classes
mvn package          # 打 jar
mvn dependency:tree  # 看依赖树（加库以后很有用）`,
      },
      { type: 'heading', level: 2, text: '六、常见疑问（Maven 与后端入门）', anchor: 'maven-faq' },
      {
        type: 'heading',
        level: 3,
        text: '每个包只能有一个 main？mainClass 是指定「哪个包」吗？',
        anchor: 'faq-main-per-package',
      },
      {
        type: 'paragraph',
        text: '**不是。** Java **没有**「每个包只能有一个 main」这种语法规定。同一个包（package）里完全可以有**多个类**，每个类里都可以写 `public static void main(String[] args)` —— 和「一个文件一个 public 顶层类」的规则是两回事。',
      },
      {
        type: 'paragraph',
        text: '`exec-maven-plugin` 的 **`mainClass`** 填的是 **某一个类的全限定名**（包名 + 类名，如 `com.anzhiyu.mavenintro.MavenIntroApp`），表示执行 **`mvn exec:java` 时默认从哪个类启动**。它**不是**「指定一个包」，而是**指定一个入口类**。想跑另一个带 main 的类时：改 `mainClass`，或不用插件、直接用 `java -cp ... 另一个全限定名`。',
      },
      {
        type: 'heading',
        level: 3,
        text: '前端有 create-vite 这种 CLI，后端有吗？',
        anchor: 'faq-cli',
      },
      {
        type: 'paragraph',
        text: '有。常见如 **Spring Initializr**（网页或 IDEA 新建 Spring Boot）、**`mvn archetype:generate`**（Maven 脚手架）。小练习也可以不用 CLI，像本仓库 `maven-intro` 一样维护 `pom.xml` + `src/main/java` 即可。',
      },
      {
        type: 'heading',
        level: 3,
        text: '为什么没看到像 npm i gson 一样装依赖？',
        anchor: 'faq-npm-vs-mvn',
      },
      {
        type: 'paragraph',
        text: '习惯不同：**Maven** 一般在 `pom.xml` 的 `<dependencies>` 里写好坐标，再执行 **`mvn compile`**（或 `package`、`dependency:resolve`）。Maven 解析时发现本地缺 jar 就会**自动从中央仓库下载**到 `~/.m2/repository/`，所以往往**没有单独一条必做的「安装某库」命令**——**编译/打包本身就是触发下载的时机**。需要时也可用 `mvn dependency:get` 等。',
      },
      {
        type: 'heading',
        level: 3,
        text: 'mainClass 配的是 .java 文件路径吗？',
        anchor: 'faq-mainclass-path',
      },
      {
        type: 'paragraph',
        text: '**不是。** 配的是 **全限定类名**，不是磁盘路径。JVM 执行的是 **`.class`**，入口是该类里的 **`public static void main`**。对应关系示例：`com.anzhiyu.mavenintro.MavenIntroApp` ↔ 源文件 `.../mavenintro/MavenIntroApp.java`。',
      },
      {
        type: 'heading',
        level: 3,
        text: '后端运行流程和前端差在哪？接口 CRUD 是不是都很「被动」？',
        anchor: 'faq-backend-flow',
      },
      {
        type: 'paragraph',
        text: '**命令行小工具**（如当前 `MavenIntroApp`）：`main` **跑完就退出**，是主动执行一轮。**Web 后端**（如 Spring Boot）：也有一个 `main`，但主要负责**启动容器、监听端口**；之后业务多是 **HTTP 请求进来再进 Controller**——业务代码常表现为「请求驱动」，但**进程本身是长时间运行的**。此外还有定时任务、消息消费者等。接口 CRUD 是后端很常见的形态，但不是唯一形态。',
      },
      {
        type: 'paragraph',
        text: '学习案例原文档：`java/学习案例/后端小白答疑-CLI依赖与运行模型.md`（与第六节内容一致，可对照仓库阅读）。',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // 14. Maven 依赖与 Gson（坐标、本地仓库）
  // ─────────────────────────────────────────────────────────
  {
    id: 'java-maven-dependency-gson',
    title: 'Maven 依赖与 Gson：坐标、下载与在代码里使用',
    subtitle: '在 pom.xml 声明依赖，理解 GAV 与 ~/.m2，用 Gson 做 JSON 与对象互转',
    category: 'Java 后端',
    categorySlug: 'java',
    tags: ['Java', 'Maven', 'Gson', '依赖', 'JSON', '全栈'],
    date: '2026-03-19',
    readTime: 7,
    content: [
      {
        type: 'paragraph',
        text: '上一篇讲了 Maven 与 pom.xml；本篇做一件后端日常最高频的事：**在 pom.xml 里加第三方依赖**，并理解 **坐标（GAV）**、**jar 下载到哪里**、**为什么 import 能编译通过**。示例库选 **Gson**（Google 的 JSON 库），和前端 `JSON.parse` / `JSON.stringify` 很好类比。代码在 `full-stack/java/basics/maven-intro/`。',
      },
      { type: 'heading', level: 2, text: '一、依赖的「坐标」是什么？', anchor: 'gav' },
      {
        type: 'paragraph',
        text: '和「你自己项目的 GAV」一样，**每一个**别人发布的 jar 也用三个字段唯一标识，合称 **GAV**：',
      },
      {
        type: 'table',
        headers: ['字段', '含义', 'Gson 示例'],
        rows: [
          ['groupId', '组织/厂商，常域名反写', 'com.google.code.gson'],
          ['artifactId', '构件名', 'gson'],
          ['version', '版本号', '2.11.0'],
        ],
      },
      {
        type: 'paragraph',
        text: '在 pom.xml 里写一段 <dependency>，Maven 就能根据 GAV 去 **Maven Central** 解析下载地址（类似 npm 根据包名去 registry）。',
      },
      {
        type: 'code',
        lang: 'xml',
        caption: 'pom.xml 中声明 Gson（节选）',
        code: `<dependency>
  <groupId>com.google.code.gson</groupId>
  <artifactId>gson</artifactId>
  <version>2.11.0</version>
</dependency>`,
      },
      { type: 'heading', level: 2, text: '二、依赖下载到哪？', anchor: 'm2-repo' },
      {
        type: 'paragraph',
        text: '默认缓存目录：**用户目录下的 `~/.m2/repository/`**。Gson 会落在类似 `.../com/google/code/gson/gson/2.11.0/gson-2.11.0.jar` 的路径。第一次 `mvn compile` 需要联网下载；之后同版本直接用本地缓存，和 npm 装过的包不再重复拉取类似。',
      },
      {
        type: 'tip',
        title: '怎么确认依赖真的进来了？',
        text: '在项目根执行 `mvn dependency:tree`，会看到 `com.google.code.gson:gson:jar:2.11.0:compile` 一行。',
      },
      { type: 'heading', level: 2, text: '三、在代码里用 Gson', anchor: 'gson-code' },
      {
        type: 'paragraph',
        text: '示例里增加了 `CourseCard`（简单 POJO）和 `GsonIntroDemo`：`fromJson` 把 JSON 字符串变成 Java 对象，`toJson` 把对象变回 JSON。`MavenIntroApp` 的 `main` 末尾会调用 `GsonIntroDemo.run()`。',
      },
      {
        type: 'code',
        lang: 'java',
        caption: '反序列化 / 序列化（与前端 JSON API 对照）',
        code: `Gson gson = new GsonBuilder().setPrettyPrinting().create();

// JSON → 对象（类似 JSON.parse，但是强类型 CourseCard）
CourseCard parsed = gson.fromJson(jsonString, CourseCard.class);

// 对象 → JSON（类似 JSON.stringify）
String out = gson.toJson(new CourseCard("Spring Boot 基础", 8));`,
      },
      { type: 'heading', level: 2, text: '四、怎么运行', anchor: 'run' },
      {
        type: 'code',
        lang: 'bash',
        caption: '',
        code: `cd full-stack/java/basics/maven-intro
mvn -q compile exec:java`,
      },
      {
        type: 'code',
        lang: 'text',
        caption: '运行结果（节选，在终端输出）',
        code: `========== Maven 入门示例 ==========
...
========== Gson 依赖演示（Maven 已下载坐标对应的 jar）==========
① 反序列化 fromJson → CourseCard{title='Java 与 Maven 入门', lessonCount=12}
② 序列化 toJson →
{
  "title": "Spring Boot 基础",
  "lessonCount": 8
}
==============================================================`,
      },
      {
        type: 'paragraph',
        text: '学习案例：`java/学习案例/Maven依赖坐标与Gson.md`。源码：`MavenIntroApp.java`、`GsonIntroDemo.java`、`CourseCard.java`、`pom.xml`（含 XML 注释）。',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // 15. Java 编码与工程规范（前端对照）
  // ─────────────────────────────────────────────────────────
  {
    id: 'java-style-conventions',
    title: 'Java 编码与工程规范速览（命名、包、资源）',
    subtitle: '从前端视角整理：类/方法/变量怎么起名、包与目录、配置文件与资源命名',
    category: 'Java 后端',
    categorySlug: 'java',
    tags: ['Java', '规范', '命名', '工程化', '全栈'],
    date: '2026-03-20',
    readTime: 10,
    content: [
      {
        type: 'paragraph',
        text: '学完语法后，下一步是**写得像工业界 Java**。本文从前端熟悉的「变量/方法/文件夹命名」出发，对照整理 **Java 官方与社区主流约定**（与 Google Java Style Guide、多数公司规范一致），方便你读开源代码、进团队不违和。',
      },
      { type: 'heading', level: 2, text: '一、权威与工具', anchor: 'authority' },
      {
        type: 'list',
        ordered: false,
        items: [
          '**Oracle / Java Language Specification**：语法层规则。',
          '**Google Java Style Guide**：业界最常用的书写风格参考（缩进、换行、命名）。',
          '**Checkstyle / Spotless / SpotBugs**：类似 ESLint + Prettier + 部分静态检查，可在 CI 里强制规范。',
        ],
      },
      { type: 'heading', level: 2, text: '二、标识符命名（你最关心的）', anchor: 'naming' },
      {
        type: 'table',
        headers: ['类型', '风格', '示例', '前端类比'],
        rows: [
          ['类、接口、枚举', 'UpperCamelCase（大驼峰）', 'UserService, HttpClient', 'React 组件名、TS 类名'],
          ['方法、变量、参数', 'lowerCamelCase（小驼峰）', 'findUser(), maxRetry', '函数名、let/const'],
          ['常量', 'UPPER_SNAKE_CASE', 'MAX_SIZE, DEFAULT_TIMEOUT', '全大写下划线'],
          ['包 package', '全小写，点分隔', 'com.anzhiyu.blog.api', 'npm scope 小写习惯'],
        ],
      },
      {
        type: 'tip',
        title: '类名文件',
        text: '一个源文件里**最多一个 public 顶层类**，且**文件名必须与该类名完全一致**（含大小写），扩展名 .java。非 public 的顶层类可以多个，但团队一般避免。',
      },
      { type: 'heading', level: 2, text: '三、包（package）与目录', anchor: 'package-dir' },
      {
        type: 'paragraph',
        text: '**包名 = 磁盘目录结构**：`package com.anzhiyu.demo` 对应 `com/anzhiyu/demo/`。包名一般用**公司域名反写**避免全球冲突，**全小写**，不用连字符（连字符在包名里不合法）。',
      },
      { type: 'heading', level: 2, text: '四、Maven / 资源文件命名', anchor: 'resources' },
      {
        type: 'list',
        ordered: false,
        items: [
          '**src/main/resources**：配置文件常用 `application.yml` / `application.properties`（Spring），或 `logback.xml`；名字**小写+连字符**或**点分**都可，团队统一即可。',
          '**国际化**：`messages_zh_CN.properties`、`messages_en.properties` 等约定。',
          '**静态模板**：按模块分子目录，如 `templates/`、`static/`，与 Spring Boot 约定一致。',
        ],
      },
      { type: 'heading', level: 2, text: '五、可读性与注释', anchor: 'comments' },
      {
        type: 'paragraph',
        text: '公共 API、复杂算法写 **Javadoc**（/** ... */）；业务方法用**中文或英文**单行注释均可，**团队统一语言**。避免无意义注释；魔法数字尽量提成**命名常量**。',
      },
      { type: 'heading', level: 2, text: '六、小结', anchor: 'summary-style' },
      {
        type: 'paragraph',
        text: '记住：**类大驼峰、方法变量小驼峰、常量全大写下划线、包全小写对齐目录**。大项目还会用 Checkstyle 等在 PR 里自动卡风格——和前端 lint-staged 同一思路。',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // 16. Java 三种常见目录结构（可扩展）
  // ─────────────────────────────────────────────────────────
  {
    id: 'java-project-structure-three',
    title: 'Java 常见项目目录结构：三种主流形态与扩展性',
    subtitle: 'Maven 标准目录、Spring Boot 分层、多模块父工程——从大厂常见实践理解怎么选',
    category: 'Java 后端',
    categorySlug: 'java',
    tags: ['Java', '目录结构', 'Maven', 'Spring Boot', '架构'],
    date: '2026-03-21',
    readTime: 11,
    content: [
      {
        type: 'paragraph',
        text: '前端有「按页面 / 按功能 / monorepo」等组织方式；Java 后端也有**约定大于配置**的目录习惯。下面三种由简到繁，**覆盖个人学习 → 单应用服务 → 大项目拆分**，都是国内团队极常见的选型。',
      },
      { type: 'heading', level: 2, text: '形态一：Maven 标准目录（单模块库或小程序）', anchor: 'maven-standard' },
      {
        type: 'paragraph',
        text: '**特点**：官方约定，工具链默认就认；适合**学习、工具库、小型服务**。',
      },
      {
        type: 'code',
        lang: 'text',
        caption: '典型结构',
        code: `项目根/
├── pom.xml
├── src/main/java/          # 生产代码（包名对应子目录）
├── src/main/resources/     # 配置文件、非代码资源
├── src/test/java/          # 单元测试
└── src/test/resources/     # 测试用资源`,
      },
      {
        type: 'tip',
        title: '扩展性',
        text: '业务变大后可**原址加分包**（如 api / service / domain），或升级到形态二、三。',
      },
      { type: 'heading', level: 2, text: '形态二：Spring Boot 单应用 + 分层包（最流行 Web 后端）', anchor: 'spring-layers' },
      {
        type: 'paragraph',
        text: '**特点**：在 `src/main/java` 下按**职责分包**，与「控制器 / 业务 / 数据访问」对应，和前端「pages / services / api」分层思想一致。',
      },
      {
        type: 'code',
        lang: 'text',
        caption: '常见包划分（名称可微调）',
        code: `com.company.app
├── Application.java          # 启动类（main）
├── controller    (或 web)   # HTTP 入参出参、路由
├── service                    # 业务逻辑
├── repository  (或 mapper)  # 数据库访问
├── domain / model / dto      # 实体、传输对象
└── config / common / util    # 配置、工具`,
      },
      {
        type: 'paragraph',
        text: '**扩展性**：单体内先**纵向分包**；团队变大后可把某一层先拆成**独立模块**（过渡到形态三）。',
      },
      { type: 'heading', level: 2, text: '形态三：Maven 多模块（企业级、易扩展）', anchor: 'multi-module' },
      {
        type: 'paragraph',
        text: '**特点**：仓库根有一个 **父 pom**（packaging=pom），只管理**版本与公共依赖**；下面多个子模块各自有独立 `pom.xml`。**大厂与开源中大型项目**极常见。',
      },
      {
        type: 'code',
        lang: 'text',
        caption: '示例模块划分',
        code: `parent/
├── pom.xml                 # 父 POM：dependencyManagement、插件版本
├── app-api/                # 对外 API 契约、DTO
├── app-service/            # 业务实现、可部署的 Spring Boot
├── app-common/             # 工具、常量、公共异常
└── app-integration/        # 可选：第三方对接、消息等`,
      },
      {
        type: 'warning',
        title: '不要盲目上多模块',
        text: '个人学习、小服务用**形态一或二**即可；多模块带来**构建顺序、IDE 导入、发布流程**成本，等业务边界清晰再拆。',
      },
      { type: 'heading', level: 2, text: '三种怎么选（简表）', anchor: 'compare' },
      {
        type: 'table',
        headers: ['形态', '适用', '扩展方式'],
        rows: [
          ['Maven 标准单模块', '学习、类库、小工具', '加分包或再建模块'],
          ['Spring Boot 分层', '单体 Web/API、团队 1～N 人', '分包 → 再拆模块'],
          ['多模块父工程', '多团队、清晰边界、复用 common', '按域继续加子模块'],
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // 17. Java 基础新手注意点（坑点清单）
  // ─────────────────────────────────────────────────────────
  {
    id: 'java-beginner-pitfalls',
    title: 'Java 基础新手易踩坑清单（对照前端思维）',
    subtitle: '字符串比较、整数除法、空指针、包与目录、泛型与 equals——能整理多少是多少',
    category: 'Java 后端',
    categorySlug: 'java',
    tags: ['Java', '新手', '踩坑', '基础', '全栈'],
    date: '2026-03-22',
    readTime: 12,
    content: [
      {
        type: 'paragraph',
        text: '以下不重复语法课，只列**容易带着 JS 习惯误用**或**一跑就懵**的点。建议收藏，写代码时对照。',
      },
      { type: 'heading', level: 2, text: '一、类型与运算', anchor: 'types-ops' },
      {
        type: 'list',
        ordered: false,
        items: [
          '**整数相除**：`3 / 2` 结果是 **1**（int），要小数请 `3.0 / 2` 或强转。',
          '**比较字符串内容**：用 **equals**，不要 ==（== 比的是引用，类似 JS 里比对象引用）。',
          '**boolean**：条件必须是 boolean，不能写 `if (1)`。',
          '**char 与 String**：单引号是 char，双引号是 String，类型不同。',
        ],
      },
      { type: 'heading', level: 2, text: '二、空指针与集合', anchor: 'null-collections' },
      {
        type: 'list',
        ordered: false,
        items: [
          '**NullPointerException**：对 **null** 调方法、拆箱、取字段会炸；习惯上**尽早校验**或使用 Optional（进阶）。',
          '**Arrays.asList** 得到的 List **不能 add/remove**（定长）；要可变用 **new ArrayList<>()**。',
          '**增强 for 里删除元素**：可能 ConcurrentModificationException，用迭代器 remove 或新集合。',
        ],
      },
      { type: 'heading', level: 2, text: '三、面向对象与 equals', anchor: 'oop-equals' },
      {
        type: 'list',
        ordered: false,
        items: [
          '**重写 equals 时常要重写 hashCode**（尤其要放进 HashMap/HashSet 时）。',
          '**方法隐藏与重写**：子类 static 方法不会多态「重写」父类实例方法；实例方法用 @Override 防写错签名。',
        ],
      },
      { type: 'heading', level: 2, text: '四、泛型与原始类型', anchor: 'generics' },
      {
        type: 'paragraph',
        text: '避免长期用 **原始类型** `List list`（无泛型），会丢失类型检查。`List<String>` 与 `List<Integer>` 在运行时擦除，某些场景要注意 **类型安全**。',
      },
      { type: 'heading', level: 2, text: '五、异常与资源', anchor: 'exception-resources' },
      {
        type: 'list',
        ordered: false,
        items: [
          '**受检异常**：调用声明 throws IOException 的方法，要么 try-catch 要么继续 throws。',
          '**try-with-resources**：实现了 AutoCloseable 的资源（如 InputStream）优先用 try () {} 自动关闭。',
        ],
      },
      { type: 'heading', level: 2, text: '六、工程与 Maven', anchor: 'engineering' },
      {
        type: 'list',
        ordered: false,
        items: [
          '**package 与文件夹**：必须一致；**目录名不要用数字开头**当包名，IDE 易报包路径错误。',
          '**mainClass**：是全限定**类名**，不是 .java 文件路径。',
          '**依赖**：写在 pom 里后靠 **mvn compile** 等触发下载，不一定有单独「npm i」式命令。',
        ],
      },
      { type: 'heading', level: 2, text: '七、时间与 API 选择', anchor: 'datetime-api' },
      {
        type: 'paragraph',
        text: '新业务优先 **java.time**（LocalDateTime、ZonedDateTime），老代码里的 **java.util.Date / Calendar** 了解即可，少在新项目里当首选。',
      },
      { type: 'heading', level: 2, text: '八、并发（先有个印象）', anchor: 'concurrency-hint' },
      {
        type: 'paragraph',
        text: '**SimpleDateFormat**、部分集合**非线程安全**，多线程共享要小心。进阶再系统学 synchronized、线程池、并发集合。',
      },
      {
        type: 'tip',
        title: '学习路径',
        text: '坑清单配合你博客里的「字符串、数组、集合、异常、Maven」系列文章 + 仓库 basics 示例代码，逐项打勾验证效果最好。',
      },
    ],
  },
]

export default javaPosts
