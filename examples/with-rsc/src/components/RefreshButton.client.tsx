'use client';
import { useRSCRouter } from '@ice/runtime';

export default function Button({ children }) {
  const router = useRSCRouter();

  return (
    <button
      className={[
        'edit-button',
        'edit-button--solid',
      ].join(' ')}
      onClick={() => router.refresh()}
      role="menuitem"
    >
      {children}
    </button>
  );
}
