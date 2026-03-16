# 学习案例：接口、多态（Shape + Circle、Rectangle）

本案例对应 Java 基础中的：**接口（interface）**、**实现类（implements）**、**多态调用**。通过一个「形状」接口和两个实现类（圆形、矩形）来练习。

---

## 1. 概念速览

| 概念 | 说明 |
|------|------|
| **接口（interface）** | 一份「约定」：只规定有哪些方法（方法名、参数、返回值），不写方法体。实现类必须写出每个方法的具体逻辑。 |
| **实现类（implements）** | 类声明时写 implements 接口名，表示「实现该接口」，必须实现接口里声明的所有方法。 |
| **多态** | 用「接口类型」的变量引用不同实现类对象，调用同一方法名时，运行时执行的是当前对象所属类的方法。 |

---

## 2. 代码位置与运行

- **接口**：`basics/src/10-interface-polymorphism/Shape.java`（describe()、getEdgeCount()）
- **实现类 1**：`basics/src/10-interface-polymorphism/Circle.java`（圆形，半径 radius）
- **实现类 2**：`basics/src/10-interface-polymorphism/Rectangle.java`（矩形，宽高 width、height）
- **演示**：`basics/src/10-interface-polymorphism/InterfaceDemo.java`（接口类型引用、多态调用、数组遍历）

在 `full-stack/java/basics` 目录下执行：

```bash
cd full-stack/java/basics
javac src/10-interface-polymorphism/*.java -d out
java -cp out InterfaceDemo
```

---

## 3. 要点小结

- **接口里**：只写方法签名（返回值 + 方法名 + 参数），不写方法体；实现类必须全部实现。
- **多态**：`Shape s = new Circle(); s.describe();` 编译看 Shape 有没有 describe，运行执行 Circle 的 describe。
- **和继承的区别**：继承是「is-a」关系（Dog 是一种 Animal）；接口是「能做什么」的约定（Circle 是一种 Shape，能 describe）。一个类可以 implements 多个接口，但只能 extends 一个父类。

更多注释见源码（Shape.java、Circle.java、Rectangle.java、InterfaceDemo.java）。
