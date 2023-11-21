---
title: "快速上手"
---

##  Go 版本要求

建议您使用 Go 1.13 及以上版本， [可以在这里下载最新的 Go 稳定版本](https://golang.google.cn/dl/)。

## 配置 Goproxy 环境变量

**Bash (Linux or macOS)**

```shell
export GOPROXY=https://goproxy.io,direct
```

**PowerShell (Windows)**

```shell
$env:GOPROXY = "https://goproxy.io,direct"
```

## 使配置长久生效 （推荐）

上面的配置步骤只会当次终端内生效，如何长久生效呢，这样就不用每次都去配置环境变量了。

**Mac/Linux**

```shell
# 设置你的 bash 环境变量
echo "export GOPROXY=https://goproxy.io,direct" >> ~/.profile && source ~/.profile

# 如果你的终端是 zsh，使用以下命令
echo "export GOPROXY=https://goproxy.io,direct" >> ~/.zshrc && source ~/.zshrc
```

**Windows**

```
1. 右键 我的电脑 -> 属性 -> 高级系统设置 -> 环境变量
2. 在 “[你的用户名]的用户变量” 中点击 ”新建“ 按钮
3. 在 “变量名” 输入框并新增 “GOPROXY”
4. 在对应的 “变量值” 输入框中新增 “https://goproxy.io,direct”
5. 最后点击 “确定” 按钮保存设置
```
