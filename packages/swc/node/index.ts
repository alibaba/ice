/* eslint-disable global-require */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-dynamic-require */
import * as path from 'path';
import * as fs from 'fs';
import { platform, arch } from 'os';
import { platformArchTriples } from '@napi-rs/triples';
import { Options, JsMinifyOptions, Output, Binding } from './types';

const ArchName = arch();
const PlatformName = platform();

/**
 * __dirname means load native addon from current dir
 * 'swc' is the name of native addon
 * the second arguments was decided by `napi.name` field in `package.json`
 * the third arguments was decided by `name` field in `package.json`
 * `loadBinding` helper will load `swc.[PLATFORM].node` from `__dirname` first
 * If failed to load addon, it will fallback to load from `swc-[PLATFORM]`
 */
const bindings: Binding = loadBinding();

function loadBinding() {
  const triples = platformArchTriples[PlatformName][ArchName];
  for (const triple of triples) {
    const localFilePath = path.join(
      __dirname,
      '../native',
      `builder-swc.${triple.platformArchABI}.node`
    );
    if (fs.existsSync(localFilePath)) {
      console.log('Load local native module.');
      return require(localFilePath);
    }

    try {
      return require(`@builder/swc-${triple.platformArchABI}`);
    // eslint-disable-next-line no-empty
    } catch (e) {}
  }

  throw new Error('Cannot find target @builder/swc native module!');
}

async function transform(src: string, options: Options): Promise<Output> {
  options = options || {};

  if (options?.jsc?.parser) {
    options.jsc.parser.syntax = options.jsc.parser.syntax ?? 'ecmascript';
  }

  return bindings.transform(
    src,
    false,
    toBuffer(options)
  );
}

function transformSync(src: string, options: Options): Output {
  options = options || {};

  if (options?.jsc?.parser) {
    options.jsc.parser.syntax = options.jsc.parser.syntax ?? 'ecmascript';
  }

  return bindings.transformSync(
    src,
    false,
    toBuffer(options)
  );
}

function toBuffer(t) {
  return Buffer.from(JSON.stringify(t));
}

async function minify(src: string, opts: JsMinifyOptions): Promise<Output> {
  return bindings.minify(toBuffer(src), toBuffer(opts ?? {}));
}

function minifySync(src: string, opts: JsMinifyOptions): Output {
  return bindings.minifySync(toBuffer(src), toBuffer(opts ?? {}));
}

export * from './types';

export {
  transform,
  transformSync,
  minify,
  minifySync,
};
