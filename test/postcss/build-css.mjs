/**
 * Load package
 */

// Files
import fs from 'node:fs'
import { glob } from 'glob'
import path from 'node:path'

// SCSS
import * as dartSass from 'sass'

// PostCSS
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import csso from 'postcss-csso'
import { enumSpreader } from 'postcss-enumerates-in-line'
//import { enumSpreader } from '../../index.mjs'


/**
 * task
 */

const task = async () => {
  const files = await glob('src/css/**/!(_)*.scss', {
    ignore: 'node_modules/**',
  })

  files.forEach(file => {
    const distPath = path.dirname(file).replace(/^src/, 'dist') + path.sep + path.basename(file).replace(/\.scss$/, '.css')

    let body = fs.readFileSync(file, {
      encoding: 'utf-8',
    })

    body = dartSass.compile(file).css.replace(/[\t\r\n\s]+/g, ' ')

    postcss([
      enumSpreader({
        //prependDefaultColor: 'rgb',
        //prependDefaultStyle: false,
      }),
      autoprefixer(),
      csso(),
    ])
    .process(body, {from: file, to: distPath})
    .then(res => {
      fs.writeFileSync(res.opts.to, res.css)
    })
  })
}

task()
