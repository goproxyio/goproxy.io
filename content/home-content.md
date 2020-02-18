---
title: ''
---

In Linux or macOS, you can execute the below commands.

### Bash (Linux or macOS)

```shell
# Enable the go modules feature
export GO111MODULE="on"
# Set the GOPROXY environment variable
export GOPROXY="https://goproxy.io"
```

Or, write it into the `.bashrc` or `.bash_profile` file.

In Windows, you can execute the below commands.

### PowerShell (Windows)

```shell
# Enable the go modules feature
$env:GO111MODULE="on"
# Set the GOPROXY environment variable
$env:GOPROXY="https://goproxy.io"
```

Now, when you build and run your applications, go will fetch dependencies via goproxy.io. See more information in the [goproxy](https://github.com/goproxyio/goproxy) repository.

If your Go version >= 1.13, the GOPRIVATE environment variable controls which modules the go command considers to be private (not available publicly) and should therefore not use the proxy or checksum database. For example:

**Go version >= 1.13**

```shell
go env -w GOPROXY="https://goproxy.io,direct"
# Set environment variable allow bypassing the proxy for selected modules
go env -w GOPRIVATE="*.corp.example.com"
```
