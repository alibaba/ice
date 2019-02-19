import fs from 'fs';
import path from 'path';
import { log } from './bridge';

/* eslint-disable no-empty */

/**
 * 检测是否符合 iceworks 运行的项目
 * @param {String} projectPath  项目目录地址
 * @return promise
 */
export const isProject = async (projectPath) => {
  const pkgPath = path.join(projectPath, 'package.json');

  if (!fs.existsSync(pkgPath)) {
    return false;
  }
  // fixme 只特征检测，目前足够宽泛，只要存在 package.json 文件就识别
  try {
    let pkgData = fs.readFileSync(pkgPath);
    pkgData = JSON.parse(pkgData.toString());
    return pkgData;
  } catch (e) {
    log.error(e);
    return false;
  }
};

/**
 * 检测当前目录状态，权限，是否为当前项目等
 * @param {String} projectPath  项目目录地址
 */
export const checkProject = (currentPath) => {
  // 检查是否可用
  if (fs.accessSync(currentPath)) {
    return 'noAccess';
  }

  // 检查是否存在文件
  const dir = fs.readdirSync(currentPath);
  if (dir.length > 0) {
    // 检查存在的文件是否是合法项目
    // @TODO 检查 abc.json 判断是不是 ice 项目
    try {
      const exited = fs.existsSync(path.join(currentPath, './package.json'));
      if (exited) {
        return 'legalProject';
      }
    } catch (error) {}

    return 'hasFiles';
  }
  return 'emptyProject';
};

/**
 * 根据目录地址后去默认的项目名
 * @param {String} projectPath  项目目录地址
 */
