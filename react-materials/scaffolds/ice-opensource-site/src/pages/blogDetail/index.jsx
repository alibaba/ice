import React from 'react';
import ReactDOM from 'react-dom';
import { scroller } from 'react-scroll';
import path from 'path';
import 'whatwg-fetch'; // fetch polyfill
import Language from '../../components/language';
import Header from '../../components/header';
import Footer from '../../components/footer';
import './index.scss';

// 锚点正则
const anchorReg = /^#[^/]/;
// 相对地址正则，包括./、../、直接文件夹名称开头、直接文件开头
const relativeReg = /^((\.{1,2}\/)|([\w-]+[/.]))/;
class BlogDetail extends Language {

  constructor(props) {
    super(props);
    this.state = {
      __html: '',
    };
  }

  componentDidMount() {
    // 通过请求获取生成好的json数据，静态页和json文件在同一个目录下
    fetch(window.location.pathname.replace(/\.html$/i, '.json'))
    .then(res => res.json())
    .then((md) => {
      this.setState({
        __html: md && md.__html ? md.__html : '',
      });
    });
    this.markdownContainer.addEventListener('click', (e) => {
      const isAnchor = e.target.nodeName.toLowerCase() === 'a' && e.target.getAttribute('href') && anchorReg.test(e.target.getAttribute('href'));
      if (isAnchor) {
        e.preventDefault();
        const id = e.target.getAttribute('href').slice(1);
        scroller.scrollTo(id, {
          duration: 1000,
          smooth: 'easeInOutQuint',
        });
      }
    });
  }

  componentDidUpdate() {
    this.handleRelativeLink();
    this.handleRelativeImg();
  }

  handleRelativeLink() {
    const language = this.getLanguage();
    // 获取当前文档所在文件系统中的路径
    // rootPath/en-us/blog/dir/hello.html => /blog/en-us/dir
    const splitPart = window.location.pathname.replace(`${window.rootPath}/${language}`, '').split('/').slice(0, -1);
    const filePath = splitPart.join('/');
    const alinks = Array.from(this.markdownContainer.querySelectorAll('a'));
    alinks.forEach((alink) => {
      const href = alink.getAttribute('href');
      if (relativeReg.test(href)) {
        // 文档之间有中英文之分，md的相对地址要转换为对应HTML的地址
        alink.href = `${path.join(`${window.rootPath}/${language}`, filePath, href.replace(/\.(md|markdown)$/, '.html'))}`;
      }
    });
  }

  handleRelativeImg() {
    const language = this.getLanguage();
    // 获取当前文档所在文件系统中的路径
    // rootPath/en-us/blog/dir/hello.html => /blog/en-us/dir
    const splitPart = window.location.pathname.replace(`${window.rootPath}/${language}`, '').split('/').slice(0, -1);
    splitPart.splice(2, 0, language);
    const filePath = splitPart.join('/');
    const imgs = Array.from(this.markdownContainer.querySelectorAll('img'));
    imgs.forEach((img) => {
      const src = img.getAttribute('src');
      if (relativeReg.test(src)) {
        // 图片无中英文之分
        img.src = `${path.join(window.rootPath, filePath, src)}`;
      }
    });
  }

  render() {
    const language = this.getLanguage();
    const __html = this.props.__html || this.state.__html;
    return (
      <div className="blog-detail-page">
        <Header
          type="normal"
          currentKey="blog"
          logo="/img/dubbo_colorful.png"
          language={language}
          onLanguageChange={this.onLanguageChange}
        />
        <section
          className="blog-content markdown-body"
          ref={(node) => { this.markdownContainer = node; }}
          dangerouslySetInnerHTML={{ __html }}
        />
        <Footer logo="/img/dubbo_gray.png" language={language} />
      </div>
    );
  }
}

document.getElementById('root') && ReactDOM.render(<BlogDetail />, document.getElementById('root'));

export default BlogDetail;
