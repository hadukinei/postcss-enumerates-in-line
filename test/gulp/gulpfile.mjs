/**
 * Load modules
 */

// Stream
import { src, dest, series, watch } from 'gulp'
import plumber from 'gulp-plumber'
import fs from 'node:fs'

// SCSS
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
const sass = gulpSass(dartSass)

// PostCSS
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import csso from 'postcss-csso'
//import { enumSpreader } from 'postcss-enumerates-in-line'
import { enumSpreader } from '../../index.mjs'

// Live Server
import browserSync from 'browser-sync'


/**
 * Tasks
 */

// Copy
const task_copy = done => {
  src('src/{index.html,js/app.js}', {
    allowEmpty: true,
  })
  .pipe(plumber())
  .pipe(dest('dist'))

  done()
}

// CSS <- SCSS
const task_css = done => {
  src('src/css/**/!(_)*.scss', {
    allowEmpty: true,
  })
  .pipe(plumber())
  .pipe(sass())
  .pipe(postcss([
    enumSpreader({
      //prependDefaultColor: 'rgb',
      //prependDefaultStyle: false,
    }),
    autoprefixer(),
    csso(),
  ]))
  .pipe(dest('dist/css'))

  done()
}

// Clean
const task_clean = done => {
	if(fs.existsSync('dist')) {
		fs.rmSync('dist', { recursive: true })
	}

  done()
}

// Server
const task_watch = done => {
	watch('src/{index.html,js/app.js}', series(task_copy, task_reload))
	watch('src/css/**/*.scss', series(task_css, task_reload))

  done()
}

const task_reload = done => {
	browserSync.reload()
	done()
}

const task_server = done => {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
    //open: false,
  })

  done()
}


/**
 * Exports
 */

// npm run build
export default series(
  task_copy,
  task_css,
)

// npm run dev
export const dev = series(
  task_copy,
  task_css,
  task_server,
  task_watch,
)

// npm run clean
export const clean = series(
  task_clean,
)
