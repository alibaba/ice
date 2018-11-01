import Mock from 'mockjs'

// 补丁 解决 mock.js 影响 Cookie 携带
import PatchCookie from './patch/cookie'

PatchCookie(Mock)

// 导入所有的接口
const req = context => context.keys().map(context)
req(require.context('./api/', true, /\.js$/))

// 设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
  timeout: '300-600'
})
