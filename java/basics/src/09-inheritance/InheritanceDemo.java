/**
 * ============================================
 * 继承、super、重写 演示：Animal -> Dog
 * ============================================
 *
 * 运行：先编译父类再子类（或一起编译）
 *   javac src/Animal.java src/Dog.java src/InheritanceDemo.java -d out
 *   java -cp out InheritanceDemo
 */
public class InheritanceDemo {

    public static void main(String[] args) {

        // ----- 父类引用指向父类对象 -----
        Animal a = new Animal("小动物", 2);
        System.out.println("Animal: " + a);
        System.out.println("叫声: " + a.makeSound());
        a.eat();

        System.out.println("---");

        // ----- 父类引用指向子类对象（多态） -----
        Animal ref = new Dog("旺财", 3, "金毛");
        System.out.println("ref (实际是 Dog): " + ref);
        System.out.println("叫声: " + ref.makeSound());  // 实际调用的是 Dog 重写后的 makeSound()
        ref.eat();   // 实际调用的是 Dog 重写后的 eat()

        System.out.println("---");

        // ----- 子类引用，可调用子类独有方法 -----
        Dog d = new Dog("小黑", 1, "柯基");
        System.out.println("Dog: " + d);
        d.bark();
        d.eat();
    }
}
