---
title: ''
---

### 如果您使用的 Go 版本是 1.13 及以上 （推荐）

```shell
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.io,direct

# 设置不走 proxy 的私有仓库，多个用逗号相隔（可选）
go env -w GOPRIVATE=*.corp.example.com

# 设置不走 proxy 的私有组织（可选）
go env -w GOPRIVATE=example.com/org_name
```

设置完上面几个环境变量后，您的 `go` 命令将从公共代理镜像中快速拉取您所需的依赖代码了。[私有库的支持请看这里](docs/goproxyio-private.html)。

### 如果您使用的 Go 版本是 1.12 及以下

**Bash (Linux or macOS)**

```shell
# 启用 Go Modules 功能
export GO111MODULE=on
# 配置 GOPROXY 环境变量
export GOPROXY=https://goproxy.io
```

或者，根据[文档](docs/getting-started.html)可以把上面的命令写到`.profile`或`.bash_profile`文件中长期生效。


**PowerShell (Windows)**

```shell
# 启用 Go Modules 功能
$env:GO111MODULE="on"
# 配置 GOPROXY 环境变量
$env:GOPROXY="https://goproxy.io"
```

现在，当你构建或运行你的应用时，Go 将会通过 goproxy.io 获取依赖。更多信息请查看 [使用指引](docs/getting-started.html)。
