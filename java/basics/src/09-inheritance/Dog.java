/**
 * ============================================
 * 子类：狗（继承 Animal、super、重写）
 * ============================================
 *
 * - extends Animal：继承父类的 name、age、getter/setter、eat()、toString() 等。
 * - super(name, age)：子类构造里必须先调用父类构造，用 super(...) 传参。
 * - @Override makeSound()：重写父类方法，多态时调用的是子类实现。
 * - super.eat()：在子类方法里调用父类同名方法。
 */
public class Dog extends Animal {

    private String breed;  // 子类独有字段：品种

    /**
     * 子类构造方法必须先调用父类构造（super 必须在第一行）。
     */
    public Dog(String name, int age, String breed) {
        super(name, age);   // 调用 Animal(String name, int age)
        this.breed = breed;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    /**
     * 重写父类的 makeSound()：狗有自己的叫声。
     * 不加 @Override 也能运行，但加上可让编译器检查是否真的在重写父类方法。
     */
    @Override
    public String makeSound() {
        return "汪汪";
    }

    /**
     * 子类独有方法。
     */
    public void bark() {
        System.out.println(getName() + "(" + breed + "): " + makeSound());
    }

    /**
     * 重写父类 eat()，先做子类逻辑，再 super.eat() 调用父类实现。
     */
    @Override
    public void eat() {
        System.out.print("狗 ");
        super.eat();
    }

    @Override
    public String toString() {
        return "Dog{name='" + getName() + "', age=" + getAge() + ", breed='" + breed + "'}";
    }
}
