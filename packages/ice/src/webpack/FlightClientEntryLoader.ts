export type ClientComponentImports = string[];
export type CssImports = Record<string, string[]>;

export type FlightClientEntryLoaderOptions = {
  modules: ClientComponentImports;
};

export default function transformSource() {
  let { modules }: FlightClientEntryLoaderOptions = this.getOptions();

  if (!Array.isArray(modules)) {
    modules = modules ? [modules] : [];
  }

  const requests = modules as string[];
  const code = requests
    .map(
      (request) =>
        `import(/* webpackMode: "eager" */ ${JSON.stringify(request)})`,
    )
    .join(';\n');

  return code;
}
