---
title: ''
---

### Go version >= 1.13 (RECOMMENDED)

```shell
go env -w GO111MODULE=on
go env -w GOPROXY="https://goproxy.io,direct"

# Set environment variable allow bypassing the proxy for selected modules (optional)
go env -w GOPRIVATE="*.corp.example.com"

# Set environment variable allow bypassing the proxy for specified organizations (optional)
go env -w GOPRIVATE="example.com/org_name"
```

Now, when you build your applications, `Go` will fetch dependencies via goproxy.io. See more information in the [doc](docs/getting-started.html) and [how to use Private service](docs/goproxyio-private.html).

### Go version <= 1.12

**Bash (Linux or macOS)**

```shell
# Enable the go modules feature
export GO111MODULE="on"
# Set the GOPROXY environment variable
export GOPROXY="https://goproxy.io"
```

Or, write it into the `.profile` or `.bash_profile` file.

**PowerShell (Windows)**

```shell
# Enable the go modules feature
$env:GO111MODULE="on"
# Set the GOPROXY environment variable
$env:GOPROXY="https://goproxy.io"
```

Now, when you build your applications, `Go` will fetch dependencies via goproxy.io. See more information in the [doc](docs/getting-started.html).
