import React from 'react';
import ReactDOM from 'react-dom';
import Language from '../../components/language';
import Header from '../../components/header';
import Bar from '../../components/bar';
import PageSlider from '../../components/pageSlider';
import BlogItem from './blogItem';
import Footer from '../../components/footer';
import blogConfig from '../../../site_config/blog';
import { getLink } from '../../../utils';
import './index.scss';

class Blog extends Language {

  render() {
    const language = this.getLanguage();
    const dataSource = blogConfig[language];
    const blogs = dataSource.list;
    return (
      <div className="blog-list-page">
        <Header
          type="normal"
          currentKey="blog"
          logo="/img/dubbo_colorful.png"
          language={language}
          onLanguageChange={this.onLanguageChange}
        />
        <Bar img="/img/system/blog.png" text={dataSource.barText} />
        <section className="blog-container">
          <div className="col col-18 left-part">
            <PageSlider pageSize={5}>
            {
              blogs.map((blog, i) => (
                <BlogItem key={i} dataSource={blog} />
              ))
            }
            </PageSlider>
          </div>
          <div className="col col-6 right-part">
            <h4>{dataSource.postsTitle}</h4>
            <ul>
            {
              blogs.map((blog, i) => (
                <li key={i}><a href={getLink(blog.link)} target={blog.target || '_self'}><span>{blog.dateStr}&nbsp;&nbsp;</span><span>{blog.title}</span></a></li>
              ))
            }
            </ul>
          </div>
        </section>
        <Footer logo="/img/dubbo_gray.png" language={language} />
      </div>
    );
  }
}

document.getElementById('root') && ReactDOM.render(<Blog />, document.getElementById('root'));

export default Blog;
