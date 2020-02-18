---
title: ''
---

在 Linux 或 macOS 上面，需要运行下面命令：

### Bash (Linux or maxOS)

```shell
# 启用 Go Modules 功能
export GO111MODULE=on
# 配置 GOPROXY 环境变量
export GOPROXY=https://goproxy.io
```

或者，可以把上面的命令写到`.bashrc`或`.bash_profile`文件当中。

在 Windows 上，需要运行下面命令：

### PowerShell (Windows)

```shell
# 启用 Go Modules 功能
$env:GO111MODULE="on"
# 配置 GOPROXY 环境变量
$env:GOPROXY="https://goproxy.io"
```

现在，当你构建或运行你的应用时，Go 将会通过 goproxy.io 获取依赖。更多信息请查看 [goproxy](https://github.com/goproxyio/goproxy) 仓库。

如果你使用的 Go 版本>=1.13, 你可以通过设置 GOPRIVATE 环境变量来控制哪些私有仓库和依赖(公司内部仓库)不通过 proxy 来拉取，直接走本地，设置如下：

**Go version >= 1.13**

```shell
go env -w GOPROXY=https://goproxy.io,direct
# 设置不走 proxy 的私有仓库，多个用逗号相隔
go env -w GOPRIVATE=*.corp.example.com
```
