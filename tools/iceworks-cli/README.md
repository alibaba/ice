# Iceworks CLI

A simple CLI for scaffolding Web projects.

## Basic Usage

```bash
$ npm i iceworks -g
$ iceworks # start the iceworks server
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
