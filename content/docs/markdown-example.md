---
title: Markdown 示例
author: Alex Chao
createdAt: 2020-02-16
updatedAt: 2020-02-24
prev: /docs/introduction.html
next: /docs/getting-started.html
---

## 简介

[Markdown](http://en.wikipedia.org/wiki/Markdown)是一种为了提高文档易读性与易写性的纯文本格式规范，其可以转换成HTML，从而可以利用CSS定制其样式。Markdown语法非常简单，而且语法符号也是为了快速书写文本而设计。Markdown发布已经很久了，其初由John Gruber与Aaron Swartz于2004年合作发布，[最初的发布版本](https://daringfireball.net/projects/markdown/basics)。直到现在，并没有一个统一的标准规范，各个实现版本会有些不同，不过基础的语法基本是相同的。Markdown已经应用在很多地方，如Github、Stackoverflow、reddit等网站，也应用于项目的ReadMe文件、一些论坛、写邮件、博客等地方。有多种实现的语言版本，也有多个系统平台上的编辑器实现，在线编辑器也有，这些可以谷歌会得到很多结果。

## 语法

### 标题

标题是以`#`开头的文本，如`#标题`，一级标题是一个`#`号，二级两个，直到六级，分别对应HTML当中的`h1~h6`标签。

```text
#一级标题
##二级标题
###三级标题
…
######六级标题
```

### 段落

段落就是普通的文本，空行表示换一个段落。

```text
这是段落一这是段落一
这还是段落一

这是段落二
```

### 引用

引用是以`>`开头的文本。

```text
> 这是一段引用这是一段引用
> 这和上面是同一段引用
> 这和上面是同一段引用
```

### 代码

内嵌代码用反引号`` ` ``，如`` `background: #fff;` ``。代码块使用四个空格或一个Tab缩进。

### 列表

无序列表用`*`或`+`或`-`开头表示：

```text
* 项目一
* 项目二
* 项目三
```

或

```text
+ 项目一
+ 项目二
+ 项目三
```

或

```text
- 项目一
- 项目二
- 项目三
```

有序列表用数字跟一个英文句点表示：

```text
1. 项目一
2. 项目二
3. 项目三
```

### 强调

包括斜体与粗体，分别对应HTML中的`em`与`strong`标签。斜体为两边各一个`#`或`_`包裹，而粗体用`##`或`__`包裹，斜体可与粗体嵌套，比如：`##_斜粗体_##`。

```text
#斜体#
_斜体_
##粗体##
__粗体__
##_斜粗体_##`
```

### 超链接

超链接文本放在`[]`中，而超链接地址放在紧跟其后面的`()`中。

```text
[百度](http://www.baidu.com)
```

### 图片

图片与超链接语法类似：

* 一个英文感叹号`!`
* 接一个[]包裹的文本，其文本为图片无法显示时的替代文字，`![替代文字]`
* 接一个()包裹的图片链接，`![替代文字](http://www.domain.com/photo.jpg)`

在图片链接的后面还可以跟一个鼠标悬停在图片上时显示的文字：

```text
![替代文字](http://www.domain.com/photo.jpg "鼠标悬停显示的文字")
```

### 转义特殊字符

Markdown允许通过反斜杠`\`来转义下面的特殊字符：

```text
\   反斜杠
`   反引号
*   星号
_   下划线
{}  花括号
[]  方括号
()  括号
#   井号
+   加号
-   减号
.   英文句点
!   感叹号
```

## 更好的参考：

* Markdown Here Cheatsheet: [https://github.com/adam-p/markdown-here/wiki/Markdown-Here-Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Here-Cheatsheet)
* Markdown语法说明：[http://wowubuntu.com/markdown/](http://wowubuntu.com/markdown/)
* Github Markdown Basics: [https://help.github.com/articles/markdown-basics](https://help.github.com/articles/markdown-basics)
* What is Markdown: [http://whatismarkdown.com/](http://whatismarkdown.com/)

## 在线编辑器

* Cmd Markdown编辑阅读器：[https://www.zybuluo.com/mdeditor](https://www.zybuluo.com/mdeditor)
* Dillinger Online Markdown Editor: [http://dillinger.io/](http://dillinger.io/)
