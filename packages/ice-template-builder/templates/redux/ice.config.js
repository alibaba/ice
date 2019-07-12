module.exports = {
  plugins: [
    [
      'ice-plugin-fusion',
      {
        <% if (themeConfig) { %>themeConfig: {
          primaryColor: "<%- themeConfig.primaryColor %>"
        }<% } %>
      },
    ],
  ],
};
