/**
 * ============================================
 * 分类：数组（Array）+ Arrays 工具类 + Stream API
 * ============================================
 *
 * 【为什么 Stream 示例里用 List<Integer> 而不是 int[]？】
 * - Java 里 .stream() 方法定义在「集合」（Collection）上，如 List、Set，不在数组上。
 * - 所以：用 int[] 时没有 .stream()，要用 Arrays.stream(数组) 得到 IntStream；
 *   用 List<Integer> 时可以直接 list.stream() 得到 Stream<Integer>，链式写 filter/map 后
 *   用 .collect(Collectors.toList()) 得到新 List，和前端「数组进、数组出」的写法最像。
 *
 * 【为什么用 Arrays.asList() 而不是 new int[]{}？】
 * - Java 没有 [1,2,3] 这种「列表字面量」。数组用 new int[]{1,2,3} 或 {1,2,3} 声明。
 * - List 是「集合」类型，不能写 new List(){1,2,3}。Arrays.asList(10, 20, 30) 的作用就是
 *   「用一串元素快速构造一个 List」，相当于前端的 [10, 20, 30]。asList 接受可变参数，返回
 *   一个固定大小的 List（底层由数组支持）。所以写 List 的「字面量式」初值，常用 Arrays.asList(...)。
 *
 * 运行：javac src/ArrayDemo.java -d out && java -cp out ArrayDemo
 */
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class ArrayDemo {

    public static void main(String[] args) {

        // ==================== 一、数组的创建与访问 ====================
        // 基本类型数组：new 类型[] { 初值 } 或 简写 { 初值 }（仅声明时）
        int[] nums = { 3, 1, 4, 1, 5 };
        String[] words = { "你好", "世界" };

        System.out.println("--- 数组 ---");
        System.out.println("nums.length = " + nums.length);
        System.out.println("nums[0] = " + nums[0]);

        // ==================== 二、遍历数组 + 方法定义与调用 + 求最大最小值 ====================
        // 【遍历数组】用 for 逐个访问元素
        System.out.print("遍历 nums: ");
        for (int i = 0; i < nums.length; i++) {
            System.out.print(nums[i] + (i < nums.length - 1 ? ", " : "\n"));
        }
        // 【方法定义与调用】下面定义了 findMax、findMin 两个方法，这里调用它们
        int max = findMax(nums);
        int min = findMin(nums);
        System.out.println("最大值: " + max + ", 最小值: " + min);

        // ==================== 三、Arrays 工具类（操作数组的常用 API） ====================
        // 打印数组内容（直接打印 nums 只会得到引用地址，用 Arrays.toString 才能看到元素）
        System.out.println("Arrays.toString(nums) = " + Arrays.toString(nums));

        // 排序（原地修改）
        int[] copy = Arrays.copyOf(nums, nums.length);
        Arrays.sort(copy);
        System.out.println("Arrays.sort 后: " + Arrays.toString(copy));

        // 复制、填充、比较
        int[] copy2 = Arrays.copyOf(nums, 3);      // 复制前 3 个
        int[] copy3 = Arrays.copyOfRange(nums, 1, 4); // [1,4) 区间
        System.out.println("copyOf(3): " + Arrays.toString(copy2));
        System.out.println("copyOfRange(1,4): " + Arrays.toString(copy3));

        boolean same = Arrays.equals(nums, copy);  // 内容是否相等
        System.out.println("Arrays.equals(nums, copy): " + same);

        // ==================== 四、从数组得到 List（Arrays.asList） ====================
        // 引用类型数组转 List 用 Arrays.asList(数组)；或直接 Arrays.asList(元素1, 元素2, ...)
        String[] arr = { "a", "b", "c" };
        List<String> listFromArray = Arrays.asList(arr);
        List<Integer> listLiteral = Arrays.asList(10, 20, 30, 40);  // 常用：快速得到「写死的列表」

        System.out.println("--- List from array ---");
        System.out.println("listLiteral: " + listLiteral);

        // ==================== 五、Stream API（类似前端 filter / map / some） ====================
        // 对 List 用 .stream()；对 int[] 用 Arrays.stream(数组) 得到 IntStream
        System.out.println("--- Stream ---");

        // 从 List<Integer> 来（最常用写法）
        List<Integer> list = Arrays.asList(10, 20, 30, 40);
        List<Integer> filtered = list.stream().filter(x -> x > 25).collect(Collectors.toList());
        List<Integer> mapped = list.stream().map(x -> x * 2).collect(Collectors.toList());
        boolean hasBig = list.stream().anyMatch(x -> x > 35);
        boolean allBig = list.stream().allMatch(x -> x > 5);
        System.out.println("filter(x>25): " + filtered);
        System.out.println("map(x*2): " + mapped);
        System.out.println("anyMatch(x>35): " + hasBig + ", allMatch(x>5): " + allBig);

        // 从 int[] 来：Arrays.stream(基本类型数组) 得到 IntStream / LongStream / DoubleStream
        int[] intArr = { 1, 2, 3, 4, 5 };
        int sum = Arrays.stream(intArr).sum();
        long count = Arrays.stream(intArr).filter(x -> x > 2).count();
        System.out.println("Arrays.stream(intArr).sum(): " + sum);
        System.out.println("Arrays.stream(intArr).filter(x>2).count(): " + count);

        System.out.println("--- ArrayDemo 结束 ---");
    }

    /**
     * 【方法定义】求整型数组中的最大值。
     * 格式：修饰符 返回类型 方法名(参数列表) { 方法体 return 返回值; }
     */
    static int findMax(int[] arr) {
        if (arr == null || arr.length == 0) throw new IllegalArgumentException("数组不能为空");
        int max = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) max = arr[i];
        }
        return max;
    }

    /**
     * 【方法定义】求整型数组中的最小值。
     */
    static int findMin(int[] arr) {
        if (arr == null || arr.length == 0) throw new IllegalArgumentException("数组不能为空");
        int min = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] < min) min = arr[i];
        }
        return min;
    }
}
