/* tslint:disable */
const { app, assert } = require('midway-mock/bootstrap');
/* tslint:enable */

describe('test/app/controller/home.test.ts', () => {
  it('should GET /', () => {
    return app
      .httpRequest()
      .get('/')
      .expect(200);
  });

  it('should render index.html', async () => {
    const result = await app.httpRequest().get('/');
    const { text } = result;

    const cssLinkReg = /<link\shref="(.+)css\/index.css"\srel="stylesheet" \/>/i;
    const faviconLinkReg = /<link\srel="shortcut\sicon"\shref="(.+)favicon.png"\s\/>/i;
    const scriptReg = /<script\ssrc="(.+)js\/index.js"/i;
    const iceworksConfigScriptReg = /<script>[\s]*window.iceworksConfig/i;
    // should load common css
    assert.equal(cssLinkReg.test(text), true);
    // should load favicon.png
    assert.equal(faviconLinkReg.test(text), true);
    // should load common js
    assert.equal(scriptReg.test(text), true);
    // should load iceworksConfig
    assert.equal(iceworksConfigScriptReg.test(text), true);
  });
});

export {};
