const path = require('path');

function generateNpmrc(cwd) {
  const npmrc = path.join(cwd, 'npmrc');
  
  const NPM_EMAIL = process.env.NPM_EMAIL;
  const NPM_TOKEN = process.env.NPM_TOKEN;
  const NPM_REGISTRY = process.env.NPM_REGISTRY || 'registry.npmjs.com';
  
  const registry = `https://${NPM_REGISTRY}`;
  
  const npmrcContext = `email=${NPM_EMAIL}
  registry=http://${NPM_REGISTRY}/
  //${NPM_REGISTRY}/:_authToken=${NPM_TOKEN}
  `;
  
  fs.writeFileSync(npmrc, npmrcContext);
}
module.exports = {
  generateNpmrc
}