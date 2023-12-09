---
title: GOSUMDB Environment
---

The go command tries to authenticate every downloaded module,
checking that the bits downloaded for a specific module version today
match bits downloaded yesterday. This ensures repeatable builds
and detects introduction of unexpected changes, malicious or not.

In each module's root, alongside go.mod, the go command maintains
a file named go.sum containing the cryptographic checksums of the
module's dependencies.

The form of each line in go.sum is three fields:

```
<module> <version>[/go.mod] <hash>
```

Each known module version results in two lines in the go.sum file.
The first line gives the hash of the module version's file tree.
The second line appends "/go.mod" to the version and gives the hash
of only the module version's (possibly synthesized) go.mod file.
The go.mod-only hash allows downloading and authenticating a
module version's go.mod file, which is needed to compute the
dependency graph, without also downloading all the module's source code.

If the go command reports a mismatch in go.sum, the downloaded code
for the reported module version does not match the one used in a
previous build of the main module. It is important at that point
to find out what the right checksum should be, to decide whether
go.sum is wrong or the downloaded code is wrong. Usually go.sum is right:
you want to use the same code you used yesterday.

If a downloaded module is not yet included in go.sum and it is a publicly
available module, the go command consults the Go checksum database to fetch
the expected go.sum lines. If the downloaded code does not match those
lines, the go command reports the mismatch and exits. Note that the
database is not consulted for module versions already listed in go.sum.

If a go.sum mismatch is reported, it is always worth investigating why
the code downloaded today differs from what was downloaded yesterday.

The GOSUMDB environment variable identifies the name of checksum database
to use and optionally its public key and URL, as in:

```
GOSUMDB="sum.golang.org"
GOSUMDB="sum.golang.org+<publickey>"
GOSUMDB="sum.golang.org+<publickey> https://sum.golang.org"
```

The go command knows the public key of sum.golang.org, and also that the name
sum.golang.google.cn (available inside mainland China) connects to the
sum.golang.org checksum database; use of any other database requires giving
the public key explicitly.
The URL defaults to "https://" followed by the database name.

If GOSUMDB is set to "off", or if "go get" is invoked with the -insecure flag,
the checksum database is not consulted, and all unrecognized modules are
accepted, at the cost of giving up the security guarantee of verified repeatable
downloads for all modules. A better way to bypass the checksum database
for specific modules is to use the GOPRIVATE or GONOSUMDB environment
variables.

![](https://baokun.li/images/2019/proxy-sum.png)

Happy coding，gophers！

References:

- *[https://goproxy.io/](https://goproxy.io/)*
- *[https://sum.golang.org/](https://sum.golang.org/)*
