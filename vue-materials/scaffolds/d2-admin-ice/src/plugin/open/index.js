/* eslint no-param-reassign: 0 */

// 打开一个url

export default {
  install (Vue) {
    Vue.prototype.$open = (url = 'https://github.com/d2-projects') => {
      window.open(url)
    }
  }
}
