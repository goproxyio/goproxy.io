---
title: goproxy.io Private 功能介绍
---

中文版 | [English](https://goproxy.io/docs/goproxyio-private.html)

![golang](/images/private.jpg)

## 介绍

goproxy.io 是 Go 语言公共的镜像代理服务，在中国乃至全球有众多 Go 语言开发者使用。现在给大家介绍一下 `goproxy.io Private` 功能，通过这个功能，开发者可以同时缓存并加速自己海外的私有仓库和公有仓库。

## 使用指南

首先，登录 [https://user.goproxy.io](https://user.goproxy.io) 通过 github oauth 进行登录，无需注册, 点击授权后，登录成功, 如下图所示。

![private](/images/private-1.jpg)

登录成功后，点击 “New Repo” 新增自己的私有仓库授权，将 goproxy.io 生成的公钥添加到自己的私有仓库中。

![private](/images/private-2.jpg)

在 Repo URL 中添加自己已经存在的私有仓库地址 (当然公司内网的 git server goproxy.io 无法访问)，可以是 HTTPS 协议的，也可以是 SSH 协议的。然后将下面的公钥添加到自己仓库中，建议授权为只读 key。比如在 github 中进入到这个项目的主页，点击设置（Settings），然后点击左侧的 “Deploy keys”， 点击添加key（Add deploy key），将公钥复制进去，然后保存。

![private](/images/private-3.jpg)

[github 帮助文档](https://developer.github.com/v3/guides/managing-deploy-keys/#deploy-keys)

bitbucket 和 gitlab 的配置也类似，大同小异，(有问题随时提 issue 寻求帮助)[https://github.com/goproxyio/goproxy/issues/new]。


在第三方代码托管平台添加完公钥后，返回添加页面点击”Add“ 进行添加，如果不成功，请查看返回的错误日志，添加成功返回列表页面，就可以看到自己添加的仓库了。使用下面命令将页面下方 "本地设置"（Local Settings）中的环境变量进行设置, [Windows 用户可以参考这篇文章进行环境变量设置](https://goproxy.io/zh/docs/getting-started.html)。

```shell
export GOPROXY="https://yourname:ZOcfnb***5Jwq@goproxy.io,direct"
```

最后我们还要设置下环境变量 `GOSUMDB=off`, 或者设置环境变量 `GONOSUMDB="github.com/yourname/private1,gitlab.com/yourname/private2“` 跳过你配置的私有仓库的 sumdb 校验，因为是私有仓库，所以sumdb 是没办法进行检验的。为了简单操作可以禁用掉，将 export GOSUMDB=off 写入到 `~/.profile` 文件中，Windows 用户也可以在自己的系统中添加这个环境变量。

好了，一切准备就绪了，现在无论是公有仓库，还是自己的海外私有仓库都可以通过 goproxy.io 镜像来加速了, 当然了只有自己才能访问到自己配置的私有仓库。

> go get github.com/yourname/private

## 结语

目前，该功能正在灰度放量中，处于 beta 状态，每个用户可以添加 3 个私有仓库进行测试和使用，赶快来试试吧,遇到任何问题欢迎给我们反馈，[点击这里提交 issue 进行反馈](https://github.com/goproxyio/goproxy/issues/new)。

## 常见问题

### 1. 为什么我本地需要设置 `GOSUMDB=off` 环境变量 ？
因为 sumdb 无法记录私有仓库的哈希值，会导致本地的 Go 命令下载后检验失败，建议使用环境变量关闭改功能，或者使用环境变量 `GONOSUMDB` 只跳过您配置的私有库，这样虽然麻烦一些，但是更安全。

### 2. 将 token 放在 URL 中会不会有安全隐患 ？
goproxy.io 采用 HTTPS 加密协议，token 用 HTTP basic auth 放在加密的 HEADER 中，没有中间人攻击，不乱信任证书的前提下在网络传输中很难获取到你的 token，Github API 也采用的这种认证方式。即使 Token 泄露，其他人也无法登陆你的账户（githu 认证），更无法知道你配置的私有库是哪些，但是这种情况下我们还是建议你联系我们重置自己的 token。

### 3. 为什么我添加仓库总是失败呢 ？

* 首先，确保仓库的地址填写正确，您可以填写 ssh 或者 https 协议的地址。
* 确保您的仓库地址是私有的，公有仓库地址无法添加。
* 确保您的 git server goproxy可以顺利访问到。
* 最后，确保已经将 goproxy.io 生成的公钥配置到仓库中了。

### 4. 按照文档配置好后，我原来的公开仓库使用受影响吗 ？
不受影响，配置完成后，您可以同时通过 goproxy.io 服务使用公开代码库和私有代码库的加速拉取。

### 5. 我配置的私有仓库会被别人拉取到吗 ？
不会。您配置的私有仓库只有您通过自己本地配置的 token 可以拉取，其他人无法获取到。海外私有仓库经过香港服务器进行加速，也不走公开的 CDN 服务。

### 6. 每个用户可以添加多少个私有仓库 ？
每个用户可以添加 3 个私有仓库。如果不满足需求，给我们发送邮件 admin@goproxy.io ，我们帮您提升额度。

### 7. 我的 token 被泄露了怎么办 ？
请一定保存好您的 token，如果泄露了请发送邮件 admin@goproxy.io 给我们，我们将第一时间帮您重置。

### 8. 为什么我配置了私有库，但是无法获取到呢 ？
配置好自己的私有仓库后，配置会在 1 分钟左右生效，如果无法立即获取到，请稍等片刻。

### 9. 我遇到问题了，怎么反馈呢 ？
可以直接发送邮件到 admin@goproxy.io , 或者[提交 issue 进行反馈](https://github.com/goproxyio/goproxy/issues/new)。
