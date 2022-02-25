# ice

ice: best user experience for web develop based on React.
This package includes scripts and configuration used by web framework `ice`.

## Install

```bash
$ npm i @ice/cli -D
```

## usage

```json
{
  "name": "my-app",
  "devDependencies": {
    "@ice/cli": "^1.0.0"
  },
  "scripts": {
    "start": "ice start",
    "build": "ice build",
  }
}
```

## Command line interface

```bash
Usage: ice <command> [options]

Options:
  -V, --version    output the version number
  -h, --help       output usage information

Commands:
  build [options]  build project
  start [options]  start dev server
  test [options]   run tests with jest
```

## License

MIT