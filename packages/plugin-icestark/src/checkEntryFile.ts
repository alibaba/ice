export default (entryList: string[],  filename: string) => {
  return !!entryList.find((filePath: string) => {
    // filePath may not have an extension
    return filePath.includes((filename || '').replace(/\.[^/.]+$/, ''));
  });
};