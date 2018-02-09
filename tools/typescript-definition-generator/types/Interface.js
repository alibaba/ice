const Base = require('./Base');

module.exports = class Interface extends Base {
  toString() {
    return `export interface ${this.name}Props {
      ${Object.keys(this.props)
        .map((item) => {
          const name = item;
          item = this.props[item];
          const value = this.mapping(name, item);
          const description = item.description || '';
          const required = item.required || false;

          return `
          /**
           ${description
             .split('\n')
             .map((item) => '* ' + item)
             .join('\n')}
           */
          ${name}${required ? '' : '?'}: ${value};
        `;
        })
        .join('')}
    }\n`;
  }
};
