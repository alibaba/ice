import { useState } from 'react';
import termManager from '@utils/termManager';

const TERM_THEMES = {
  dark: {
    foreground: '#fff',
    background: '#333646',
  },
  light: {
    foreground: '#333',
    background: '#f7f8fa',
  },
};

const termIds = [];

const useTermTheme = (initTheme, termId) => {
  const [theme, setTermTheme] = useState(initTheme);
  const themeValue = (theme.indexOf('dark') > -1) ? 'dark' : 'light';

  if (termId && !termIds.includes(termId)) {
    termIds.push(termId);
  }

  termIds.forEach(id => {
    const term = termManager.find(id);
    if (term) {
      term.setOption('theme', TERM_THEMES[themeValue]);
    }
  });

  return {
    termTheme: TERM_THEMES[themeValue],
    themeValue,
    setTermTheme,
  };
};

export default useTermTheme;
