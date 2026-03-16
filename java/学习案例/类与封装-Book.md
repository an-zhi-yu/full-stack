# 学习案例：类、对象、构造方法、封装（Book 示例）

本案例对应 Java 基础中的：**类与对象**、**构造方法**、**封装（private + getter/setter）**，通过一个简单的 `Book` 类来练习。

---

## 1. 概念速览

| 概念 | 说明 |
|------|------|
| **类（Class）** | 对一类事物的描述，包含：字段（属性）、构造方法、普通方法。 |
| **对象（Object）** | 根据类 `new` 出来的具体实例。 |
| **构造方法** | 与类同名、无返回类型，用于在 `new` 时初始化对象；可重载（不同参数列表）。 |
| **封装** | 用 `private` 修饰字段，外部不能直接访问；通过 `public` 的 getter/setter 读写，便于校验与维护。 |

---

## 2. 代码位置与运行

- **类定义**：`basics/src/08-class-encapsulation/Book.java`（字段、构造方法重载、getter/setter、toString）
- **使用示例**：`basics/src/08-class-encapsulation/BookDemo.java`（创建对象、调用 getter/setter、体会封装）

在 `full-stack/java/basics` 目录下执行：

```bash
cd full-stack/java/basics
javac src/08-class-encapsulation/*.java -d out
java -cp out BookDemo
```

---

## 3. 要点小结

- **为什么字段用 `private`？** 避免外部随意改坏数据；在 setter 里可以做校验（如价格不能为负）。
- **为什么用 getter/setter 而不是直接 `book.title`？** 便于以后加校验、日志或计算逻辑，且符合 JavaBean 习惯。
- **构造方法重载**：`Book()` 与 `Book(String title, String author, double price)` 方法名相同、参数列表不同，根据 `new` 时传参自动匹配。

---

## 4. @Override 是什么意思？什么时候要写？

**@Override** 是 Java 的**注解**，表示：**当前方法是「重写」父类（或接口）里已有的方法**，不是本类新定义的方法。

| 写法 | 含义 |
|------|------|
| 有 `@Override` | 告诉编译器：这个方法是重写父类/接口的。如果父类里没有同名同参方法，编译会报错，避免笔误。 |
| 没有 `@Override` | 可能是本类自己新写的方法（如 `getTitle()`、`setPrice()`），不是从 Object 或接口继承来的。 |

**什么时候加？**  
当你的方法**确实是在重写**父类方法时（例如重写 `Object` 的 `toString()`、`equals()`、`hashCode()`），建议都加上。这样如果以后父类方法签名变了，或你写错方法名/参数，编译器会直接报错。

**Book.java 里为什么只有 toString() 上面有 @Override？**  
因为 `toString()` 是重写 `Object` 类的方法；`getTitle()`、`setPrice()` 是 Book 自己新加的方法，不是重写，所以不用写。

更多注释见源码中的块注释（`Book.java` / `BookDemo.java`）。
