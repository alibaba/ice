export default function normalizePath(path: string) {
  return path.replace(/\\/g, '/').replace(/\/{2,}/g, '/');
}
