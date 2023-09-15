'use client';
import { useRefresh } from '@ice/runtime';

export default function Button({ children }) {
  const refresh = useRefresh();

  return (
    <button
      className={[
        'edit-button',
        'edit-button--solid',
      ].join(' ')}
      onClick={() => refresh()}
      role="menuitem"
    >
      {children}
    </button>
  );
}
