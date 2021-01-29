---
title: ''
---

### 您只需通过简单设置

**Mac/Linux**

```shell
export GOPROXY=https://goproxy.io,direct
```

**Windows**

```shell
$env:GOPROXY="https://goproxy.io,direct"
```

**可选设置**

```shell
# 还可以设置不走 proxy 的私有仓库或组，多个用逗号相隔（可选）
go env -w GOPRIVATE=*.corp.example.com,github.com/org_private
```

设置完上面几个环境变量后，您的 `go` 命令将从公共代理镜像中快速拉取您所需的依赖代码了。或者，还可以根据[文档](docs/getting-started.html)进行设置使其长期生效。如果您使用的是老版本的 Go（< 1.13）, 我们建议您[升级为最新稳定版本](https://gomirrors.org)。
