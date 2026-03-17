# 数组与 List 的几种定义、什么时候用哪种

常看到的三种写法容易混，这里统一说明。

---

## 对照表

| 写法 | 是什么 | 什么时候用 |
|------|--------|------------|
| `int[] nums = { 1,2,3 };` 或 `new int[]{ 1,2,3 }` | **数组**，长度固定 | 元素个数不变、用下标访问、基本类型时用。传参或赋值给已有变量时必须写 `new int[]{ ... }`。 |
| `List<Integer> list = Arrays.asList(10, 20, 30);` | **固定大小的 List**，不能 add/remove | 只读、做 Stream、传给要 List 的 API 时用。不能后续增删。 |
| `List<String> names = new ArrayList<>();` | **可变的 List**，可 add/remove | 需要动态增删、存「多条数据」时用。日常业务里最常用。 |

---

## 记忆

- **数组** = 定长，适合固定个数、下标访问。
- **Arrays.asList** = 定长 List（只读），适合一次性构造、不增删。
- **new ArrayList** = 可变 List（可增删），适合列表会变化的场景。

详细示例见博客文章《Java 数组与 Arrays 工具类实战》中的「数组与 List 的几种定义」小节，以及 `basics/src/03-array/`、`basics/src/12-collections/` 下的代码。
