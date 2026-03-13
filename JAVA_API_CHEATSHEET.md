# Java 常用 API 分类速查

按「数组、对象、字符串、数值」分类，列出本仓库示例里用到的常用 API，便于查阅。示例文件在 **java/basics/src/** 下。

---

## 一、数组（Array）

**示例文件：** `java/basics/src/ArrayDemo.java`（含 Arrays 工具类与 Stream）

| 用法 | 说明 |
|------|------|
| `int[] arr = { 1, 2, 3 };` | 声明并赋初值（简写） |
| `int[] arr = new int[] { 1, 2, 3 };` | 完整写法，也可用于传参、赋值 |
| `arr.length` | 数组长度（只读） |
| `arr[i]` | 访问 / 赋值下标 i |
| `Arrays.toString(arr)` | 把数组转成可读字符串，如 "[1, 2, 3]" |
| `Arrays.sort(arr)` | 原地排序 |
| `Arrays.copyOf(arr, len)` | 复制数组，可截断或补 0 |
| `Arrays.copyOfRange(arr, from, to)` | 复制 [from, to) 区间 |
| `Arrays.equals(a, b)` | 两数组内容是否相等 |
| `Arrays.asList(1, 2, 3)` | 用元素快速得到 List（固定大小） |
| `Arrays.asList(stringArray)` | 引用类型数组转 List |
| `Arrays.stream(int[])` | 基本类型数组得到 IntStream 等 |
| `list.stream().filter(...).map(...).collect(Collectors.toList())` | List 的 Stream：过滤、映射、收集成 List |
| `list.stream().anyMatch(...)` | 是否有元素满足条件（类似 some） |
| `list.stream().allMatch(...)` | 是否全部满足（类似 every） |

---

## 二、对象（Object）

**示例文件：** `java/basics/src/ObjectDemo.java`

| 用法 | 说明 |
|------|------|
| `obj.getClass()` | 得到 Class 对象，如 getSimpleName() 拿类名 |
| `obj.toString()` | 转成字符串，默认 "类名@哈希"，可重写 |
| `obj.equals(other)` | 逻辑相等，默认用 ==，一般重写 |
| `obj.hashCode()` | 哈希值，和 equals 配套 |
| `obj == other` | 引用是否同一个对象 |

---

## 三、字符串（String）

**示例文件：** `java/basics/src/StringDemo.java`

| 用法 | 说明 |
|------|------|
| `s.length()` | 字符个数 |
| `s.isEmpty()` | 是否 "" |
| `s.charAt(i)` | 下标 i 的字符 |
| `s.substring(from, to)` | [from, to) 子串；substring(from) 到末尾 |
| `s.indexOf(str)` / `s.indexOf(ch)` | 首次出现下标，无则 -1 |
| `s.lastIndexOf(str)` | 最后一次出现下标 |
| `s.contains(str)` | 是否包含 |
| `s.startsWith(prefix)` / `s.endsWith(suffix)` | 是否以某串开头/结尾 |
| `s.replace(old, new)` | 替换全部，得到新串 |
| `s.replaceFirst(old, new)` | 只替换第一个 |
| `s.toUpperCase()` / `s.toLowerCase()` | 大小写 |
| `s.trim()` | 去掉首尾空白 |
| `s.split(正则)` | 按正则分割成 String[] |
| `String.join(分隔符, 多个串或数组)` | 用分隔符拼接 |
| `s.equals(other)` | 内容相等（不要用 ==） |
| `s.equalsIgnoreCase(other)` | 忽略大小写比较 |
| `String.format("格式", 参数...)` | 格式化，%s %d %f 等 |
| `StringBuilder` | append/insert/delete，最后 toString()，适合大量拼接 |

---

## 四、数值（Number / Math）

**示例文件：** `java/basics/src/NumberDemo.java`

| 用法 | 说明 |
|------|------|
| `Integer.parseInt(str)` | 字符串 → int |
| `Double.parseDouble(str)` | 字符串 → double |
| `Long.parseLong(str)` | 字符串 → long |
| `String.valueOf(数)` / `Integer.toString(n)` | 数 → 字符串 |
| `Math.max(a, b)` / `Math.min(a, b)` | 最大 / 最小 |
| `Math.abs(x)` | 绝对值 |
| `Math.round(x)` | 四舍五入（double→long） |
| `Math.floor(x)` / `Math.ceil(x)` | 向下/向上取整 |
| `Math.pow(a, b)` | a 的 b 次方 |
| `Math.sqrt(x)` | 平方根 |
| `Math.random()` | [0.0, 1.0) 随机数 |
| `Integer.valueOf(i)` | 基本类型 → 包装类 |
| `obj.intValue()` | 包装类 → 基本类型（拆箱） |
| `Integer.compare(a, b)` | 比较，<0 =0 >0 |

---

## 示例文件与运行方式

所有示例在 **java/basics** 下，进入该目录后执行（`cd full-stack/java/basics`）：

| 文件 | 内容 | 运行命令 |
|------|------|----------|
| BasicsDemo.java | 变量、类型、if/for/while | `javac src/BasicsDemo.java -d out && java -cp out BasicsDemo` |
| ArrayDemo.java | 数组、Arrays、Stream | `javac src/ArrayDemo.java -d out && java -cp out ArrayDemo` |
| StringDemo.java | 字符串常用 API | `javac src/StringDemo.java -d out && java -cp out StringDemo` |
| NumberDemo.java | 数值、Math、包装类 | `javac src/NumberDemo.java -d out && java -cp out NumberDemo` |
| ObjectDemo.java | 对象、equals/toString | `javac src/ObjectDemo.java -d out && java -cp out ObjectDemo` |
