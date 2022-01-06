# Changelog

## 2.0.2

- [fix] be compatible for input like `src/main`. ([#5049](https://github.com/alibaba/ice/pull/5095))

## 2.0.1

- [fix] unexpected entry with too long root dir.
- [fix] support for Win32 platforms is provided.

## 2.0.0

Breakchanges: `preserveEntrySignatures` no longer used as default to meet Vite's output format. You should configure `preserveEntrySignatures` explicitly to preserve entry signatures.

- [chore] set an alias to `input`

## 1.0.0

- [feat] support minify html using html-minifier-terser.

## 0.1.3

- [feat] return original html when non-matches.

## 0.1.2

- [feat] remove entry script in index.html automatically.

## 0.1.1

- [feat] change package's name from `vite-plugin-htmls` to `vite-plugin-index-html`.

## 0.1.1

- [feat] append entry to html using transformIndexHtml.
