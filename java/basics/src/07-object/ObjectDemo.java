/**
 * ============================================
 * 分类：对象（Object）与常用 Object API
 * ============================================
 *
 * Java 里所有类都继承 Object。这里演示：自定义类、equals/toString、以及 Object 常用方法。
 * 运行：javac src/ObjectDemo.java -d out && java -cp out ObjectDemo
 */
public class ObjectDemo {

    public static void main(String[] args) {

        // ==================== 一、自定义类与 new ====================
        User u = new User("张三", 18);
        User u2 = new User("李四", 20);

        System.out.println("--- 对象 ---");
        System.out.println("u.name = " + u.getName() + ", u.age = " + u.getAge());

        // ==================== 二、Object 常用 API ====================
        // getClass()：得到类的 Class 对象，可拿类名等
        Class<?> clazz = u.getClass();
        System.out.println("getClass().getSimpleName() = " + clazz.getSimpleName());

        // toString()：把对象转成字符串，默认是 "类名@哈希"；可重写为可读内容
        String str = u.toString();
        System.out.println("u.toString() = " + str);

        // equals(Object obj)：判断与另一个对象是否「逻辑相等」；默认用 ==（引用相等），一般会重写
        boolean same = u.equals(u2);
        System.out.println("u.equals(u2) = " + same);

        // hashCode()：和 equals 配套，用于 HashMap 等；equals 相等则 hashCode 应相等
        int hash = u.hashCode();
        System.out.println("u.hashCode() = " + hash);

        System.out.println("--- ObjectDemo 结束 ---");
    }

    /**
     * 简单「数据类」，演示字段、构造、getter、重写 toString/equals。
     */
    static class User {
        private final String name;
        private final int age;

        public User(String name, int age) {
            this.name = name;
            this.age = age;
        }

        public String getName() { return name; }
        public int getAge() { return age; }

        @Override
        public String toString() {
            return "User{name='" + name + "', age=" + age + "}";
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (obj == null || getClass() != obj.getClass()) return false;
            User other = (User) obj;
            return age == other.age && (name != null ? name.equals(other.name) : other.name == null);
        }

        @Override
        public int hashCode() {
            int result = name != null ? name.hashCode() : 0;
            result = 31 * result + age;
            return result;
        }
    }
}
