# 学习案例：集合 ArrayList、HashMap 增删改查 + List 存多条数据

本案例对应：**ArrayList**（列表）、**HashMap**（键值对）的增删改查，以及**用 List 存多条数据**的写法。

---

## 1. 概念速览

| 类型 | 说明 | 常用方法 |
|------|------|----------|
| **ArrayList** | 可变长度列表，泛型如 List&lt;String&gt; 表示元素类型 | add、remove、set、get、size、contains |
| **HashMap** | 键值对，根据 key 取 value | put、get、remove、containsKey、containsValue、size |

---

## 2. 代码位置与运行

- **ArrayList**：`basics/src/12-collections/ArrayListDemo.java`（增删改查 + 用 List 存多条 BookItem）
- **HashMap**：`basics/src/12-collections/HashMapDemo.java`（增删改查）

在 `full-stack/java/basics` 目录下执行：

```bash
javac src/12-collections/ArrayListDemo.java -d out && java -cp out ArrayListDemo
javac src/12-collections/HashMapDemo.java -d out && java -cp out HashMapDemo
```

---

## 3. List 存多条数据的典型写法

```java
List<BookItem> list = new ArrayList<>();
list.add(new BookItem("书名", 59.0));
list.add(new BookItem("另一本", 89.0));
for (BookItem b : list) {
    System.out.println(b.title + " " + b.price);
}
```

每条数据是一个对象，多个对象放进同一个 List，再遍历即可。
