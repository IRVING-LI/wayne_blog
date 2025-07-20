---
title: "使用MD5加密密码进行注册登录"
excerpt: "本程序实现了利用MD5对密码进行加密并且进行简单注册和登录验证的功能"
coverImage: "/assets/blog/images/security.jpg"
date: "2021-11-22T13:15:29.000Z"
author:
  name: Wayne
  picture: "/assets/blog/authors/headPic.jpg"
ogImage:
  url: "/assets/blog/images/security.jpg"
---

### 前言
&emsp;&emsp;本程序实现了利用MD5对密码进行加密并且进行简单注册和登录验证的功能，总体思路为：ResignServlet获取注册界面表单中用户名、密码、账号的值，调取底层用来连接数据库的SqlConnect和用来进行MD5加密的MD5对密码进行加密并且将用户名、密码、账号的值插入数据库当中。在登录界面输入账号密码之后，根据账号对数据库进行查询，返回查询到的数据，将其与用户输入密码加密后的值进行对比，如果相同，则进入登录成功界面；如果不相同，则进入登录失败界面，并在3秒后返回登录界面。
### 核心代码
##### 进行MD5加密的代码段
*MD5.java*
```java
package com.example.demo.utils;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MD5 {
    public static String md5(String str) throws NoSuchAlgorithmException
    {
        MessageDigest md5 = MessageDigest.getInstance("MD5");
        byte[] srcBytes = str.getBytes(StandardCharsets.UTF_8);
        md5.update(srcBytes);
        byte[] resultBytes = md5.digest();
        return new String(resultBytes);
    }
}
```
##### 连接数据库的代码段
*SqlConnect.java*
```java
package com.example.demo.utils;

import java.sql.*;

public class SqlConnect {
    private static final String DRIVER = "com.mysql.jdbc.Driver";
    private static final String URL = "jdbc:mysql://localhost:3306/md5";
    private static final String USER = "root";
    private static final String PWD = "111111";
    Connection conn = null;
    public void insert(String sql){
        try {
            Class.forName(DRIVER);
            conn = DriverManager.getConnection(URL,USER,PWD);
            System.out.println("连接数据库...");

            Statement stat = conn.createStatement();
            stat.executeUpdate(sql);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
    public ResultSet select(String sql) throws SQLException, ClassNotFoundException {
        // 注册 JDBC 驱动
        Class.forName(DRIVER);
        System.out.println("连接数据库...");
        conn = DriverManager.getConnection(URL,USER,PWD);
        Statement stat = conn.createStatement();
        ResultSet rs = stat.executeQuery(sql);
        return rs;
    }
}
```
##### ResignServlet对注册界面的表单数据进行接收，并且将数据加密后插入数据库
*ResignServlet.java*
```java
package com.example.demo.servlets;

import com.example.demo.utils.MD5;
import com.example.demo.utils.SqlConnect;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;


@WebServlet(name = "Servlet", value = "/Servlet")
public class ResignServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("连接到servlet");
        String pwd = request.getParameter("pwd");
        String zh = request.getParameter("account");
        String name = request.getParameter("name");
        System.out.println("密码为"+pwd);
        System.out.println("账号为"+zh);
        System.out.println("用户名为"+name);

        try {
            String password = MD5.md5(pwd);
            String sql = "INSERT INTO users(account,password,name)VALUES('"+zh+"','"+password+"','"+name+"');";
            SqlConnect con = new SqlConnect();
            con.insert(sql);
            response.sendRedirect("/demo_war_exploded/login.jsp");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
    }
}
```
##### LoginServlet对登录界面进行数据接收，依据账号对数据库进行查询并返回结果，如果与用户输入密码加密后的值相同则进入登录成功处理，不然则进行登录失败处理

*LoginServlet.java*
```java
package com.example.demo.servlets;

import com.example.demo.utils.MD5;
import com.example.demo.utils.SqlConnect;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.sql.ResultSet;
import java.sql.SQLException;

@WebServlet(name = "LoginServlet", value = "/LoginServlet")
public class LoginServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request,response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String name = request.getParameter("account");
        String pwd = request.getParameter("pwd");
        try {
            String password = MD5.md5(pwd);
            String sql = "SELECT password FROM users WHERE account='"+name+"';";
            SqlConnect con = new SqlConnect();
            ResultSet rs = null;
            rs = con.select(sql);
            while (rs.next()){
                if (rs.getString(1).equals(password)){
                    System.out.println("密码正确！！！");
                    response.sendRedirect("/demo_war_exploded/success.jsp");
                }
                else{
                    System.out.println("密码错误！！！");
                    response.sendRedirect("/demo_war_exploded/lose.jsp");
                }
            }

        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        catch (SQLException throwables) {
            throwables.printStackTrace();
        }catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```
### 附：
数据库部分可以依照自己需求进行建表
[源代码下载戳这里！](https://gitee.com/cant-catch-up-with-tomorrow/java-web-md5-login/tree/master/demo)
