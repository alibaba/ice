module.exports = (content) => {
  return `
import "core-js/stable";
import "regenerator-runtime/runtime";
${content}
  `;
};
