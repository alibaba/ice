const Path = require('path');
const pathExists = require('path-exists');
const { spawn } = require('child_process');
const { APP_PATH } = require('./paths');
const logger = require('./logger');

// 查询注册表

const { getActiveCodePage } = require('./shell');

// This is a stripped back version of winreg:
// https://github.com/fresc81/node-winreg
//
// I was seeing significant overhead when spawning the process to enumerate
// the keys found by `reg.exe`, and rather than trying to fix and potentially
// regress other parts I've extracted just the bit that I need to use.

const ITEM_PATTERN = /^(.*)\s(REG_SZ|REG_MULTI_SZ|REG_EXPAND_SZ|REG_DWORD|REG_QWORD|REG_BINARY|REG_NONE)\s+([^\s].*)$/;

function parse(output) {
  const lines = output.split('\n');

  const items = [];
  const results = [];
  let lineNumber = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.length > 0) {
      if (lineNumber !== 0) {
        items.push(line);
      }
      ++lineNumber;
    }
  }

  for (let i = 0; i < items.length; i++) {
    const match = ITEM_PATTERN.exec(items[i]);
    if (match) {
      const name = match[1].trim();
      const type = match[2].trim();
      const value = match[3];
      results.push({ name, type, value });
    }
  }

  return results;
}

function getPathToBatchFile() {
  return Path.join(APP_PATH, 'static', 'registry.bat');
}

const batchFilePath = getPathToBatchFile();

function readRegistry(key, activeCodePage) {
  return new Promise((resolve) => {
    const proc = spawn(batchFilePath, [key, activeCodePage.toString()], {
      cwd: undefined,
    });

    const buffers = [];
    let errorThrown = false;
    proc.on('close', (code) => {
      if (errorThrown) {
        resolve([]);
      } else if (code !== 0) {
        logger.debug(`Unable to find registry key - exit code ${code} returned`);
        resolve([]);
      } else {
        const output = Buffer.concat(buffers).toString('utf8');
        const results = parse(output);
        resolve(results);
      }
    });

    proc.stdout.on('data', (data) => {
      buffers.push(data);
    });

    proc.on('error', (err) => {
      errorThrown = true;
      logger.debug('An error occurred while trying to find the program', err);
    });
  });
}

/**
 * Read registry keys found at the expected location.
 *
 * This method will return an empty list if the expected key does not exist,
 * instead of throwing an error.
 *
 * @param key The registry key to lookup
 */
exports.readRegistryKeySafe = async function readRegistryKeySafe(key) {
  const exists = await pathExists(batchFilePath);
  if (!exists) {
    logger.error(new Error(`Unable to find batch script at expected location: '${batchFilePath}'`));
    return [];
  }

  const activeCodePage = await getActiveCodePage();
  if (!activeCodePage) {
    logger.debug('Unable to resolve active code page');
    return [];
  }
  // eslint-disable-next-line
  return await readRegistry(key, activeCodePage);
};
