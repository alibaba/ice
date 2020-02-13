import * as glob from 'glob'
import * as path from 'path'
import { run } from './fn/shell'
import * as fs from 'fs-extra'

(async () => {
  await run('npm run clean')
  await run('npx tsc --build ./tsconfig.json')

  const fileParten = '*/src/**/!(*.ts|*.tsx)'
  console.log(`[COPY]: ${fileParten}`)

  const cwd = path.join(__dirname, '../packages')
  const files = glob.sync(fileParten, { cwd, nodir: true })
  for (const file of files) {
    const from = path.join(cwd, file)
    const to = path.join(cwd, file.replace(/\/src\//, '/lib/'))
    await fs.mkdirp(path.dirname(to))
    await fs.copyFile(from, to)
  }

})().catch((e) => {
  console.trace(e)
  process.exit(128)
});
