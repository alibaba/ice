/**
 * @vitest-environment jsdom
 */

import { it, describe, expect, afterEach } from 'vitest';
import { render, waitFor, cleanup } from '@testing-library/react';
import React, { useState } from 'react';
import VisibilityChange from '../src/index';

describe('visibilytyChange', () => {
  afterEach(cleanup);
  it('appear', () => {
    return new Promise((resolve) => {
      function App() {
        return (
          <VisibilityChange
            onAppear={() => {
              resolve(true);
            }}
          >
            <span>content</span>
          </VisibilityChange>
        );
      }

      render(<App />);
    });
  });

  it('child shold work with ref', () => {
    return new Promise((resolve) => {
      function App() {
        const ref = React.useRef(null);
        React.useEffect(() => {
          if (ref) {
            resolve(true);
          }
        }, [ref]);
        return (
          <VisibilityChange onAppear={() => {}}>
            <span>content</span>
          </VisibilityChange>
        );
      }

      render(<App />);
    });
  });

  it('appear,firstappear,disappear', async () => {
    let appearCount = 0;
    let firstAppearCount = 0;
    let disappearCount = 0;
    function App() {
      const [count, setCount] = useState(0);
      return (
        <div id="container">
          <VisibilityChange
            onAppear={() => {
              ++appearCount;
              setCount(count + 1);
            }}
            onFirstAppear={() => {
              ++firstAppearCount;
            }}
            onDisappear={() => {
              ++disappearCount;
            }}
          >
            <span id="content">{count}</span>
          </VisibilityChange>
        </div>
      );
    }
    render(<App />);
    const container = document.querySelector<HTMLDivElement>('#container')!;
    const content = document.querySelector<HTMLDivElement>('#content')!;
    await waitFor(() => {
      expect(appearCount).toBe(1);
      expect(firstAppearCount).toBe(1);

      expect(content.getAttribute('data-appeared')).toBe('true');
    });
    container.style.display = 'none';
    await waitFor(() => {
      expect(disappearCount).toBe(1);
    });
    container.style.display = 'block';
    await waitFor(() => {
      expect(firstAppearCount).toBe(1);
      expect(appearCount).toBe(2);
    });
    container.style.display = 'none';
    await waitFor(() => {
      expect(disappearCount).toBe(2);
    });
  });
});
