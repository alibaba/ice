export default ({ modifyUserConfig }) => {
  // disable minify to speed-up fixture builds
  modifyUserConfig('minify', false);
}