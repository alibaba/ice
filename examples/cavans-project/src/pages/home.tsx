import { definePageConfig, CacheCanvas } from 'ice';
import { useRef } from 'react';
import styles from './index.module.css';

const GAME_CANVAS_ID = 'canvas-id';

export default function Home() {
  const childRef = useRef();
  const initFunc = () => {
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
  };
  return (
    <>
      <h2 className={styles.title}>Home Page</h2>
      <CacheCanvas ref={childRef} id={GAME_CANVAS_ID} init={initFunc} />
      <button onClick={() => {
        childRef.current?.cacheCanvasToStorage();
      }}
      >cache canvas</button>
    </>
  );
}

export const pageConfig = definePageConfig(() => {
  return {
    title: 'Home',
    meta: [
      {
        name: 'theme-color',
        content: '#000',
      },
      {
        name: 'title-color',
        content: '#f00',
      },
    ],
    auth: ['admin'],
  };
});
