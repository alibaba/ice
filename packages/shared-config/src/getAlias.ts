function getAliasWithRoot(rootDir: string, alias?: Record<string, string | boolean>) {
  const aliasWithRoot = {};
  Object.keys(alias).forEach((key) => {
    const aliasValue = alias[key];
    aliasWithRoot[key] = (aliasValue && typeof aliasValue === 'string' && aliasValue.startsWith('.')) ? path.join(rootDir, aliasValue) : aliasValue;
  });
  return aliasWithRoot;
}

export default getAliasWithRoot;
