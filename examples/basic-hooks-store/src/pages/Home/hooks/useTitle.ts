import { useState } from 'react';

export default function useTitle() {
  const [title] = useState('hello');
  return [
    title
  ];
};
