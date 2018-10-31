import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import setting from '@/setting.js'

const adapter = new LocalStorage(`d2admin-${setting.releases.version}`)
const db = low(adapter)

db
  .defaults({
    sys: {},
    database: {}
  })
  .write()

export default db
