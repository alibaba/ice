import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { autobind } from 'core-decorators';
import siteConfig from '../../../site_config/site';
import { getLink } from '../../../utils';
import './index.scss';

const languageSwitch = [
  {
    text: '中',
    value: 'en-us',
  },
  {
    text: 'En',
    value: 'zh-cn',
  },
];
const noop = () => {};
const propTypes = {
  currentKey: PropTypes.string,
  logo: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['primary', 'normal']),
  language: PropTypes.oneOf(['en-us', 'zh-cn']),
  onLanguageChange: PropTypes.func,
};
const defaultProps = {
  type: 'primary',
  language: 'en-us',
  onLanguageChange: noop,
};

@autobind
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuBodyVisible: false,
      language: props.language,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      language: nextProps.language,
    });
  }

  toggleMenu() {
    this.setState({
      menuBodyVisible: !this.state.menuBodyVisible,
    });
  }

  switchLang() {
    let language;
    if (this.state.language === 'zh-cn') {
      language = 'en-us';
    } else {
      language = 'zh-cn';
    }
    this.setState({
      language,
    });
    this.props.onLanguageChange(language);
  }

  render() {
    const { type, logo, onLanguageChange, currentKey } = this.props;
    const { menuBodyVisible, language } = this.state;
    return (
      <header
        className={
          classnames({
            'header-container': true,
            [`header-container-${type}`]: true,
          })
        }
      >
        <div className="header-body">
          <a href={getLink(`/${language}/index.html`)}>
            <img className="logo" alt={siteConfig.name} title={siteConfig.name} src={getLink(logo)} />
          </a>
          {
            onLanguageChange !== noop ?
            (<span
              className={
                classnames({
                  'language-switch': true,
                  [`language-switch-${type}`]: true,
                })
              }
              onClick={this.switchLang}
            >
              {languageSwitch.find(lang => lang.value === language).text}
            </span>)
            :
            null
          }
          <div
            className={
              classnames({
                'header-menu': true,
                'header-menu-open': menuBodyVisible,
              })
            }
          >
            <img
              className="header-menu-toggle"
              onClick={this.toggleMenu}
              src={type === 'primary' ? getLink('/img/system/menu_white.png') : getLink('/img/system/menu_gray.png')}
            />
            <ul>
              {siteConfig[language].pageMenu.map(item => (
                <li
                  className={classnames({
                    'menu-item': true,
                    [`menu-item-${type}`]: true,
                    [`menu-item-${type}-active`]: currentKey === item.key,
                  })}
                  key={item.key}
                >
                  <a href={getLink(item.link)} target={item.target || '_self'}>{item.text}</a>
                </li>))}
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;
export default Header;
