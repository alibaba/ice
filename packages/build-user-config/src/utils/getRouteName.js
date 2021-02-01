module.exports = ({ name, source }) => {
  if (name) return name;
  return source.match(/pages\/([^/]*)/)[1].toLocaleLowerCase();
};
