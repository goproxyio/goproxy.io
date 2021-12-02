---
title: 部署公司内部自己的 goproxy.io 服务
---

![golang](/images/code1.jpg)

随着 go module 的不断普及，通常情况下，我们可以直接使用 `goproxy.io` 公共服务来解决海外依赖问题，但是有时候公司内部的仓库就很难办了，这些 git server 通常运行在企业内网环境下，开发人员既想能快速的下载海外依赖，又想能下载到公司内部的代码库。这时候可以在公司内部部署一个属于自己的 goproxy.io 服务来解决这个问题。还有哪些场景需要我们自己部署公司内部的 goproxy server 呢

* 访问公司内网的 git server
* 防止公网仓库变更或者消失，导致线上编译失败或者紧急回退失败
* 公司审计和安全需要
* 防止公司内部开发人员配置不当造成 import path 泄露
* cache 热点依赖，降低公司公网出口带宽

## 编译

确保要运行的服务器是已经安装了 go 命令，goproxy 项目是开源的，用 go 语言开发，使用 go modules 可以很方便的进行编译：

```shell
git clone https://github.com/goproxyio/goproxy.git
cd goproxy
make
```
## 服务运行模式

编译好的文件位置是 `./bin/goproxy` ， 使用 `./bin/goproxy -h` 查看参数使用说明：

```shell
Usage of ./bin/goproxy:
  -cacheDir string
        go modules cache dir  [指定 Go 模块的缓存目录]
  -exclude string
        exclude host pattern  [proxy 模式下指定哪些 path 不经过上游服务器]
  -listen string
        service listen address [服务监听端口，默认 8081]
  -proxy string
        next hop proxy for go modules [指定上游 proxy server，推荐 goproxy.io]
```
### Proxy Mode

如果服务没有访问海外资源的需求，只访问公司内部资源可以不指定上游服务器，启动服务：

```shell
./bin/goproxy -listen=0.0.0.0:80 -cacheDir=/tmp/test
```

### Router Mode

```

                                         direct
                      +----------------------------------> private repo
                      |
                 match|pattern
                      |
                  +---+---+           +----------+
go get  +-------> |goproxy| +-------> |goproxy.io| +---> golang.org/x/net
                  +-------+           +----------+
                 router mode           proxy mode
```

使用 `-proxy` 参数启用 `Router mode`, Router 模式下你将可以配置哪些仓库从海外获取，哪些仓库从公司内部获取， 启动服务命令如下：

```shell
./bin/goproxy -listen=0.0.0.0:80 -cacheDir=/tmp/test -proxy https://goproxy.io -exclude "git.corp.example.com,rsc.io/private"
```

## 使用 docker 运行服务

如果上面这些你感觉非常麻烦，可以直接用 docker hub 上编译好的镜像来运行这个服务：

```
docker run -d -p80:8081 goproxy/goproxy
```

这样服务就运行在本地的 80 端口服务上了。

## 测试

在本地开发机上，通过环境变量将 proxy server 指定到你刚部署的服务器：

Mac 和 Linux 用户：
```shell
export GO111MODULE=on
export GOPROXY=http://[你的服务器IP]:80
```

如果是 windows 用户：

```
$env:GO111MODULE="on"
$env:GOPROXY="http://[你的服务器IP]:80"
```

接着运行下面命令，查看是否成功，观察服务器日志输出是否正常。

> go get github.com/pkg/errors

最后再给自己的服务绑定个域名就大功告成了。有任何问题和bug，欢迎[点击这里](https://github.com/goproxyio/goproxy/issues/new)进行反馈。