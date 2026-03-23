/*
  package 声明：定义这个文件属于哪个包
  包名通常使用反向域名，确保全球唯一
  com.anzhiyu.blogapi 表示：公司域名为 anzhiyu.com，项目名为 blog-api
  
  前端类比：
  类似于文件路径 src/main.js
  这是整个应用的入口文件
*/
package com.anzhiyu.blogapi;

/*
  【问题2解答】import 是干嘛的？
  
  import 语句用于引入其他类或包，类似于前端的 import 或 require
  在 Java 中，你需要显式引入你想使用的类
  
  前端类比：
  import { createApp } from 'vue';
  import App from './App.vue';
  
  Java 的 import 也是类似的，告诉编译器：我要使用这个类
*/

/*
  引入 SpringApplication 类
  作用：Spring Boot 应用的启动类，用于启动整个应用
  
  前端类比：
  类似于 Vue 中的 createApp()
  或者 React 中的 ReactDOM.render()
  它是启动应用的入口点
*/
import org.springframework.boot.SpringApplication;

/*
  引入 SpringBootApplication 注解
  作用：标记这是一个 Spring Boot 应用的主类
  
  前端类比：
  类似于标记一个文件是应用的入口文件
  或者 Vue 中的 createApp() 的调用位置
*/
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

/*
  【问题2解答】@SpringBootApplication 是干嘛的？
  
  @SpringBootApplication 是一个组合注解，它包含了三个重要的注解：
  
  1. @Configuration：标记这是一个配置类
     - 类似于前端项目中的 vite.config.js 或 webpack.config.js
     - 用于定义 Bean（组件）的配置
  
  2. @EnableAutoConfiguration：启用自动配置
     - Spring Boot 会根据你添加的依赖自动配置项目
     - 类似于前端框架的自动配置功能
     - 例如：添加了 spring-boot-starter-web，就会自动配置 Tomcat 和 Spring MVC
  
  3. @ComponentScan：组件扫描
     - 自动扫描当前包及其子包下的所有组件
     - 类似于前端自动导入 components 目录下的所有组件
     - 它会自动发现并注册 @Controller、@Service、@Repository 等注解的类
  
  前端类比：
  类似于 Vue 中的：
  const app = createApp(App);
  app.use(router);
  app.use(store);
  app.mount('#app');
  
  或者 React 中的：
  ReactDOM.render(<App />, document.getElementById('root'));
  
  它是一个"启动器"，告诉 Spring Boot：
  "从这里开始启动应用，并自动配置和扫描组件"
*/
@SpringBootApplication
@ConfigurationPropertiesScan // 扫描带 @ConfigurationProperties 的类（如 AppDemoProperties），注册为 Bean
public class BlogApiApplication {

    /*
      main 方法：Java 应用的入口点
      
      前端类比：
      类似于前端项目的入口文件，如 main.js 或 index.js
      这是程序开始执行的地方
      
      参数说明：
      - String[] args：命令行参数
        类似于 Node.js 中的 process.argv
        可以在启动时传递参数，如：java -jar app.jar --server.port=8081
    */
    public static void main(String[] args) {
        /*
          SpringApplication.run()：启动 Spring Boot 应用
          
          参数说明：
          - BlogApiApplication.class：主类，告诉 Spring Boot 从哪里开始扫描
          - args：命令行参数
          
          前端类比：
          类似于 Vue 中的：
          createApp(App).mount('#app');
          
          或者 Express 中的：
          app.listen(3000, () => {
            console.log('Server is running on port 3000');
          });
          
          这个方法会：
          1. 创建 Spring 应用上下文（ApplicationContext）
             - 类似于创建 Vue 或 React 的应用实例
          
          2. 注册所有的 Bean（组件）
             - 类似于注册所有的组件、路由、状态管理
          
          3. 启动内嵌的 Tomcat 服务器
             - 类似于启动 Node.js 的 HTTP 服务器
          
          4. 监听指定的端口（默认 8080）
             - 类似于 app.listen(8080)
        */
        SpringApplication.run(BlogApiApplication.class, args);
    }
}

/*
  总结：
  
  1. import 语句：引入需要的类，类似于前端的 import
     - SpringApplication：启动类
     - SpringBootApplication：组合注解
  
  2. @SpringBootApplication：标记这是 Spring Boot 应用的主类
     - 包含 @Configuration（配置类）
     - 包含 @EnableAutoConfiguration（自动配置）
     - 包含 @ComponentScan（组件扫描）
  
  3. main 方法：应用入口
     - 类似于前端的 main.js
     - 程序从这里开始执行
  
  4. SpringApplication.run()：启动应用
     - 类似于 createApp().mount()
     - 启动服务器，监听端口
  
  这个文件是整个应用的"起点"，就像前端的入口文件一样。
  它负责启动整个 Spring Boot 应用，让所有的控制器、服务、配置都生效。
*/
