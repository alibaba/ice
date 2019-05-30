# ice-npm-utils

some utils for ice.

## Installation

```bash
npm install ice-npm-utils --save-dev
```

## Basic Usage

```js
const { getNpmLatestSemverVersion } = require('ice-npm-utils');
```

## API

### getNpmRegistry(npmName)

Default return `https://registry.npm.taobao.org`

### getUnpkgHost(npmName)

Default return `https://unpkg.com`

### getNpmLatestSemverVersion(npmName, baseVersion)

Return `Promise.resolve(version)`

### getLatestVersion(npmName)

Return `Promise.resolve(version)`

### getNpmInfo(npmName)

Return `Promise.resolve(response.data)`

### getNpmClient(npmName)

Default return `npm`

### checkAliInternal()

Return `Promise.resolve(isInternal)`

### getNpmTarball(name, version)

Return `Promise.resolve(tarball)`

### getAndExtractTarball(destDir, tarball, progressFunc: () => {})

Return `Promise.resolve(allFiles: string[])`

## Custom

### Custom Npm Registry

```
process.env.REGISTRY=https://registry.npm.taobao.org
```

### Custom Unpkg Host

```
process.env.UNPKG=https://unpkg.com
```

### Custom Npm Client

```
process.env.NPM_CLIENT=cnpm
```