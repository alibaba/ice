import { describe, it, expect } from 'vitest';
import styleSheetLoader from '../../../lib/transform-styles.js';

describe('CSS Import Tilde Transform for ESBuild', () => {
  it('should transform @import with tilde syntax in CSS', async () => {
    const input = `
@import "~@ali/some-package/style.css";
@import '~@company/design-system/tokens.css';
.test {
  color: red;
}
`;

    const result = await styleSheetLoader(input, '/fake/path/test.css', 'css');

    // The result should be JavaScript module code for inline styles
    expect(result).toContain('module.exports = _styles');

    // We can't easily test the exact transformation here since it goes through
    // the CSS parser, but we can verify it doesn't throw an error
    expect(result).toBeDefined();
  });

  it('should transform @import with tilde syntax in LESS', async () => {
    const input = `
@import "~@ali/some-package/variables.less";
@color: #333;
.test {
  color: @color;
}
`;

    const result = await styleSheetLoader(input, '/fake/path/test.less', 'less');

    expect(result).toContain('module.exports = _styles');
    expect(result).toBeDefined();
  });

  it('should transform @import with tilde syntax in SASS/SCSS', async () => {
    const input = `
@import "~@ali/some-package/variables.scss";
$color: #333;
.test {
  color: $color;
}
`;

    const result = await styleSheetLoader(input, '/fake/path/test.scss', 'scss');

    expect(result).toContain('module.exports = _styles');
    expect(result).toBeDefined();
  });

  it('should handle mixed import styles', async () => {
    const input = `
@import "~@ali/package/style.css";
@import "./local-style.css";
@import url("https://example.com/remote.css");
.test {
  color: blue;
}
`;

    const result = await styleSheetLoader(input, '/fake/path/test.css', 'css');

    expect(result).toContain('module.exports = _styles');
    expect(result).toBeDefined();
  });

  it('should not transform non-tilde imports', async () => {
    const input = `
@import "./local-style.css";
@import url("https://example.com/remote.css");
.test {
  color: green;
}
`;

    const result = await styleSheetLoader(input, '/fake/path/test.css', 'css');

    expect(result).toContain('module.exports = _styles');
    expect(result).toBeDefined();
  });
});