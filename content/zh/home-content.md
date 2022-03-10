---
title: ''
---

### 您只需通过简单设置

**Bash (Linux or macOS)**

```shell
# 配置 GOPROXY 环境变量
export GOPROXY=https://proxy.golang.com.cn,direct
# 还可以设置不走 proxy 的私有仓库或组，多个用逗号相隔（可选）
export GOPRIVATE=git.mycompany.com,github.com/my/private
```

**PowerShell (Windows)**

```shell
# 配置 GOPROXY 环境变量
$env:GOPROXY = "https://proxy.golang.com.cn,direct"
# 还可以设置不走 proxy 的私有仓库或组，多个用逗号相隔（可选）
$env:GOPRIVATE = "git.mycompany.com,github.com/my/private"
```

设置完上面几个环境变量后，您的 `go` 命令将从公共代理镜像中快速拉取您所需的依赖代码了。或者，还可以根据[文档](docs/getting-started.html)进行设置使其长期生效。如果您使用的是老版本的 Go（< 1.13）, 我们建议您[升级为最新稳定版本](https://gomirrors.org)。
