# iceworks CLI

CLI tool for iceworks，start and stop the iceworks server.

## Basic Usage

```bash
$ npm i iceworks -g

# start the iceworks server
# 👉 Ready on http://127.0.0.1:8001
$ iceworks

# stop the iceworks server
$ iceworks stop
```

## Advanced Usage

```bash
# start the iceworks server, whether run at background, so you don't need nohup
$ iceworks start

# stop the iceworks server, will kill master process which will handler and notice worker and agent to gracefull exit.
$ iceworks stop
```

## Help

Run the `iceworks --help` to view more help information.

```
Usage: iceworks <command> [options]

Options:
  -V, --version    output the version number
  -h, --help       output usage information

Commands:
  start [options]  start the iceworks server, whether run at background, so you don't need nohup
  stop             stop the iceworks server

  Run iceworks <command> --help for detailed usage of given command.
```

## License

MIT
