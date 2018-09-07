<% if(type === 'redux') { %>
import BasicLayout from './BasicLayout';

export default BasicLayout;
<% } else { %>
import <%= name %> from './<%= name %>';

export default <%= name %>;
<% } %>
