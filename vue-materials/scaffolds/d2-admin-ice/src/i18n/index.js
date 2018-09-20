import Vue from 'vue'
import VueI18n from 'vue-i18n'

import cn from './lang/cn'
import ja from './lang/ja'
import en from './lang/en'

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'cn',
  messages: {
    cn,
    ja,
    en
  }
})
