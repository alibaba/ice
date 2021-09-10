export default {
   plugins: [
    "@midwayjs/build-plugin-hooks",
    "@ali/build-plugin-faas"
  ],
  server: {
    outDir: "./build-abc",
    ignorePattern: (...args) => {
      return true;
    },
  },
  proxy: {
      "/": {
      "enable": true,
      "target": "http://127.0.0.1:7001"
    }
  }
}
