---
title: "【Python】Bug 记录"
excerpt: "【Python】如何解决：无法定位程序输入点XXX于动态链接库D:/Anaconda/ibrarnybin/pythoncom38.dll上"
coverImage: "/assets/blog/images/problem1.png"
date: "2021-11-22T12:47:24.000Z"
author:
  name: Wayne
  picture: "/assets/blog/authors/headPic.jpg"
ogImage:
  url: "/assets/blog/images/problem1.png"
---

# 项目场景：

&emsp;&emsp;在使用 jupyter notebook打开项目文件报错：无法定位程序输入点XXX于动态链接库D:/Anaconda/ibrarnybin/pythoncom38.dll上
=====

# 问题描述：

装好了jupyter notebook后我兴致冲冲地想去写大作业，结果刚新建了个文件就弹出了如下对话框：
![在使用 jupyter notebook打开项目文件报错](/assets/blog/images/problem1.png)啊~~ 美好的一天从bug开始



=====

# 原因分析：

&emsp;&emsp;在我去网上搜索了一番之后，锁定原因出在了pythoncom38.dll文件上，于是我就找到了这个文件所在位置，发现在D:\Anaconda\Lib\site-packages\win32还有一个同名的文件。

=====

# 解决方案：

&emsp;&emsp;翻看了一圈类似问题的解决方案，决定==删除D:Anaconda\ibrarnybin\pythoncom38.dll文件==，再次打开jupyter notebook，一切正常。建议==大家先将文件放到回收站==里，防止删除后还是出问题，方便还原。