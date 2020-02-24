import * as path from 'path'

function formatWinPath(pathStr: string): string {
  return pathStr.split(path.sep).join('/')
}

export default formatWinPath
