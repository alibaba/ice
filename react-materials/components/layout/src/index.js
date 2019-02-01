import Layout from './Layout';
import Section from './Section';
import Header from './Header';
import Footer from './Footer';
import Aside from './Aside';
import Main from './Main';

// 不合理的写法，为了兼容先保留着
Layout.Section = Section;
Layout.Header = Header;
Layout.Footer = Footer;
Layout.Aside = Aside;
Layout.Main = Main;

export default Layout;
export { Section, Header, Footer, Aside, Main };
