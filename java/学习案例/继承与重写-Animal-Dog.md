# 学习案例：继承、super、重写（Animal -> Dog）

本案例对应 Java 基础中的：**继承（extends）**、**super**、**方法重写（Override）**，通过父类 `Animal` 与子类 `Dog` 来练习。

---

## 1. 概念速览

| 概念 | 说明 |
|------|------|
| **继承（extends）** | 子类拥有父类的字段和方法，可在此基础上新增或重写。 |
| **super** | 在子类中访问父类：`super(参数)` 调用父类构造（必须放在子类构造第一行）；`super.方法名()` 调用父类方法。 |
| **重写（Override）** | 子类定义与父类**同名、同参数**的方法，运行时按实际对象类型调用子类实现（多态）。 |

---

## 2. 代码位置与运行

- **父类**：`basics/src/09-inheritance/Animal.java`（name、age、makeSound()、eat()、toString()）
- **子类**：`basics/src/09-inheritance/Dog.java`（extends Animal、super、重写 makeSound()/eat()/toString()、子类独有 breed、bark()）
- **演示**：`basics/src/09-inheritance/InheritanceDemo.java`（父类/子类对象、多态、子类独有方法）

在 `full-stack/java/basics` 目录下执行：

```bash
cd full-stack/java/basics
javac src/09-inheritance/*.java -d out
java -cp out InheritanceDemo
```

---

## 3. 要点小结

- **子类构造第一行**：必须先写 `super(参数)` 调用父类构造，否则编译报错。
- **重写规则**：方法名、参数列表与父类一致；建议加 `@Override`，便于编译器检查。
- **多态**：`Animal ref = new Dog(...)` 时，`ref.makeSound()` 实际执行的是 `Dog` 的 `makeSound()`。

更多注释见源码（`Animal.java` / `Dog.java` / `InheritanceDemo.java`）。
