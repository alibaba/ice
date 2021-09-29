const entry = `
import { runApp } from 'ice';

const appConfig = {
  app: {
    rootId: 'ice-container',
  },
  router: {
    type: 'browser',
  },
  icestark: {
    type: 'child',
  },
};

runApp(appConfig);

export function mount () {}

export function unmount () {}
`

const output = "import { runApp } from 'ice';\n" +
'import { isInIcestark, setLibraryName } from "@ice/stark-app";\n' +
'import ReactDOM from "react-dom";\n' +
'const appConfig = {\n' +
'  app: {\n' +
"    rootId: 'ice-container'\n" +
'  },\n' +
'  router: {\n' +
"    type: 'browser'\n" +
'  },\n' +
'  icestark: {\n' +
"    type: 'child'\n" +
'  }\n' +
'};\n' +
'\n' +
'if (!isInIcestark()) {\n' +
'  runApp(appConfig);\n' +
'}\n' +
'\n' +
'export function mount() {}\n' +
'export function unmount() {}\n' +
'\n' +
'if (!false) {\n' +
'  setLibraryName("microApp");\n' +
'}\n' +
'\n' +
"if (typeof window !== 'undefined' && window.ICESTARK && window.ICESTARK.loadMode && window.ICESTARK.loadMode !== 'umd') {\n" +
"  console.warn('[icestark] unable to get lifecycle from umd module without specify the configration of umd');\n" +
'}'


module.exports = {
  entry,
  output,
}