export const getDefaultProjectName = (projectPath) => {
  // All valid unicode categories
  const UNICODE = {
    letter: new RegExp(
      '[\\u0041-\\u005A\\u0061-\\u007A\\u00AA\\u00B5\\u00BA\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u037F\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u052F\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0620-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0800-\\u0815\\u081A\\u0824\\u0828\\u0840-\\u0858\\u08A0-\\u08B2\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971-\\u0980\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0CF1\\u0CF2\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D\\u0D4E\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC-\\u0EDF\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8C\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16EE-\\u16F8\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1A20-\\u1A54\\u1AA7\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1BBA-\\u1BE5\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1CE9-\\u1CEC\\u1CEE-\\u1CF1\\u1CF5\\u1CF6\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u209C\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2160-\\u2188\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CEE\\u2CF2\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FCC\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA66E\\uA67F-\\uA69D\\uA6A0-\\uA6EF\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA78E\\uA790-\\uA7AD\\uA7B0\\uA7B1\\uA7F7-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA8F2-\\uA8F7\\uA8FB\\uA90A-\\uA925\\uA930-\\uA946\\uA960-\\uA97C\\uA984-\\uA9B2\\uA9CF\\uA9E0-\\uA9E4\\uA9E6-\\uA9EF\\uA9FA-\\uA9FE\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAA60-\\uAA76\\uAA7A\\uAA7E-\\uAAAF\\uAAB1\\uAAB5\\uAAB6\\uAAB9-\\uAABD\\uAAC0\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEA\\uAAF2-\\uAAF4\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uAB30-\\uAB5A\\uAB5C-\\uAB5F\\uAB64\\uAB65\\uABC0-\\uABE2\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]'
    ),

    digit: new RegExp(
      '[\\u0030-\\u0039\\u0660-\\u0669\\u06F0-\\u06F9\\u07C0-\\u07C9\\u0966-\\u096F\\u09E6-\\u09EF\\u0A66-\\u0A6F\\u0AE6-\\u0AEF\\u0B66-\\u0B6F\\u0BE6-\\u0BEF\\u0C66-\\u0C6F\\u0CE6-\\u0CEF\\u0D66-\\u0D6F\\u0DE6-\\u0DEF\\u0E50-\\u0E59\\u0ED0-\\u0ED9\\u0F20-\\u0F29\\u1040-\\u1049\\u1090-\\u1099\\u17E0-\\u17E9\\u1810-\\u1819\\u1946-\\u194F\\u19D0-\\u19D9\\u1A80-\\u1A89\\u1A90-\\u1A99\\u1B50-\\u1B59\\u1BB0-\\u1BB9\\u1C40-\\u1C49\\u1C50-\\u1C59\\uA620-\\uA629\\uA8D0-\\uA8D9\\uA900-\\uA909\\uA9D0-\\uA9D9\\uA9F0-\\uA9F9\\uAA50-\\uAA59\\uABF0-\\uABF9\\uFF10-\\uFF19]'
    ),

    connector_punctuation: new RegExp(
      '[\\u005F\\u203F\\u2040\\u2054\\uFE33\\uFE34\\uFE4D-\\uFE4F\\uFF3F]'
    ),

    format: new RegExp(
      '[\\u0600-\\u0605\\u061C\\u06DD\\u070F\\u180E\\u200B-\\u200F\\u202A-\\u202E\\u2060-\\u2064\\u2066-\\u206F\\uFEFF\\uFFF9-\\uFFFB]'
    ),

    non_spacing_mark: new RegExp(
      '[\\u0300-\\u036F\\u0483-\\u0487\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u0610-\\u061A\\u064B-\\u065E\\u0670\\u06D6-\\u06DC\\u06DF-\\u06E4\\u06E7\\u06E8\\u06EA-\\u06ED\\u0711\\u0730-\\u074A\\u07A6-\\u07B0\\u07EB-\\u07F3\\u0816-\\u0819\\u081B-\\u0823\\u0825-\\u0827\\u0829-\\u082D\\u0900-\\u0902\\u093C\\u0941-\\u0948\\u094D\\u0951-\\u0955\\u0962\\u0963\\u0981\\u09BC\\u09C1-\\u09C4\\u09CD\\u09E2\\u09E3\\u0A01\\u0A02\\u0A3C\\u0A41\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A70\\u0A71\\u0A75\\u0A81\\u0A82\\u0ABC\\u0AC1-\\u0AC5\\u0AC7\\u0AC8\\u0ACD\\u0AE2\\u0AE3\\u0B01\\u0B3C\\u0B3F\\u0B41-\\u0B44\\u0B4D\\u0B56\\u0B62\\u0B63\\u0B82\\u0BC0\\u0BCD\\u0C3E-\\u0C40\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C62\\u0C63\\u0CBC\\u0CBF\\u0CC6\\u0CCC\\u0CCD\\u0CE2\\u0CE3\\u0D41-\\u0D44\\u0D4D\\u0D62\\u0D63\\u0DCA\\u0DD2-\\u0DD4\\u0DD6\\u0E31\\u0E34-\\u0E3A\\u0E47-\\u0E4E\\u0EB1\\u0EB4-\\u0EB9\\u0EBB\\u0EBC\\u0EC8-\\u0ECD\\u0F18\\u0F19\\u0F35\\u0F37\\u0F39\\u0F71-\\u0F7E\\u0F80-\\u0F84\\u0F86\\u0F87\\u0F90-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u102D-\\u1030\\u1032-\\u1037\\u1039\\u103A\\u103D\\u103E\\u1058\\u1059\\u105E-\\u1060\\u1071-\\u1074\\u1082\\u1085\\u1086\\u108D\\u109D\\u135F\\u1712-\\u1714\\u1732-\\u1734\\u1752\\u1753\\u1772\\u1773\\u17B7-\\u17BD\\u17C6\\u17C9-\\u17D3\\u17DD\\u180B-\\u180D\\u18A9\\u1920-\\u1922\\u1927\\u1928\\u1932\\u1939-\\u193B\\u1A17\\u1A18\\u1A56\\u1A58-\\u1A5E\\u1A60\\u1A62\\u1A65-\\u1A6C\\u1A73-\\u1A7C\\u1A7F\\u1B00-\\u1B03\\u1B34\\u1B36-\\u1B3A\\u1B3C\\u1B42\\u1B6B-\\u1B73\\u1B80\\u1B81\\u1BA2-\\u1BA5\\u1BA8\\u1BA9\\u1C2C-\\u1C33\\u1C36\\u1C37\\u1CD0-\\u1CD2\\u1CD4-\\u1CE0\\u1CE2-\\u1CE8\\u1CED\\u1DC0-\\u1DE6\\u1DFD-\\u1DFF\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2CEF-\\u2CF1\\u2DE0-\\u2DFF\\u302A-\\u302F\\u3099\\u309A\\uA66F\\uA67C\\uA67D\\uA6F0\\uA6F1\\uA802\\uA806\\uA80B\\uA825\\uA826\\uA8C4\\uA8E0-\\uA8F1\\uA926-\\uA92D\\uA947-\\uA951\\uA980-\\uA982\\uA9B3\\uA9B6-\\uA9B9\\uA9BC\\uAA29-\\uAA2E\\uAA31\\uAA32\\uAA35\\uAA36\\uAA43\\uAA4C\\uAAB0\\uAAB2-\\uAAB4\\uAAB7\\uAAB8\\uAABE\\uAABF\\uAAC1\\uABE5\\uABE8\\uABED\\uFB1E\\uFE00-\\uFE0F\\uFE20-\\uFE26]'
    ),

    space_combining_mark: new RegExp(
      '[\\u0903\\u093E-\\u0940\\u0949-\\u094C\\u094E\\u0982\\u0983\\u09BE-\\u09C0\\u09C7\\u09C8\\u09CB\\u09CC\\u09D7\\u0A03\\u0A3E-\\u0A40\\u0A83\\u0ABE-\\u0AC0\\u0AC9\\u0ACB\\u0ACC\\u0B02\\u0B03\\u0B3E\\u0B40\\u0B47\\u0B48\\u0B4B\\u0B4C\\u0B57\\u0BBE\\u0BBF\\u0BC1\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCC\\u0BD7\\u0C01-\\u0C03\\u0C41-\\u0C44\\u0C82\\u0C83\\u0CBE\\u0CC0-\\u0CC4\\u0CC7\\u0CC8\\u0CCA\\u0CCB\\u0CD5\\u0CD6\\u0D02\\u0D03\\u0D3E-\\u0D40\\u0D46-\\u0D48\\u0D4A-\\u0D4C\\u0D57\\u0D82\\u0D83\\u0DCF-\\u0DD1\\u0DD8-\\u0DDF\\u0DF2\\u0DF3\\u0F3E\\u0F3F\\u0F7F\\u102B\\u102C\\u1031\\u1038\\u103B\\u103C\\u1056\\u1057\\u1062-\\u1064\\u1067-\\u106D\\u1083\\u1084\\u1087-\\u108C\\u108F\\u109A-\\u109C\\u17B6\\u17BE-\\u17C5\\u17C7\\u17C8\\u1923-\\u1926\\u1929-\\u192B\\u1930\\u1931\\u1933-\\u1938\\u19B0-\\u19C0\\u19C8\\u19C9\\u1A19-\\u1A1B\\u1A55\\u1A57\\u1A61\\u1A63\\u1A64\\u1A6D-\\u1A72\\u1B04\\u1B35\\u1B3B\\u1B3D-\\u1B41\\u1B43\\u1B44\\u1B82\\u1BA1\\u1BA6\\u1BA7\\u1BAA\\u1C24-\\u1C2B\\u1C34\\u1C35\\u1CE1\\u1CF2\\uA823\\uA824\\uA827\\uA880\\uA881\\uA8B4-\\uA8C3\\uA952\\uA953\\uA983\\uA9B4\\uA9B5\\uA9BA\\uA9BB\\uA9BD-\\uA9C0\\uAA2F\\uAA30\\uAA33\\uAA34\\uAA4D\\uAA7B\\uABE3\\uABE4\\uABE6\\uABE7\\uABE9\\uABEA\\uABEC]'
    ),
  };

  function is_letter(code) {
    return (
      (code >= 97 && code <= 122) ||
      (code >= 65 && code <= 90) ||
      (code >= 0xaa && UNICODE.letter.test(String.fromCharCode(code)))
    );
  }

  function is_digit(code) {
    return code >= 48 && code <= 57;
  }

  function is_unicode_digit(ch) {
    return UNICODE.digit.test(ch);
  }

  function is_unicode_format(ch) {
    return UNICODE.format.test(ch);
  }

  function is_unicode_combining_mark(ch) {
    return (
      UNICODE.non_spacing_mark.test(ch) || UNICODE.space_combining_mark.test(ch)
    );
  }

  function is_unicode_connector_punctuation(ch) {
    return UNICODE.connector_punctuation.test(ch);
  }

  /**
   * Tests if the specified character is valid.
   * @param {String} ch The character to test.
   * @returns {Boolean} The
   */
  function isValid(ch) {
    const code = ch.charCodeAt(0);
    return (
      is_letter(code) ||
      is_digit(code) ||
      ch === '.' ||
      ch === '_' ||
      is_unicode_connector_punctuation(ch) ||
      is_unicode_format(ch) ||
      is_unicode_combining_mark(ch) ||
      is_unicode_digit(ch)
    );
  }

  /**
   * Helper to replace characters at a specific index, js strings
   * are immuatable so str[index]='' wont work.
   * @param {String} value The original string to modify.
   * @param {Number} index The index of the character to replace.
   * @param {String} character The replacement character.
   * @returns {String} The modified string.
   */
  function replaceAt(value, index, character) {
    return (
      value.substr(0, index) +
      character +
      value.substr(index + character.length)
    );
  }

  let name = projectPath.split(path.sep).pop();

  if (!name || /^\s+$/.test(name)) {
    return '';
  }

  // replace invalid unicode chars
  for (let i = 0; i < name.length; i++) {
    if (!isValid(name[i])) {
      name = replaceAt(name, i, '_');
    }
  }

  return name;
};

