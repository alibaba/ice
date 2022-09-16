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
            resolve();
          }}
        >
          <span>content</span>
        </VisibilityChange>);
      }

      render(<App />);
    });
  });
});
