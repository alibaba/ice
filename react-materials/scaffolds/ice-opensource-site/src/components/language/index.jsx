import React from 'react';
import { autobind } from 'core-decorators';
import cookie from 'js-cookie';
import siteConfig from '../../../site_config/site';

@autobind
class Language extends React.Component {
  
  onLanguageChange(language) {
    const pathname = window.location.pathname;
    let oldLang;
    if (language === 'zh-cn') {
      oldLang = 'en-us';
    } else {
      oldLang = 'zh-cn';
    }
    const newPathname = pathname.replace(`${window.rootPath}/${oldLang}`, `${window.rootPath}/${language}`);
    cookie.set('docsite_language', language, { expires: 365 });
    window.location = newPathname;
  }

  getLanguage() {
    const urlLang = window.location.pathname.replace(window.rootPath || '', '').split('/')[1];
    let language = this.props.lang || urlLang || cookie.get('docsite_language') || siteConfig.defaultLanguage;
    // 防止链接被更改导致错误的cookie存储
    if (language !== 'en-us' && language !== 'zh-cn') {
      language = siteConfig.defaultLanguage;
    }
    // 同步cookie语言版本
    if (language !== cookie.get('docsite_language')) {
      cookie.set('docsite_language', language, { expires: 365 });
    }
    return language;
  }
}

export default Language;
