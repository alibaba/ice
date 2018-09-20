import Mock from 'mockjs'

// 导入所有的接口
const req = context => context.keys().map(context)
req(require.context('./api/', true, /\.js$/))

// 设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
  timeout: '300-600'
})
