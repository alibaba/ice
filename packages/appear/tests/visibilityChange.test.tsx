/**
 * @vitest-environment jsdom
 */

import { it, describe } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import VisibilityChange from '../src/index';

describe('visibilytyChange', () => {
  it('appear', () => {
    return new Promise(resolve => {
      function App() {
        return (<VisibilityChange
          onAppear={() => {
            resolve(true);
          }}
        >
          <span>content</span>
        </VisibilityChange>);
      }

      render(<App />);
    });
  });

  it('child shold work with ref', () => {
    return new Promise(resolve => {
      function App() {
        const ref = React.useRef(null);
        React.useEffect(() => {
          if (ref) {
            resolve(true);
          }
        }, [ref]);
        return (<VisibilityChange
          onAppear={() => {
          }}
        >
          <span>content</span>
        </VisibilityChange>);
      }

      render(<App />);
    });
  });
});
