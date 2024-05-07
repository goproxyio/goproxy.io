# goproxy.io

goproxy.io official site

## Prerequisites

* Node: 16.x
* npm
* gatsby-cli

### Install

```sh
# nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash

# Node.js and npm has been integrated.
nvm install 16.20.2

# gatsby-cli
npm i -g gatsby-cli

# project dependencies
cd goproxy.io
npm i
```

## Development

```sh
npm run develop
```

## Usage

* Write English document in the `content/docs` directory.
* Write Chinese document in the `content/zh/docs` directory.

## Build

```sh
npm run clean
npm run build
```

Then, all files are generated into the `public` directory.

## Deploy

Serve the `public` directory as root directory.

### Configure the nginx for cors

If your static files use a third domain, you need add the below code in the **`location`** section ([ref](https://enable-cors.org/)), or you need configure the cors in your cdn provider.

```
if ($request_method = 'GET') {
   add_header 'Access-Control-Allow-Origin' '*';
   add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
   add_header 'Access-Control-Allow-Headers' '*';
   add_header 'Access-Control-Expose-Headers' '*';
}
```
