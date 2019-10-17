const fs = require('fs-extra')
const path = require('path')
const util = require('util')

const MAX_LINES = 1000

/**
 * Applies unified format to Date object.
 * @param {Date} now
 * @returns {string}
 */
function formatTimestamp (now = new Date()) {
  return now.getFullYear() + '-' +
    String(now.getMonth() + 1).padStart(2, '0') + '-' +
    String(now.getDate()).padStart(2, '0') + ' ' +
    String(now.getHours()).padStart(2, '0') + ':' +
    String(now.getMinutes()).padStart(2, '0') + ':' +
    String(now.getSeconds()).padStart(2, '0')
}

/**
 * @typedef {Object} LogerOptions
 * @property {string} logPath - Path to a file containing log. If the file does not exist, it will be created.
 * @property {boolean} [useConsole = false] - If set to true, loger will also send output to `console.log()`.
 * @property {number} [maxLines = 1000] - Content of log file will be truncated to this number of lines.
 */

/**
 * Creates Loger object.
 * @param options
 * @returns {Promise<{log(string): Promise<void>}>}
 */
async function createLoger (options = {}) {
  const {
    logPath,
    useConsole = false,
    maxLines = MAX_LINES
  } = options

  if (!logPath) {
    throw new Error('Path is required')
  }

  await fs.ensureFile(logPath)

  return {
    async log (input) {
      const logLine = formatTimestamp() + ' | ' + input

      if (useConsole) {
        console.log(logLine)
      }

      const logContent = String(await fs.readFile(logPath)).split('\n')
        .slice(1 - maxLines)
        .concat(logLine)
        .join('\n')

      await fs.writeFile(logPath, logContent)
    }
  }
}

module.exports = {
  createLoger
}
