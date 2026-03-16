/**
 * ============================================
 * 父类：动物（继承、super、重写 示例）
 * ============================================
 *
 * 子类 Dog 会 extends Animal，并重写 makeSound()、可调用 super 访问父类成员。
 * 运行：见 InheritanceDemo.java
 */
public class Animal {

    private String name;
    private int age;

    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    /**
     * 父类定义的「发声」行为，子类可重写（Override）。
     */
    public String makeSound() {
        return "（动物叫声）";
    }

    /**
     * 父类方法，子类可用 super.eat() 调用。
     */
    public void eat() {
        System.out.println(name + " 在吃东西");
    }

    @Override
    public String toString() {
        return "Animal{name='" + name + "', age=" + age + "}";
    }
}