/**
 * 检测项目名是否合法
 * @param {String} name  项目名
 */
export const validateProjectName = (proejctName) => {
  // From https://github.com/npm/validate-npm-package-name/blob/master/index.js

  const scopedPackagePattern = new RegExp('^(?:@([^/]+?)[/])?([^/]+?)$');
  // var builtins = require('builtins')
  const blacklist = ['node_modules', 'favicon.ico'];

  const done = function(warnings, errors) {
    const result = {
      validForNewPackages: errors.length === 0 && warnings.length === 0,
      validForOldPackages: errors.length === 0,
      warnings,
      errors,
    };
    if (!result.warnings.length) delete result.warnings;
    if (!result.errors.length) delete result.errors;
    return result;
  };

  const validate = function(name) {
    const warnings = [];
    const errors = [];

    if (name === null) {
      errors.push('不能为空');
      return done(warnings, errors);
    }

    if (name === undefined) {
      errors.push('不能为空');
      return done(warnings, errors);
    }

    if (typeof name !== 'string') {
      errors.push('必须为字符串');
      return done(warnings, errors);
    }

    if (!name.length) {
      errors.push('长度不能为 0');
    }

    if (name.match(/^\./)) {
      errors.push('不能以 `.` 字符开头');
    }

    if (name.match(/^_/)) {
      errors.push('不能以 `_` 开头');
    }

    if (name.trim() !== name) {
      errors.push('不能以空格开头或者结尾');
    }

    // No funny business
    blacklist.forEach((blacklistedName) => {
      if (name.toLowerCase() === blacklistedName) {
        errors.push(`${blacklistedName} 为保留名，请更改名称`);
      }
    });

    // Generate warnings for stuff that used to be allowed

    // core module names like http, events, util, etc
    // builtins.forEach(function (builtin) {
    //  if (name.toLowerCase() === builtin) {
    //    warnings.push(builtin + ' is a core module name')
    //  }
    // })

    // really-long-package-names-------------------------------such--length-----many---wow
    // the thisisareallyreallylongpackagenameitshouldpublishdowenowhavealimittothelengthofpackagenames-poch.
    if (name.length > 214) {
      warnings.push('不允许超过 214 个字符');
    }

    if (/[~'!()*]/.test(name.split('/').slice(-1)[0])) {
      warnings.push('不能再包含特殊字符 ("~\'!()*")');
    }

    if (encodeURIComponent(name) !== name) {
      // Maybe it's a scoped package name, like @user/package
      const nameMatch = name.match(scopedPackagePattern);
      if (nameMatch) {
        const user = nameMatch[1];
        const pkg = nameMatch[2];
        if (
          encodeURIComponent(user) === user &&
          encodeURIComponent(pkg) === pkg
        ) {
          return done(warnings, errors);
        }
      }

      errors.push('项目文件夹仅可使用符合 URL 规范的字符，不支持中文');
    }

    return done(warnings, errors);
  };

  validate.scopedPackagePattern = scopedPackagePattern;

  return validate(proejctName);
};

/**
 * 获取当前项目目录下的 pages, 并且过滤掉 IceworksPreviewPage
 *
 * @param {String} projectPath 项目目录地址
 * @return Promise<Array>
 */
export const scanPages = (targetPath) => {
  let pages = [];
  return new Promise((resolve) => {
    const pagesPath = path.join(targetPath, 'pages');
    try {
      pages = fs.readdirSync(pagesPath);
    } catch (e) {}

    pages = pages.filter((p) => {
      return p.toLowerCase() !== 'IceworksPreviewPage'.toLowerCase();
    });

    resolve(pages);
  });
};

/**
 * 格式化依赖包名称，用于作为执行 install 的参数
 *
 * @param {Array|Object} dependencies  依赖包名
 */
export const dependenciesFormat = function(dependencies) {
  if (Array.isArray(dependencies)) {
    return dependencies;
  } else {
    return Object.entries(dependencies).map((depGroup) => {
      return depGroup.join('@');
    });
  }
};

export const mergeDependenciesToPkg = function(dependencies, clientPath) {
  const packageFile = path.join(clientPath, 'package.json');
  return new Promise((resolve, reject) => {
    let pkgData;
    try {
      pkgData = fs.readFileSync(packageFile);
      pkgData = JSON.parse(pkgData.toString());
      pkgData.dependencies = Object.assign(
        pkgData.dependencies || {},
        dependencies
      );
      fs.writeFileSync(packageFile, JSON.stringify(pkgData, null, 2));
      resolve();
    } catch (e) {
      reject(`package.json 不存在或存在语法错误 检查${packageFile}`);
    }
  });
}