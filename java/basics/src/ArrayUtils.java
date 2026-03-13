/**
 * ============================================
 * 工具类（Utils）：专门放静态方法的类，类似前端的 utils
 * ============================================
 *
 * Java 里和前端 utils 一样，可以建一个类专门放「公共的、不依赖对象」的方法，
 * 全部写成 public static，用 类名.方法名(参数) 调用。JDK 里比如 Arrays、Math、Collections 都是这种。
 * 这样 ArrayDemo 只负责「演示数组用法」，求最大最小值这种通用逻辑放在 ArrayUtils 里更合适。
 */
public class ArrayUtils {

    /** 求整型数组最大值 */
    public static int findMax(int[] arr) {
        if (arr == null || arr.length == 0) throw new IllegalArgumentException("数组不能为空");
        int max = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) max = arr[i];
        }
        return max;
    }

    /** 求整型数组最小值 */
    public static int findMin(int[] arr) {
        if (arr == null || arr.length == 0) throw new IllegalArgumentException("数组不能为空");
        int min = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] < min) min = arr[i];
        }
        return min;
    }
}
