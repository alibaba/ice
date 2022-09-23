import type webpack from 'webpack';

import pageLoader from './page.js';

export default function (this: webpack.LoaderContext<any>, source: string) {
  pageLoader.call(this, source);
}
