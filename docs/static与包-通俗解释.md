# static、包、子类 —— 用前端思维理解

写给从前端转 Java 的同学，用「要不要对象」「谁可以访问」两件事说清楚。

**重要纠正：静态方法不是「不属于任何类」**  
静态方法恰恰是**属于类本身**的——挂在这个「类」上，用 **类名.方法名** 调。就像前端的 `Utils.format()`，方法是挂在 Utils 上的；Java 里就是 `ArrayUtils.findMin(arr)`，方法是挂在 ArrayUtils 这个**类**上的。所以：**属于类 = 用类名调、不需要对象**，不是「不属于任何类」。

---

## 一、.java 文件按用途分的种类

| 种类 | 说明 | 本仓库示例 |
|------|------|------------|
| **实体/模型类** | 描述一种数据，主要放字段、构造方法、getter/setter | Book.java、ObjectDemo 里的 User |
| **演示/入口类** | 带 `main(String[] args)`，用来跑示例或程序入口 | ArrayDemo.java、BookDemo.java、Main.java |
| **工具类（Utils）** | 专门放 `public static` 方法，类似前端 utils | ArrayUtils.java；JDK 里如 Arrays、Math |

方法种类与修饰符的完整整理（含表格）见 **java/basics/src/MethodDemo.java** 文件头注释。

---

## 二、你先看到的四种写法

你目前看到的可以归纳成下面这张表（先建立整体印象）：

| 写法 | 是什么 | 谁调、怎么调 | 前端类比 |
|------|--------|--------------|----------|
| `public Book(...)` | **构造方法** | 只有 `new Book(...)` 时由 JVM 调，你不能写「Book()」随便调 | 像「创建对象的工厂函数」，不是普通方法 |
| `public String getTitle()` | **实例方法** | 必须「先有一个对象」：`book.getTitle()`，不能 `Book.getTitle()` | 像 `obj.name` / `user.getName()`，必须针对**某一个**对象 |
| `public static void main(String[] args)` | **程序入口** | 运行 `java ArrayDemo` 时，JVM 自动找这个**类**上的 main 调，不需要你 new | 像整个程序的「启动函数」，只认**类名 + main**，不认对象 |
| `static int findMin(int[] arr)` | **静态方法（类方法）** | 用**类名**调：`ArrayDemo.findMin(nums)` 或同类里直接 `findMin(nums)`，**不需要** new ArrayDemo() | 像前端的**纯工具函数**：`Utils.findMin(arr)`，不依赖某个对象 |

下面分开说清楚：**什么是「属于类」、什么是「要对象」**，以及**为什么 Book 没有 static**。

---

## 三、「属于类」和「要对象」—— 用前端类比

### 1. 先想两件事

- **类** ≈ 一种「类型/模板」（类似 TS 的 class 或 interface + 实现）。
- **对象** ≈ 根据类 `new` 出来的**具体一份数据**（类似 `const book = new Book(...)` 得到的那个 `book`）。

在 Java 里：

- 有的方法要回答：「这是**哪一本书**的 title？」→ 必须先有「这一本书」这个对象，再调方法。这种叫**要对象**（实例方法）。
- 有的方法只回答：「这个**数组**里的最小值是多少？」→ 只要把数组传进来就行，不需要「某一个 ArrayDemo 对象」。这种可以挂在「类」上，叫**属于类**（static 方法）。

### 2. 属于类（static）= 用「类名」调，不需要 new

- **含义**：这个方法不依赖「某一个对象」的数据，只依赖你传进来的参数（或静态变量）。
- **调用**：**类名.方法名(参数)**，例如 `ArrayDemo.findMin(nums)`。同在一个类里也可以直接写 `findMin(nums)`。
- **前端类比**：像工具函数，不依赖某个实例：
  ```js
  // 前端：不依赖 this，纯函数
  function findMin(arr) { return Math.min(...arr); }
  findMin([1,2,3]);
  ```
  Java 里把这种「不依赖对象」的函数挂在类上，就是 `static` 方法，用类名调。

### 3. 要对象（非 static）= 用「对象」调，必须先 new

- **含义**：这个方法要操作「当前这个对象」的数据（例如这本书的 title、price），所以必须知道「是哪一个对象」。
- **调用**：**对象.方法名(参数)**，例如 `book.getTitle()`。不能写 `Book.getTitle()`，因为 getTitle 要的是「这一本书」的 title。
- **前端类比**：像对象上的方法，依赖 this：
  ```js
  const book = { title: 'Java', getTitle() { return this.title; } };
  book.getTitle();  // 必须 book.xxx()，不能「类.getTitle()」
  ```
  Java 里 `getTitle()` 里用到了 `this.title`，所以不能是 static，必须用**对象**调。

