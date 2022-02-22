/**
 * 首页
 */
import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Splash from '../components/Splash';
import Feature from '../components/Feature';
// import Ecology from '../components/Ecology';
import Users from '../components/Users';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`${siteConfig.title}-${siteConfig.tagline}`} description="基于 React 的应用研发框架">
      <Splash />
      <main>
        <Feature />
        {/* <Ecology /> */}
        <Users />
      </main>
    </Layout>
  );
}
