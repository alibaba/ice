---
'@ice/plugin-rax-compat': minor
'rax-compat': patch
---

Refactor plugin and fix some issues:

- The inlineStyleFilter doesnot work for server-side style process.
- The inlineStyleFilter doesnot work for style file except vanilla css.
- Supports sass-loader now.
- Supports array type style in createElement.
