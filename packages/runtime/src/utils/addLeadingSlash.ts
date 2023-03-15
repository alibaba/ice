const addLeadingSlash = (url = '') => (url.charAt(0) === '/' ? url : `/${url}`);

export default addLeadingSlash;
