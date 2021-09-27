import { loadBinding } from '@node-rs/helper';
import * as path from 'path';
import { Options, JsMinifyOptions, Output } from './types';

/**
 * __dirname means load native addon from current dir
 * 'swc' is the name of native addon
 * the second arguments was decided by `napi.name` field in `package.json`
 * the third arguments was decided by `name` field in `package.json`
 * `loadBinding` helper will load `swc.[PLATFORM].node` from `__dirname` first
 * If failed to load addon, it will fallback to load from `swc-[PLATFORM]`
 */
const bindings = loadBinding(path.join(__dirname, '../native'), 'builder-swc', '@builder/swc');

async function transform(src: string, options: Options): Promise<Output> {
  const isModule = typeof src !== 'string';
  options = options || {};

  if (options?.jsc?.parser) {
    options.jsc.parser.syntax = options.jsc.parser.syntax ?? 'ecmascript';
  }

  return bindings.transform(
    isModule ? JSON.stringify(src) : src,
    isModule,
    toBuffer(options)
  );
}

function transformSync(src: string, options: Options): Output {
  const isModule = typeof src !== 'string';
  options = options || {};

  if (options?.jsc?.parser) {
    options.jsc.parser.syntax = options.jsc.parser.syntax ?? 'ecmascript';
  }

  return bindings.transformSync(
    isModule ? JSON.stringify(src) : src,
    isModule,
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
