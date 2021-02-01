---
title: GoLand 中配置 goproxy
---

当我们使用 GoLand 进行开发时, 可以配置 goproxy 来拉取所需依赖代码。

配置路径: `GoLand --> Perferences --> Go --> Go Modules（vgo）--> Proxy`  

proxy 中填写`https://goproxy.io,direct` , 修改完重启生效。详细信息如下:

![goland-preferences](/images/goland-preferences.png)

![goland-proxy](/images/goland-proxy.png)