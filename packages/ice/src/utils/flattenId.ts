export default function flattenId(id: string): string {
  return id.replace(/(\s*>\s*)/g, '__').replace(/[/.:]/g, '_');
}
