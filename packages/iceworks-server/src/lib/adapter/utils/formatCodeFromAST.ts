import generate from '@babel/generator';
import * as prettier from 'prettier';

export default (ast: any): string => {
  return prettier.format(generate(ast, {
    retainLines: true,
  }).code, {
    singleQuote: true,
    trailingComma: 'es5',
  });
};
