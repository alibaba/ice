/**
 * 设置当前语言
 * @param {String} lang
 */
function setLocale(lang) {
  if (lang !== undefined && !/^([a-z]{2})-([A-Z]{2})$/.test(lang)) {
    throw new Error('setLocale lang format error');
  }

  if (getLocale() !== lang) {
    window.localStorage.setItem('lang', lang);
    window.location.reload();
  }
}

/**
 * 获取当前语言
 */
function getLocale() {
  if (!window.localStorage.getItem('lang')) {
    window.localStorage.setItem('lang', navigator.language);
  }
  return localStorage.getItem('lang');
}

export { setLocale, getLocale };
