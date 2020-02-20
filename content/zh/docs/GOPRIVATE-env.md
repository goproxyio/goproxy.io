---
title: GOPRIVATE 环境变量
---

完成设置后，go 命令会从公共镜像 goproxy.io 上下载依赖包，并且会对下载的软件包和代码库进行安全校验，当你的代码库是公开的时候，这些功能都没什么问题。但是如果你的仓库是私有的怎么办呢？

环境变量 GOPRIVATE 用来控制 go 命令把哪些仓库看做是私有的仓库，这样的话，就可以跳过 proxy server 和校验检查，这个变量的值支持用逗号分隔，可以填写多个值，例如：

        GOPRIVATE=*.corp.example.com,rsc.io/private

这样 go 命令会把所有包含这个后缀的软件包，包括 git.corp.example.com/xyzzy , rsc.io/private,
和 rsc.io/private/quux 都以私有仓库来对待。

另外，GOPRIVATE 环境变量可以被其他工具用来识别私有依赖，例如编辑器可以通过 GOPRIVATE 这个变量来决定是否为这个软件包添加一个指向 godoc.org 的文档链接。

为了更灵活的控制那些依赖软件包经过 proxy server 和 sumdb 校验，可以通过 GONOPROXY 和 GONOSUMDB 来单独进行控制，这两个环境变量的被设置后将覆盖 GOPRIVATE 环境变量，同样这两个变量也支持逗号分隔。

举个例子，如果公司内部提供了一个私有的 git server，用户可以这样来设置：

        GOPRIVATE=*.corp.example.com
        GOPROXY=proxy.example.com
        GONOPROXY=none

这样 go 命令和其他工具就会把 corp.example.com 这个域名下的依赖包识别成私有的，但是用户仍然会从公司内部的代理镜像服务器 proxy.example.com 上下载所有公有和私有的仓库，因为用户设置了  GONOPROXY=none， 这个设置会覆盖 GOPRIVATE 变量。