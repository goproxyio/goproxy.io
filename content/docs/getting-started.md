---
title: "Getting Started"
---

## Enable Go module

If your Go version is Go 1.11 and above, you only need to set an environment to enable Go module. [Click here to update Go](https://golang.org/dl/).

**Mac/Linux**

```shell
export GO111MODULE="on"
```
**Windows**

```shell
$env:GO111MODULE="on"
```

## Set GOPROXY environment

If you use Go 1.13 and above, we recommand you use this command to set GOPROXY environment. [Click here to update Go](https://golang.org/dl/).


```shell
go env -w GOPROXY="https://goproxy.io,direct"
```


You could follow these instructions if your Go version < 1.13:

**Mac/Linux**

```shell
export GOPROXY="https://goproxy.io"
```
**Windows**

```shell
$env:GOPROXY="https://goproxy.io"
```

## Add Environments in your profile （optional）

**Mac/Linux**

```shell
# add environment to your profile
echo "export GOPROXY=https://goproxy.io" >> ~/.profile && source ~/.profile

# if your terminal is zsh，type the command below
echo "export GOPROXY=https://goproxy.io" >> ~/.zshrc && source ~/.zshrc
```

**Windows**

```
1. Right click This PC -> Properties -> Advanced system settings -> Environment Variables
2. Click "New" in Environment Variables
3. Input Variable Name: “GOPROXY”
4. Input Variable Value: “https://goproxy.io”
5. Click "OK", save your settings.
```
