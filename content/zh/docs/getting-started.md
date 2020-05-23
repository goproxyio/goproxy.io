---
title: "快速上手"
---

## 开启 Go module 功能

Go module 功能需要您的 Go 版本在 Go 1.11 及以上， [点击下载最新的 Go 版本](https://golang.google.cn/dl/)。开启 Go module 功能只需配置一个环境变量。

**Mac/Linux**

```shell
export GO111MODULE="on"
```
**Windows**

```shell
$env:GO111MODULE="on"
```

## 配置 Goproxy 环境变量

如果您使用的 Go 版本是 [Go 1.13](https://golang.google.cn/dl/) 及以上，我们推荐您使用下面的 Go 命令来进行配置：


```shell
go env -w GOPROXY="https://goproxy.io,direct"
```


但是如果您试用的 Go 版本小于 1.13, 可以按照下面的指引进行配置：

**Mac/Linux**

```shell
export GOPROXY="https://goproxy.io"
```
**Windows**

```shell
$env:GOPROXY="https://goproxy.io"
```

## 使配置长久生效 （可选配置）

上面的配置步骤只会当次终端内生效，如何长久生效呢，这样就不用每次都去配置环境变量了。

**Mac/Linux**

```shell
# 设置你的 bash 环境变量
echo "export GOPROXY=https://goproxy.io" >> ~/.profile && source ~/.profile

# 如果你的终端是 zsh，使用以下命令
echo "export GOPROXY=https://goproxy.io" >> ~/.zshrc && source ~/.zshrc
```

**Windows**

```
1. 右键 我的电脑 -> 属性 -> 高级系统设置 -> 环境变量
2. 在 “[你的用户名]的用户变量” 中点击 ”新建“ 按钮
3. 在 “变量名” 输入框并新增 “GOPROXY”
4. 在对应的 “变量值” 输入框中新增 “https://goproxy.io”
5. 最后点击 “确定” 按钮保存设置
```
