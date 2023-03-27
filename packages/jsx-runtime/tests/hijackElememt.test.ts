import { expect, it, describe } from 'vitest';
import { hijackElementProps } from '../src/';

describe('hijack element', () => {
  it('hijackElementProps basic', () => {
    const props = hijackElementProps({ data: '', number: 1, fontSize: '12rpx' });
    expect(props).toStrictEqual({
      data: '', number: 1, fontSize: '12rpx',
    });
  });

  it('hijackElementProps style', () => {
    const props = hijackElementProps({ style: { fontSize: 14, height: '12px', with: '12rpx' } });
    expect(props).toStrictEqual({
      style: {
        fontSize: 14,
        height: '12px',
        with: '1.6vw',
      },
    });
  });

  it('hijackElementProps base64', () => {
    const props = hijackElementProps({ style: { backgroundImage: 'url(\'data:image/png;base64,iVBORwrpx...)' } });
    expect(props).toStrictEqual({
      style: {
        backgroundImage: 'url(\'data:image/png;base64,iVBORwrpx...)',
      },
    });
  });
});
