# Changelog

## 2.0.3

### Patch Changes

- b1e89bc7: fix: PHA plugin can only run in web
- d4f943fb: feat: support downgradeUrl
- ce94e054: fix: fix frames build err in multiple

## 2.0.2

### Patch Changes

- 4e1d9065: refactor: reuse route paths
- 085498aa: fix: use latest plugin API of excuteServerEntry
- 83af2887: feat: support pull refresh

## 2.0.1

### Patch Changes

- 0c61f469: fix: prevent data loader to breack generate manifest
  fix: should replace env vars when build appWork

## 2.0.0

### Major Changes

- 6824ad63: fix: fix data of prefetch decamelize (break change)
- 73ae8bf4: fix: app-worker is not compiled when set a custom name
- 1c09e79e: fix: support plugin-pha interface optional
- 56fb406e: fix: support types definition without specify esm folder

## 1.1.3

### Patch Changes

- [fix] dev manifest should work when manifest has not tabBar
- [fix] preload should be false default
- [fix] print log once
- [feat] support configure for resource_prefetch

## 1.1.2

- [fix] should't parse template in SSR/SSG
- [feat] support dynamic data loader for pha worker

## 1.1.1

- [feat] support resource_prefetch to preload resource
- [feat] support enableExpiredManifest
- [feat] support configure `enableExpiredManifest`

## 1.1.0

- [feat] support static dataloader set to manifest

## 1.0.3

- [fix] fix lanUrlForTerminal when dev start
- [feat] optimize log

## 1.0.2

- [fix] fix dev lanUrlForTerminal err
- [fix] add title of manifest
- [fix] add pha = true when dev

## 1.0.1

- [fix] failed to get route config when re-define route path

## 1.0.0

- [feat] plugin to enable PHA features
