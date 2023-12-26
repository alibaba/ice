'use client';
import { useTransition } from 'react';

export default function EditButton({ noteId, children }) {
  const [isPending, startTransition] = useTransition();
  const isDraft = noteId == null;
  return (
    <button
      className={[
        'edit-button',
        isDraft ? 'edit-button--solid' : 'edit-button--outline',
      ].join(' ')}
      disabled={isPending}
      onClick={() => {
        startTransition(() => {
          console.log('onClick');
        });
      }}
      role="menuitem"
    >
      {children}
    </button>
  );
}
