import * as path from 'path';
import * as fs from 'fs';
import * as hbs from 'handlebars';

interface compileParams {
  template: string;
  templatePath?: string;
  outputPath: string;
  params?: object;
}

export const compileTemplate = ({
  template,
  templatePath,
  outputPath,
  params,
}: compileParams) => {
  const hbsTemplatePath = templatePath || path.join(__dirname, `../templates/${template}`);
  const hbsTemplateContent = fs.readFileSync(hbsTemplatePath, 'utf-8');

  // register helper
  hbs.registerHelper('camelCased', (str) => {
    return str.replace(/-([a-z])/g, (math: string) => (math[1].toUpperCase()));
  });
  hbs.registerHelper('escape', (str) => {
    return (str || '').replace(/`/g, '&#x60;');
  });

  hbs.registerHelper('isArr', function (value) {
    return Array.isArray(value);
  });

  const compileTemplateContent = hbs.compile(hbsTemplateContent);

  const jsTemplateContent = compileTemplateContent(params);
  fs.writeFileSync(outputPath, jsTemplateContent);
};
