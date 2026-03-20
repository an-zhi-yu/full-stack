package com.anzhiyu.mavenintro;

/**
 * Maven 入门示例 —— 主类
 *
 * 【你是前端，可以这样理解】
 * - 以前：在 basics 里用 javac 手搓编译，类多了、要引第三方库就很累。
 * - Maven：约定目录（src/main/java）、一条命令编译+跑 main，依赖从「中央仓库」自动下载（类似 npm registry）。
 *
 * 【本类在 Maven 里的位置】
 * src/main/java + 包路径 com.anzhiyu.mavenintro → 必须和 package 声明一致，
 * 否则编译会报「类路径与包名不符」。
 *
 * 运行（在 maven-intro 目录下）：
 *   mvn -q compile exec:java
 *
 * 【运行结果在哪看？】
 * System.out.println 打印到「标准输出」，不会生成项目里的某个 .txt 文件。
 * 你在哪执行的命令，就在哪看：终端窗口、IDEA 底部 Terminal、或 IDEA 的 Run 窗口。
 */
public class MavenIntroApp {

    public static void main(String[] args) {
        System.out.println("========== Maven 入门示例 ==========");
        System.out.println("若你看到本行，说明：pom.xml 配置正确，且 mvn compile exec:java 已成功执行。");
        System.out.println();
        System.out.println("接下来你可以尝试：");
        System.out.println("  1. 改 pom.xml 里的 <description>，再执行 mvn -q validate 看是否报错");
        System.out.println("  2. 在 <dependencies> 里加依赖（如 Gson），执行 mvn dependency:tree");
        System.out.println("  3. 执行 mvn package 观察 target/ 下生成的 jar");
        System.out.println("====================================");

        // 依赖已在 pom.xml 声明：下面这行能编译通过，说明 Maven 把 Gson 放进了 classpath
        GsonIntroDemo.run();
    }
}
