---
title: GOSUMDB 环境变量
---

## Go checksum database

不得不说，Go 官方对安全问题前所未有的重视，随着 Go module 功能的引入，包依赖的安全问题引起了 Go team 的关注，经过激烈的讨论，最终决定推出一个全球的依赖包 [Certificate Transparency log](https://www.certificate-transparency.org/) 中心。CT log最初其实是在证书领域被应用的，由于一些CA乱颁发或者由于安全问题被签发了很多有问题的可信证书，最终导致严重的安全问题。CT服务的推出让所有被签发的证书公开透明，很容易就能发现有人恶意签发可信证书，窃取用户加密数据。当然了，现在的 chrome 早就支持了CT。回过头来，为了保证开发者的依赖库不被人恶意劫持篡改，Go team 推出了 Go module checksum database。服务器地址为：[sum.golang.org](https://sum.golang.org/)。当你在本地对依赖进行变动（更新/添加）操作时，Go 会自动去这个服务器进行数据校验，保证你下的这个代码库和世界上其他人下的代码库是一样的。如果有问题，会有个大大的安全提示。当然背后的这些操作都已经集成在 Go 里面了，开发者不需要进行额外的操作。

Go1.13 会尝试对你的每一次依赖包下载操作进行验证，从而保证你下载的依赖包始终是一致的。这样就保证了每一次的编译都是可重复的，也能很好的发现异常的变更。和 `go.mod` 一样，Go 会帮我们维护一个名为 `go.sum` 的文件，它包含了对依赖包进行计算得到的校验值，文件中的每一行由三部分组成：

```
<module> <version>[/go.mod] <hash>
```

如果 go.sum 中的校验匹配失败了，Go 在编译下载的时候会给出提示，一定要关注下为什么今天你下载的代码和昨天不一样了。

环境变量 `GOSUMDB` 可以用来配置你使用哪个校验服务器和公钥来做依赖包的校验, 就像下面:

	GOSUMDB="sum.golang.org"

Go1.13 中当设置了 GOPROXY="https://proxy.golang.org" 时 GOSUMDB 默认指向 "sum.golang.org"，其他情况默认都是关闭的状态。如果设置了 GOSUMDB 为 “off” 或者使用 go get 的时候启用了 `-insecure` 参数，Go 不会去对下载的依赖包做安全校验，存在一定的安全隐患，所以给大家推荐接下来的环境变量。

如果你的代码仓库或者模块是私有的，那么它的校验值不应该出现在互联网的公有数据库里面，但是我们本地编译的时候默认所有的依赖下载都会去尝试做校验，这样不仅会校验失败，更会泄漏一些私有仓库的路径等信息，我们可以使用 `GONOSUMDB` 这个环境变量来设置不做校验的代码仓库， 它可以设置多个匹配路径，用逗号相隔.
举个例子,

```
GONOSUMDB=*.corp.example.com,rsc.io/private
```

这样的话，像 "git.corp.example.com/xyzzy", "rsc.io/private", 和 "rsc.io/private/quux"这些公司和自己的私有仓库就都不会做校验了。

## 使用 GOSUMDB 保证下载依赖的完整性和安全性

由于众所周知的原因，golang 的服务器由 Google 托管，所以这项服务我们并不能顺利享受到，那么我们如何能享受到这项集成在 1.13 版本中的服务呢，不用慌，google 特别为我们推出了 [sum.golang.google.cn](https://sum.golang.google.cn/)， 通过设置环境变量进行配置：

Bash（MAC/Linux）:

```
export GOSUMDB=sum.golang.google.cn
```

PowerShell（Windows）:

```
$env:GOSUMDB = "sum.golang.google.cn"
```

Disable:

```
 GOSUMDB='off'
```

[goproxy.io](https://goproxy.io/) 也已经第一时间完成了对 `sum.golang.org` 和 `sum.golang.google.cn` 的代理的支持, 大家不用担心访问不到这两个服务。

![](https://baokun.li/images/2019/proxy-sum.png)

Happy coding，gophers！

References:

- *[https://goproxy.io/](https://goproxy.io/)*
- *[https://sum.golang.org/](https://sum.golang.org/)*
