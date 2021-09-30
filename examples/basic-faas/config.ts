export default {
  ssr: true,
  plugins: [
    "@midwayjs/build-plugin-hooks",
    "@ali/build-plugin-faas"
  ],
  server: {
    outDir: "./build-abc",
  }
}
