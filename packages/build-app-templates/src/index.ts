import * as path from 'path';

type FrameworkType = 'rax' | 'react';

export function getTemplate(templateName: string, framework?: FrameworkType) {
  if (!framework) return path.join(__dirname, 'templates/common', `${templateName}.ejs`);
  return path.join(__dirname, 'templates', framework, `${templateName}.ejs`);
}

export function getCommonTemplateDir() {
  return path.join(__dirname, 'templates/common');
}

export function getFrameworkTemplateDir(framework: FrameworkType) {
  return path.join(__dirname, `templates/${framework}`);
}
