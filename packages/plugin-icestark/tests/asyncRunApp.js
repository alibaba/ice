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

setTimeout(() => {
  runApp(appConfig);
}, 0);
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
'setTimeout(() => {\n' +
'  if (!isInIcestark()) {\n' +
'    runApp(appConfig);\n' +
'  }\n' +
'}, 0);\n' +
'\n' +
'if (!false) {\n' +
'  setLibraryName("microApp");\n' +
'}\n' +
'\n' +
"if (typeof window !== 'undefined' && window.ICESTARK && window.ICESTARK.loadMode && window.ICESTARK.loadMode !== 'umd') {\n" +
"  console.warn('[icestark] unable to get lifecycle from umd module without specify the configration of umd');\n" +
'}\n' +
'\n' +
'export const mount = async props => {\n' +
'  (appConfig.icestark = appConfig.icestark || {}).$$props = props;\n' +
'  runApp(appConfig);\n' +
'};\n' +
'export const unmount = async ({\n' +
'  container,\n' +
'  customProps\n' +
'}) => {\n' +
'  if (appConfig?.icestark?.regsiterAppLeave) {\n' +
'    appConfig.icestark.regsiterAppLeave(container, customProps);\n' +
'  } else {\n' +
'    ReactDOM.unmountComponentAtNode(container);\n' +
'  }\n' +
'};\n' +
'export const bootstrap = async () => {\n' +
"  console.log('bootstrap');\n" +
'};'


module.exports = {
  entry,
  output,
}