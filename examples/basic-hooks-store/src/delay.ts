export default function(time) {
  return new Promise((resolve) => setTimeout(() => resolve(true), time));
}
