module.exports = async function compilationLoader(source: string, map: any) {
  const options = this.getOptions();
  const callback = this.async();
  const { transform } = options;

  const result = await transform(source, this.resourcePath);
  if (result) {
    const { code, map } = result;
    callback(null, code, map);
  } else {
    callback(null, source, map);
  }
};
