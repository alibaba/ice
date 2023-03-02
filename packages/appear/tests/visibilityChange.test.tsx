/**
 * @vitest-environment jsdom
 */

import { it, describe, expect, afterEach } from 'vitest';
import { render, waitFor, cleanup } from '@testing-library/react';
import React, { useState } from 'react';
import VisibilityChange from '../src/index';
import { useFnTimes } from '../src/hooks';
const nextTick = () => Promise.resolve();

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
      return (
        <div id="container">
          <VisibilityChange
            onAppear={() => {
              ++appearCount;
            }}
            onFirstAppear={() => {
              ++firstAppearCount;
            }}
            onDisappear={() => {
              ++disappearCount;
            }}
          >
            <span id="content" />
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

  it('useFnTimes', async () => {
    const times = 3;
    function App() {
      const [count, setCount] = useState(0);
      const [show, setShow] = useState(true);
      const handleAppear = useFnTimes(() => {
        setCount(count + 1);
      }, times);
      return (
        <div
          id="container"
          onClick={() => {
            setShow(!show);
          }}
        >
          {show ? (
            <VisibilityChange onAppear={handleAppear}>
              <span data-testid="count">{count}</span>
            </VisibilityChange>
          ) : undefined}
        </div>
      );
    }
    const { getByTestId } = render(<App />);
    const container = document.querySelector<HTMLDivElement>('#container')!;
    (async () => {
      for (let i = 1; i <= times; i++) {
        await waitFor(() => {
          expect(getByTestId('count').textContent).toBe(`${i}`);
        });
        container.click(); // show: false
        await nextTick();
        container.click(); // show: true
      }
    })();
  });
});
