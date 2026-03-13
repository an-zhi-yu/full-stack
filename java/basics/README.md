# Java 基础（basics）

入门示例与常用 API 演示：Hello World、变量与控制流、数组、字符串、数值、对象。

- **Main.java** / **Run.java**：入口与命令行参数。
- **BasicsDemo.java**：变量、数据类型、if/else、for、while。
- **ArrayDemo.java**：数组、遍历、方法定义与调用、求最大最小值、Arrays 工具类、Stream API。
- **StringDemo.java**：字符串常用 API。
- **NumberDemo.java**：数值、Math、包装类。
- **ObjectDemo.java**：对象、equals/toString。
- **Book.java**：类、构造方法、封装（private + getter/setter）示例。
- **BookDemo.java**：使用 Book 创建对象、调用 getter/setter。

常用 API 速查见仓库根目录 **JAVA_API_CHEATSHEET.md**。

## 运行方式

在 `full-stack/java/basics` 目录下：

```bash
cd full-stack/java/basics
javac src/Main.java -d out && java -cp out Main
javac src/ArrayDemo.java -d out && java -cp out ArrayDemo
# 其他类同理
```

在 Cursor 中打开 **java/basics** 文件夹即可运行、调试。
