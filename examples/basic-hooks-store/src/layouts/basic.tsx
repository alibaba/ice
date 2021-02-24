import * as React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      <h2>Header</h2>
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
