---
title: ''
---

### Easy to set up

```shell
go env -w GOPROXY="https://goproxy.io,direct"

# Set environment variable allow bypassing the proxy for selected modules (optional)
go env -w GOPRIVATE="*.corp.example.com,github.com/org_private"
```

Now, when you build your applications, `Go` will fetch dependencies via goproxy.io. You can also permanently export the `GOPROXY` environment in `~/.bashrc` or `~/.profile` file. If Go < 1.13, we recommend you [update to the latest version](https://gomirrors.org). See more information in the [doc](docs/getting-started.html).
