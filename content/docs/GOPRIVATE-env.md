# Go Module GOPRIVATE Environment

The go command defaults to downloading modules from the public Go module
mirror at goproxy.io. It also defaults to validating downloaded modules,
regardless of source, against the public Go checksum database at sum.golang.org.
These defaults work well for publicly available source code.

The GOPRIVATE environment variable controls which modules the go command
considers to be private (not available publicly) and should therefore not use the
proxy or checksum database. The variable is a comma-separated list of
glob patterns (in the syntax of Go's path.Match) of module path prefixes.
For example,

        GOPRIVATE=*.corp.example.com,rsc.io/private

causes the go command to treat as private any module with a path prefix
matching either pattern, including git.corp.example.com/xyzzy, rsc.io/private,
and rsc.io/private/quux.

The GOPRIVATE environment variable may be used by other tools as well to
identify non-public modules. For example, an editor could use GOPRIVATE
to decide whether to hyperlink a package import to a godoc.org page.

For fine-grained control over module download and validation, the GONOPROXY
and GONOSUMDB environment variables accept the same kind of glob list
and override GOPRIVATE for the specific decision of whether to use the proxy
and checksum database, respectively.

For example, if a company ran a module proxy serving private modules,
users would configure go using:

        GOPRIVATE=*.corp.example.com
        GOPROXY=proxy.example.com
        GONOPROXY=none

This would tell the go command and other tools that modules beginning with
a corp.example.com subdomain are private but that the company proxy should
be used for downloading both public and private modules, because
GONOPROXY has been set to a pattern that won't match any modules,
overriding GOPRIVATE.