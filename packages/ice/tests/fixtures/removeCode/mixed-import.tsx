import React, { useState, useEffect } from 'react';

export default function Bar() {
  const [str] = useState('');
  useEffect(() => {}, []);
  return <React.Fragment>{str}</React.Fragment>;
}

export function getConfig() {
  return { a: 1 };
}