const Base = require('./Base');

module.exports = class Component extends Base {
  toString() {
    const exportType = this.isEntry ? 'export default' : 'export';
    this.subComponents = this.subComponents || [];

    return `
      ${exportType} class ${this.name} extends React.Component<${
      this.name
    }Props, any> {
        ${this.subComponents
          .map((item) => {
            return `static ${item.name}: typeof ${item.name};`;
          })
          .join('\n')}
      }
    `;
  }
};
