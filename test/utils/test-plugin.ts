export default ({ modifyUserConfig }) => {
  // disable minify to speed-up fixture builds
  modifyUserConfig('minify', false);
  // disable sourceMap to speed-up fixture start
  modifyUserConfig('sourceMap', false);
}