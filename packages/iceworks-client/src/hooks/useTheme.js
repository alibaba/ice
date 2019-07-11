import { useState } from 'react';

const useTheme = (initTheme) => {
  const [theme, fn] = useState(initTheme);

  const setTheme = (newTheme) => {
    fn(newTheme);
    // eslint-disable-next-line
    window.__changeTheme__(newTheme);
  };

  return [
    theme,
    setTheme,
  ];
};

export default useTheme;
