import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'fast-glob';
import { init, parse } from 'es-module-lexer';
import { transform, Loader } from 'esbuild';

async function globFiles(pattern: string | string[], rootDir: string) {
  return await glob(pattern, {
    cwd: rootDir,
    ignore: [
      '**/node_modules/**',
      // ignore apis folder for default
      'src/apis/**',
      '**/__tests__/**',
    ],
    absolute: true,
  });
}

export default async function scanImports(globPatterns: string | string [], rootDir: string): Promise<string[]> {
  const importSet = new Set<string>();
  const files = await globFiles(globPatterns, rootDir);
  await Promise.all(files.map((filePath: string) => {
    return (async () => {
      let source = fs.readFileSync(filePath, 'utf-8');
      const lang = path.extname(filePath).slice(1);
      // in case of write jsx in js file
      let loader: Loader = 'jsx';
      if (lang === 'ts' || lang === 'tsx') {
        loader = lang;
      }
      try {
        // transform content first since es-module-lexer can't handle ts file
        source = (await transform(source, { loader })).code;
        await init;
        const imports = parse(source)[0];
        imports.forEach((importSpecifier) => {
          const importName = importSpecifier.n;
          // filter source code
          if (!importName.startsWith('.') && !importName.startsWith('@/') && !importName.startsWith('ice/')) {
            importSet.add(importSpecifier.n);
          }
        });
      } catch (err) {
        console.log('transform error with:', filePath);
      }
    })();
  }));
  return Array.from(importSet);
}