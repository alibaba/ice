import * as path from 'path';
import * as fs from 'fs-extra';

// Set and get published packages info
const PACKAGE_TEMP_FILE = 'publishedPackages.temp.json';
export function setPublishedPackages(publishedPackages: string[]): void {
  fs.writeFileSync(path.join(__dirname, PACKAGE_TEMP_FILE), JSON.stringify(publishedPackages));
}
export function getPublishedPackages(): string[] {
  return JSON.parse(fs.readFileSync(path.join(__dirname, PACKAGE_TEMP_FILE), 'utf-8'));
}
