export type ClientComponentImports = string[];
export type CssImports = Record<string, string[]>;

export type FlightClientEntryLoaderOptions = {
  modules: ClientComponentImports;
  /** This is transmitted as a string to `getOptions` */
  server: boolean | 'true' | 'false';
};

export default function transformSource() {
  let { modules } = this.getOptions();

  if (!Array.isArray(modules)) {
    modules = modules ? [modules] : [];
  }

  const requests = modules;
  const code = requests
    .map(
      (request) =>
        `import(/* webpackMode: "eager" */ ${JSON.stringify(request)})`,
    )
    .join(';\n');

    console.log(code);
  return code;
}
