# @ice/cache-canvas

React component for supporting canvas for cache.

## Usage

```bash
npm i @ice/cache-canvas -S
```

```jsx
import MainGame from './game'; // eva.js 的封装

const GAME_CANVAS = 'game-canvas';

export default (props) => {
  useEffect(() => {
    const gameEl = document.getElementById(GAME_CANVAS);
    new MainGame(gameEl, getGameHeight());
  }, []);

  const init = () => {
     return new Promise((resolve) => {
      const canvas: HTMLCanvasElement | null = document.getElementById(GAME_CANVAS_ID) as HTMLCanvasElement;
      if (canvas && typeof canvas.getContext === 'function') {
        let ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

        ctx?.fillRect(25, 25, 100, 100);
        ctx?.clearRect(45, 45, 60, 60);
        ctx?.strokeRect(50, 50, 50, 50);
      }

      setTimeout(() => {
        console.log('canvas paint ready!');
        resolve(true);
      }, 5000);
    });
  }

  return (
    <>
       <CanvasCache id={GAME_CANVAS} useCache={false} init={init} />
    </>
  );
};
```
