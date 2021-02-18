module.exports = ({ name, source }) => {
  if (name) return name;
  // pages/Home/index => pages_Home_index
  return source.replace(/\//g, '_');
};
