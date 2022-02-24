import * as path from 'path';
import type { FrameworkPlugin } from '@ice/service';

const plugin: FrameworkPlugin = ({ generator }) => {
  const templatePath = path.join(__dirname, '../template/');
  generator.addRenderTemplate(templatePath);
  // generator.addExport({ source: 'react-redux', specifier: '{ connect }', exportName: 'connect' });
  // generator.addConfigTypes({ source: 'request/types', specifier: '{ IRequest }', exportName: 'request?: IRequest' });
};

export default plugin;
