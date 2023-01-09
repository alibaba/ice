const c = {};
const { a = '', b = '' } = c;
const d = () => {
  console.log(a, b);
}

export default d;