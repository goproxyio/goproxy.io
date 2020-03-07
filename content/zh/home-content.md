---
title: ''
---

### 如果您使用的 Go 版本是 1.13及以上 （推荐）

```shell
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.io,direct

# 设置不走 proxy 的私有仓库，多个用逗号相隔（可选）
go env -w GOPRIVATE=*.corp.example.com
```

### 如果您使用的 Go 版本是 1.12 及以下

在 Linux 或 macOS 上面，需要运行下面命令：

**Bash (Linux or macOS)**

```shell
# 启用 Go Modules 功能
export GO111MODULE=on
# 配置 GOPROXY 环境变量
export GOPROXY=https://goproxy.io
```

或者，可以把上面的命令写到`.bashrc`或`.bash_profile`文件当中。

在 Windows 上，需要运行下面命令：

**PowerShell (Windows)**

```shell
# 启用 Go Modules 功能
$env:GO111MODULE="on"
# 配置 GOPROXY 环境变量
$env:GOPROXY="https://goproxy.io"
```

现在，当你构建或运行你的应用时，Go 将会通过 goproxy.io 获取依赖。更多信息请查看 [使用指引](docs/getting-started.html)。
