import util from '@/libs/util'

export default {
  install (Vue, options) {
    Vue.prototype.$open = util.open
  }
}
