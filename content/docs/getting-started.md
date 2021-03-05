---
title: "Getting Started"
---

## Go Version requirement

We recommend you upgrade Go to the latest version ( >= Go1.13 ), you can [upgrade Go here](https://golang.org/dl/).

## Set GOPROXY environment

**Bash (Linux or macOS)**

```shell
export GOPROXY=https://goproxy.io,direct
```

**PowerShell (Windows)**

```shell
$env:GOPROXY = "https://goproxy.io,direct"
```

## Add Environments in your profile （RECOMMEND）

**Mac/Linux**

```shell
# add environment to your profile
echo "export GOPROXY=https://goproxy.io,direct" >> ~/.profile && source ~/.profile

# if your terminal is zsh，type the command below
echo "export GOPROXY=https://goproxy.io,direct" >> ~/.zshrc && source ~/.zshrc
```

**Windows**

```
1. Right click This PC -> Properties -> Advanced system settings -> Environment Variables
2. Click "New" in Environment Variables
3. Input Variable Name: “GOPROXY”
4. Input Variable Value: “https://goproxy.io,direct”
5. Click "OK", save your settings.
```
