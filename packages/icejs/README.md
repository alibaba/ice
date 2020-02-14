# `icejs`

> Command line tool and builtin plugin for icejs

## Install

```bash
$ npm i ice.js -D
```

## Usage

For example,  with project a `package.json` like follows is recommended:

```json
{
  "name": "my-app",
  "dependencies": {
    "ice.js": "^1.0.0"
  },
  "scripts": {
    "start": "icejs start",
    "build": "icejs build",
  }
}
```

### Command line interface

```markdown
Usage: icejs <command> [options]

Options:
  -V, --version    output the version number
  -h, --help       output usage information

Commands:
  build [options]  build project
  start [options]  start server
  test [options]   run tests with jest
```

## License

MIT