### 4. 为什么 Book 没有 static？—— 一句话

- Book 里的 `getTitle()`、`setPrice()` 都要回答：「**这一本书**的 title/price 是什么？」  
  所以必须「先有一本书」（先 `Book b = new Book(...)`），再 `b.getTitle()`、`b.setPrice(99)`。
- 如果写成 `static String getTitle()`，就变成「属于类 Book」，没有 `this`，编译器不知道你要的是**哪一本书**的 title，所以**不能**在 static 方法里访问 `this.title`。  
  因此：**要访问「当前对象」的字段（this.xxx），就不能用 static，必须用实例方法。**

### 5. 为什么 main 是 static？

- 程序启动时，还没有任何对象（你还没写过 `new ArrayDemo()`）。  
  JVM 只认「从哪个**类**的 main 开始跑」，所以 main 必须挂在**类**上，即 **static**。  
  这样 JVM 只要做「跑 ArrayDemo 这个类的 main」，不需要先 new 一个 ArrayDemo。

### 6. 小结一张图

```
「属于类」（static）     →  类名.方法名(参数)    →  不需要 new，像工具函数
「要对象」（非 static）   →  对象.方法名(参数)    →  必须先 new，像 obj.method()
构造方法                 →  只有 new 类名(...) 时自动调用，不能当普通方法调
```

---

## 四、同包、其他包、子类 —— 一句话版

- **包（package）**：像「文件夹/命名空间」，用来区分同名的类。  
  例如 `com.example.app.Book` 和 `com.example.util.Book` 是两个不同的 Book。
- **同包**：在同一个 package 下的类（同一「文件夹」里）。  
  不写访问修饰符时，只有**同包**的类能访问（包私有）。
- **其他包**：别的 package 下的类。  
  只有 **public** 的类/方法/字段才能被其他包访问。
- **子类**：继承了这个类的类。  
  例如 `class EBook extends Book { }`，EBook 就是 Book 的**子类**。  
  **protected** 表示：本类 + 同包 + **子类**（哪怕子类在别的包）可以访问。

你现在写的 Book、ArrayDemo 都没写 `package xxx`，所以都在默认的「同一个包」里，同包可见的方法（例如 `static int findMin`）互相可以调。

---

## 五、把你列的四种再对一下

1. **`public Book()`**  
   构造方法。只有 `new Book()` 时执行，用来初始化这一**个**对象。不能加 static（构造的是「对象」，不是「类」）。

2. **`public String getTitle()`**  
   实例方法。任何包都能访问（public），但必须**用对象调**：`book.getTitle()`。要的是「这本书」的 title，所以不能是 static。

3. **`public static void main(String[] args)`**  
   程序入口。JVM 运行 `java 类名` 时，去找这个**类**上的 main，所以必须 static。  
   注意：**不是**「new xx() 时执行」——`new Book()` 执行的是**构造方法**；main 是「跑整个程序时」执行的。

4. **`static int findMin(int[] arr)`**  
   静态方法（类方法）。不依赖「某一个 ArrayDemo 对象」，只依赖传入的数组，所以挂在类上，用 `ArrayDemo.findMin(nums)` 或同类里 `findMin(nums)` 调用。  
   从前端看：就像不依赖 this 的**工具函数**，只是 Java 必须放在某个类里，于是用 static 挂在类上。

---

## 六、记一句口诀

- **要访问 this.xxx（当前对象的字段）→ 不能用 static，必须用对象调。**
- **不访问 this 的 → 可以（也通常）用 static，用类名调。** 不是「不访问 this 就非得用 static」，而是「不访问 this 时用 static 最合适」。
- **构造方法 = 专门给 new 用的，不能 static；main = 专门给 JVM 启动用的，必须 static。**

---

## 七、同包、跨包、package 是啥

- **不写 package**：类在「默认包」。同一目录下都没写 package 的类算**同包**，可以直接用类名调（再配合 public）。
- **package xxx**：把类**归到 xxx 这个包**（像命名空间/文件夹）。目录常和包名对应，如 `package com.example.utils` 对应 `com/example/utils/`。
- **跨包调用**：要 `import 包名.类名;` 或用全限定名 `包名.类名.方法名()`，且被调的类/方法必须是 **public**。
