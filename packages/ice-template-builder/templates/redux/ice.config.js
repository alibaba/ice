module.exports = {
  plugins: [
    [
      'ice-plugin-fusion',
      {
        themePackage: '@icedesign/theme',
        <% if (themeConfig) { %>themeConfig: <%- JSON.stringify(themeConfig) %><% } %>
      },
    ],
  ],
};
