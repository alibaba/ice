import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'

// D2Admin 版本
const version = process.env.VUE_APP_ICE_VERSION

const adapter = new LocalStorage(`d2admin-ice-${version}`)
const db = low(adapter)

// 初始化数据库
db.defaults({
  themeActiveName: [],
  pageOpenedList: [],
  userInfo: [],
  isMenuAsideCollapse: [],
  database: [],
  databasePublic: {}
}).write()

export default db
