# `plugin-mock-viewer`

plugin for manage local mock data  in framework `ice`.

## Usage

```js
import mockViewer from '@ice/plugin-mock-viewer';

export default defineConfig({
  plugins: [
    mockViewer(
      // port: 9006, // 可以自定义端口
      // open: true, // 启动时打开mock数据管理页面
      // debug: true, // 打印消息通信日志
    )],
});
```

## Options

- port，可以自定义端口，默认9005
- open，启动时打开mock数据管理页面，默认false
- debug，打印消息通信日志，默认false
