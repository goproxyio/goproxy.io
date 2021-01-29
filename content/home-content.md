---
title: ''
---

### Easy to set up

**Mac/Linux**

```shell
export GOPROXY=https://goproxy.io,direct
```

**Windows Powershell**

```shell
$env:GOPROXY="https://goproxy.io,direct"
```

**Optional Settings**

```
# Set environment variable allow bypassing the proxy for selected modules (optional)
go env -w GOPRIVATE="*.corp.example.com,github.com/org_private"
```

Now, when you build your applications, `Go` will fetch dependencies via goproxy.io. You can also permanently export the `GOPROXY` environment in `~/.bashrc` or `~/.profile` file. If Go version < 1.13, we recommend you [update to the latest version](https://gomirrors.org). See more information in the [documention](docs/getting-started.html).
