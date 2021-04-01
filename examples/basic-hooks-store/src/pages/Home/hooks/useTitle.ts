import { useState } from 'react';

export default function useUser() {
  const [title, setTitle] = useState('hello');
  return [
    title
  ];
};
