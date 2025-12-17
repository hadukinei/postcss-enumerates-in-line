/**
 * Load package
 */

// Files
import fs from 'node:fs'


/**
 * task
 */

const task = () => {
  if(!fs.existsSync('dist/')) {
    fs.mkdirSync('dist')
  }

  if(!fs.existsSync('dist/js/')) {
    fs.mkdirSync('dist/js')
  }

  if(!fs.existsSync('dist/css/')) {
    fs.mkdirSync('dist/css')
  }

  fs.copyFileSync('src/index.html', 'dist/index.html')
  fs.copyFileSync('src/js/app.js', 'dist/js/app.js')
}

task()
