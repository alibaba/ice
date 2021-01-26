export default async function nextTick() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('');
    }, 0);
  });
}
