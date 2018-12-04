import React from 'react';

const BasicLayout = () => {
  return (
    <div style={styles.container}>
      {/* Aside */}
      <div style={styles.aside} />

      {/* Main */}
      <div style={styles.main}>
        {/* Header */}
        <div style={styles.header} />

        {/* Content */}
        <div style={styles.content}>
          <h2 style={styles.title}>ICE Layout</h2>
          <p style={styles.description}>
            Edit <code>src/index.js</code> and save to reload.
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    background: '#eee',
  },
  aside: {
    width: '240px',
    background: '#06152a',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
  },
  header: {
    width: '100%',
    height: '64px',
    boxShadow: '0 1px 4px rgba(0,21,41,.08)',
    background: '#fff',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100vh',
    margin: '20px',
    background: '#fff',
    borderRadius: '4px',
  },
  title: {
    margin: '30px 0',
    fontSize: '28px',
  },
  description: {
    margin: '0 0 30px',
    fontSize: '18px',
  },
};

export default BasicLayout;
