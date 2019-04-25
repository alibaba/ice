# iceworks server

## QuickStart

<!-- add docs here for user -->

see [midway docs][midway] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

[midway]: https://midwayjs.org

## Socket.io 机制

https://github.com/im-js/im.js

- 客户端和服务端建立 socket 连接后，每个 emit, on 的对象都是远端，而非本地端。
- 客户端的所有 im 消息，都将通过监听 message 事件来接收。
- ACK 处理
- 离线消息机制
- 消息事件

## node-ipc

> a nodejs module for local and remote Inter Process Communication with full support for Linux, Mac and Windows. It also supports all forms of socket communication from low level unix and windows sockets to UDP and secure TLS and TCP sockets.

用于本地和远程进程间通信的 nodejs 模块，完全支持 Linux，Mac 和 Windows。

## node-pty

> forkpty(3) bindings for node.js. This allows you to fork processes with pseudoterminal file descriptors. It returns a terminal object which allows reads and writes.

允许使用 pseudoterminal 文件描述符进行 fork 进程。 它返回一个允许读取和写入的终端对象

这对于以下情况非常有用：

编写终端 模拟器 ( 例如。 通过 xterm.js )
如果你需要一个程序，比如你需要一个程序来发送你的控制序列，那么你可以把某些程序看作是终端

#### 兼容

- node-pty 支持 Linux，macOS 和 Windows。 通过使用 winpty 插件库，可以支持 Windows 支持。

#### 应用场景

- node-pty 提供了许多不同的终端仿真器
