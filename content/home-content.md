---
title: ''
---

### Go version >= 1.13 (RECOMMENDED)

```shell
go env -w GO111MODULE=on
go env -w GOPROXY="https://goproxy.io,direct"

# Set environment variable allow bypassing the proxy for selected modules (optional)
go env -w GOPRIVATE="*.corp.example.com"
```

### Go version <= 1.12

In Linux or macOS, you can execute the below commands.

**Bash (Linux or macOS)**

```shell
# Enable the go modules feature
export GO111MODULE="on"
# Set the GOPROXY environment variable
export GOPROXY="https://goproxy.io"
```

Or, write it into the `.profile` or `.bash_profile` file.

In Windows, you can execute the below commands.

**PowerShell (Windows)**

```shell
# Enable the go modules feature
$env:GO111MODULE="on"
# Set the GOPROXY environment variable
$env:GOPROXY="https://goproxy.io"
```

Now, when you build and run your applications, go will fetch dependencies via goproxy.io. See more information in the [doc](docs/getting-started.html).
