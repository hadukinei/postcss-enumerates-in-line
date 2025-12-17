/**
 * Load package
 */

// Files
import fs from 'node:fs'


/**
 * task
 */
const task = () => {
  if(fs.existsSync('dist/')) {
    fs.rm('dist/', {
      recursive: true,
    }, () => {})
  }
}

task()
