---
'@ice/app': patch
---

fix: compat esbuild config
- use AST to get file exports instead of using import()
- respect compileDependencies in webpack mode
