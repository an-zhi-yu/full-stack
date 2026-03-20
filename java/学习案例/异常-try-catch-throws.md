# 学习案例：异常 try-catch、throws

本案例对应：**异常**的捕获（try-catch）、**throws** 声明、**throw** 主动抛出。

---

## 1. 常见异常类型（Throwable 体系简述）

- **Throwable** → **Error**（严重错误，一般不 catch） / **Exception**
- **Exception** → **RuntimeException**（运行时异常，非受检）与其他 **受检异常**（如 IOException）
- **RuntimeException 常见子类**：`NumberFormatException`、`IllegalArgumentException`、`ArithmeticException`、`NullPointerException`、`IndexOutOfBoundsException`、`IllegalStateException`、`ClassCastException` 等

`IllegalArgumentException`、`NumberFormatException` 都属于 RuntimeException。

## 2. 概念速览

| 概念 | 说明 |
|------|------|
| **try-catch** | 把可能出错的代码放在 try { } 里；出错时进入 catch (异常类型 e) { } 处理，避免程序直接崩溃。 |
| **throws** | 写在方法签名上，表示该方法可能抛出某类异常，由调用者处理或继续向上抛。 |
| **throw** | 在方法内主动抛出一个异常：throw new XxxException("消息"); |

---

## 3. 代码位置与运行

- **演示**：`basics/src/13-exception/ExceptionDemo.java`（NumberFormatException、ArithmeticException 的捕获；带 throws 的 setScore、throw 校验参数）

在 `full-stack/java/basics` 目录下执行：

```bash
javac src/13-exception/ExceptionDemo.java -d out && java -cp out ExceptionDemo
```

---

## 4. 要点小结

- 可能抛异常的代码放在 try 里，用 catch 按异常类型分别处理。
- 方法不想在内部 catch 时，用 throws 声明，让调用者 try-catch 或继续 throws。
- 参数不合法时可用 throw new IllegalArgumentException("说明") 主动抛异常。
