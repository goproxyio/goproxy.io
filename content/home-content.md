---
title: ''
---

**Bash (Linux or macOS)**

```shell
# Set the GOPROXY environment variable
export GOPROXY=https://goproxy.io,direct
# Set environment variable allow bypassing the proxy for specified repos (optional)
export GOPRIVATE=git.mycompany.com,github.com/my/private
```

**PowerShell (Windows)**

```shell
# Set the GOPROXY environment variable
$env:GOPROXY = "https://goproxy.io,direct"
# Set environment variable allow bypassing the proxy for specified repos (optional)
$env:GOPRIVATE = "git.mycompany.com,github.com/my/private"
```

Now, when you build your applications, `Go` will fetch dependencies via goproxy.io. You can also permanently export the `GOPROXY` environment in `~/.bashrc` or `~/.profile` file. If Go version < 1.13, we recommend you [update to the latest version](https://go.dev/dl/). See more information in the [documention](docs/getting-started.html).
