/**
 * generate i18n data
 *
 * @param {*} sourceData
 * @returns
 */
function generateI18nData(sourceData) {
  const locales = {};

  Object.keys(sourceData).forEach((key) => {
    locales[key] = parseI18NString(sourceData[key]);
  });

  return mergeI18N(locales);
}

/**
 * parse i18n string;
 *
 * i18n string:
 * [zh_CN]这是个描述 [en_US] this is a description
 * 这是个描述 [en_US] this is a description
 * 这是个描述 [en_US] this is a description
 * this is a description [zh_CN] 这是个描述
 *
 * @param {string} i18nStr
 * @returns
 */
function parseI18NString(i18nStr) {
  // i18n pattern
  const flagReg = /(.*)(\[([\w]+)\])(.*)/;
  const cnReg = /[\u4e00-\u9fa5]+/g;
  const local = {};

  parseString(i18nStr);

  return local;

  function parseString(str = '') {
    const match = flagReg.exec(str);

    if (!match) {
      if (cnReg.test(str)) {
        local.zh_CN = str.trim();
      } else {
        local.en_US = str.trim();
      }
      return;
    }

    const [, $1, , $3, $4] = match;
    local[$3] = $4.trim();

    if ($1) {
      parseString($1);
    }
  }
}

/**
 * merge multi i18n data
 *
 * @param {object} sourceData
 * @returns
 */
function mergeI18N(sourceData) {
  const locales = {};

  Object.keys(sourceData).forEach((key) => {
    const i18nObj = sourceData[key];
    Object.keys(i18nObj).forEach((lang) => {
      if (locales[lang]) {
        locales[lang][key] = i18nObj[lang];
      } else {
        locales[lang] = {
          [key]: i18nObj[lang],
        };
      }
    });
  });

  return locales;
}

module.exports = generateI18nData;
