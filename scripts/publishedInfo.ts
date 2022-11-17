import path from 'path';
import fse from 'fs-extra';

// Set and get published packages info
const PACKAGE_TEMP_FILE = 'publishedPackages.temp.json';
export function setPublishedPackages(publishedPackages: string[]): void {
  fse.writeFileSync(path.join(process.cwd(), PACKAGE_TEMP_FILE), JSON.stringify(publishedPackages));
}
export function getPublishedPackages(): string[] {
  return JSON.parse(fse.readFileSync(path.join(process.cwd(), PACKAGE_TEMP_FILE), 'utf-8'));
}
