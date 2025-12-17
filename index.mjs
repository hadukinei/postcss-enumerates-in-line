/// <reference path="index.d.ts" />

/**
 * load package
 */

// PostCSS
import postcss from 'postcss'


/**
 * global variable
 */

// define plugin name for displaying in console.log
const pluginName = 'PostCSS Enumerates in Line'

const defaultOptions = {
  prependDefaultColor: true,
  prependDefaultStyle: true,
}

let defaultStyle = [
  '*, ::before, ::after, ::backdrop, ::file-selector-button { box-sizing: border-box; margin: 0; padding: 0; border: 0 solid; }',
  '::placeholder { opacity: 1; }',
  '::spelling-error { text-decoration: none; }',
  ':root { -webkit-text-size-adjust: 100%; -webkit-tap-highlight-color: transparent; font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Symbol", "Noto Color Emoji"; font-size: 16px; font-weight: 400; line-height: 1.5; tab-size: 4; }',
  'q::before, q::after { display: none; }',
  'h1, h2, h3, h4, h5, h6 { font-size: inherit; font-weight: inherit; }',
  'hr { height: 0; border-top-width: 1px; color: inherit; }',
  'a { color: inherit; text-decoration: inherit; }',
  'b, strong { font-weight: bolder; }',
  'em { font-style: normal; }',
  'code, kbd, samp, pre { font-family: inherit; }',
  'small { font-size: 80%; }',
  'sub, sup { position: relative; vertical-align: baseline; font-size: 75%; line-height: 0; }',
  'sub { bottom: -0.25em; }',
  'sup { top: -0.5em; }',
  'ins { text-decoration: none; }',
  'mark { background-color: inherit; color: inherit; }',
  'table { border-color: inherit; border-collapse: collapse; text-indent: 0; }',
  'button, input, select, optgroup, textarea { border-radius: 0; background-color: transparent; color: inherit; font: inherit; letter-spacing: inherit; opacity: 1; }',
  'textarea { resize: vertical; }',
  'progress { vertical-align: baseline; }',
  'summary { display: list-item; }',
  'ol, ul, menu { list-style: none; }',
  'img, svg, video, canvas, audio, iframe, embed, object { display: block; }',
  'img, video { max-width: 100%; height: auto; }',
]
defaultStyle.reverse()

const defaultColorNames = ['gray', 'pink', 'orange', 'green', 'teal', 'blue', 'purple']
const defaultColorDefines = {
  rgb: {
    gray: ['#181a1b', '#303336', '#494d50', '#61666b', '#798086', '#94999e', '#afb3b6', '#c9cccf', '#e4e6e7'],
    pink: ['#2e051a', '#5c0a33', '#8a0f4d', '#b81466', '#e61980', '#eb4799', '#f075b3', '#f5a3cc', '#fad1e6'],
    orange: ['#2e1a05', '#5c330a', '#8a4d0f', '#b86614', '#e68019', '#eb9947', '#f0b375', '#f5cca3', '#fae6d1'],
    green: ['#052e05', '#0a5c0a', '#0f8a0f', '#14b814', '#19e619', '#47eb47', '#75f075', '#a3f5a3', '#d1fad1'],
    teal: ['#052e27', '#0a5c4e', '#0f8a75', '#14b89c', '#19e6c4', '#47ebcf', '#75f0db', '#a3f5e7', '#d1faf3'],
    blue: ['#05192e', '#0a335c', '#0f4c8a', '#1466b8', '#197fe6', '#4799eb', '#75b2f0', '#a3ccf5', '#d1e5fa'],
    purple: ['#19052e', '#330a5c', '#4c0f8a', '#6614b8', '#7f19e6', '#9947eb', '#b275f0', '#cca3f5', '#e5d1fa'],
  },
  hsl: {
    gray: ['hsl(210 5% 10%)', 'hsl(210 5% 20%)', 'hsl(210 5% 30%)', 'hsl(210 5% 40%)', 'hsl(210 5% 50%)', 'hsl(210 5% 60%)', 'hsl(210 5% 70%)', 'hsl(210 5% 80%)', 'hsl(210 5% 90%)'],
    pink: ['hsl(330 80% 10%)', 'hsl(330 80% 20%)', 'hsl(330 80% 30%)', 'hsl(330 80% 40%)', 'hsl(330 80% 50%)', 'hsl(330 80% 60%)', 'hsl(330 80% 70%)', 'hsl(330 80% 80%)', 'hsl(330 80% 90%)'],
    orange: ['hsl(30 80% 10%)', 'hsl(30 80% 20%)', 'hsl(30 80% 30%)', 'hsl(30 80% 40%)', 'hsl(30 80% 50%)', 'hsl(30 80% 60%)', 'hsl(30 80% 70%)', 'hsl(30 80% 80%)', 'hsl(30 80% 90%)'],
    green: ['hsl(120 80% 10%)', 'hsl(120 80% 20%)', 'hsl(120 80% 30%)', 'hsl(120 80% 40%)', 'hsl(120 80% 50%)', 'hsl(120 80% 60%)', 'hsl(120 80% 70%)', 'hsl(120 80% 80%)', 'hsl(120 80% 90%)'],
    teal: ['hsl(170 80% 10%)', 'hsl(170 80% 20%)', 'hsl(170 80% 30%)', 'hsl(170 80% 40%)', 'hsl(170 80% 50%)', 'hsl(170 80% 60%)', 'hsl(170 80% 70%)', 'hsl(170 80% 80%)', 'hsl(170 80% 90%)'],
    blue: ['hsl(210 80% 10%)', 'hsl(210 80% 20%)', 'hsl(210 80% 30%)', 'hsl(210 80% 40%)', 'hsl(210 80% 50%)', 'hsl(210 80% 60%)', 'hsl(210 80% 70%)', 'hsl(210 80% 80%)', 'hsl(210 80% 90%)'],
    purple: ['hsl(270 80% 10%)', 'hsl(270 80% 20%)', 'hsl(270 80% 30%)', 'hsl(270 80% 40%)', 'hsl(270 80% 50%)', 'hsl(270 80% 60%)', 'hsl(270 80% 70%)', 'hsl(270 80% 80%)', 'hsl(270 80% 90%)'],
  },
  oklch: {
    gray: ['oklch(0.21 0.01 210)', 'oklch(0.32 0.01 210)', 'oklch(0.42 0.01 210)', 'oklch(0.51 0.01 210)', 'oklch(0.59 0.01 210)', 'oklch(0.68 0.01 210)', 'oklch(0.76 0.01 210)', 'oklch(0.84 0.01 210)', 'oklch(0.92 0.01 210)'],
    pink: ['oklch(0.21 0.07 351.87)', 'oklch(0.32 0.12 355.24)', 'oklch(0.42 0.16 356.42)', 'oklch(0.51 0.2 357.14)', 'oklch(0.61 0.24 357.61)', 'oklch(0.65 0.21 354.56)', 'oklch(0.72 0.16 349.38)', 'oklch(0.81 0.11 349.7)', 'oklch(0.9 0.05 348.69)'],
    orange: ['oklch(0.24 0.04 63.43)', 'oklch(0.37 0.08 60.26)', 'oklch(0.48 0.11 56.31)', 'oklch(0.59 0.13 57.53)', 'oklch(0.7 0.17 57.26)', 'oklch(0.75 0.13 63.43)', 'oklch(0.81 0.11 68.2)', 'oklch(0.87 0.08 66.8)', 'oklch(0.93 0.03 71.57)'],
    green: ['oklch(0.26 0.08 140.19)', 'oklch(0.41 0.14 143.97)', 'oklch(0.55 0.18 141.84)', 'oklch(0.68 0.23 142.13)', 'oklch(0.8 0.26 142.7)', 'oklch(0.82 0.24 141.71)', 'oklch(0.86 0.2 143.13)', 'oklch(0.9 0.14 143.97)', 'oklch(0.95 0.07 146.31)'],
    teal: ['oklch(0.27 0.05 180)', 'oklch(0.43 0.08 180)', 'oklch(0.57 0.1 174.29)', 'oklch(0.7 0.13 175.6)', 'oklch(0.83 0.15 176.19)', 'oklch(0.85 0.14 180)', 'oklch(0.88 0.11 180)', 'oklch(0.91 0.08 180)', 'oklch(0.95 0.04 180)'],
    blue: ['oklch(0.21 0.05 248.2)', 'oklch(0.32 0.09 249.44)', 'oklch(0.42 0.11 254.74)', 'oklch(0.51 0.15 254.05)', 'oklch(0.6 0.18 253.61)', 'oklch(0.67 0.15 250.35)', 'oklch(0.75 0.11 248.2)', 'oklch(0.83 0.08 246.8)', 'oklch(0.91 0.03 251.57)'],
    purple: ['oklch(0.18 0.08 299.74)', 'oklch(0.27 0.13 302.47)', 'oklch(0.36 0.18 299.36)', 'oklch(0.44 0.22 296.57)', 'oklch(0.51 0.26 297.55)', 'oklch(0.59 0.24 303.02)', 'oklch(0.68 0.18 303.69)', 'oklch(0.78 0.12 304.99)', 'oklch(0.89 0.06 308.66)'],
  },
}


/**
 * PostCSS plugin: PostCSS Enumerates in Line
 * @param {EnumsEnumeratesInLineOptions|object} options - Output options.
 * @param {boolean|string} options.prependDefaultColor - Enable to print default CSS colors which explains like a `--enums-color-red-900: #f00;`.
 * @param {boolean|string[]} options.prependDefaultStyle - Enable to print default CSS styles.
 * @description This plugin extend to multiple CSSes from shrinked it which described in 1 line like `@apply` syntax of TailwindCSS.
 */
export const enumSpreader = (options = {}) => {
  let {
    prependDefaultColor,
    prependDefaultStyle,
  } = {...defaultOptions, ...options}

  if(prependDefaultColor === false) {
    prependDefaultColor = false
  } else if(prependDefaultColor.toString().toLowerCase() === 'oklch') {
    prependDefaultColor = 'oklch'
  } else if(prependDefaultColor.toString().toLowerCase() === 'rgb') {
    prependDefaultColor = 'rgb'
  } else {
    prependDefaultColor = 'hsl'
  }

  if(prependDefaultStyle === true) {
    prependDefaultStyle = []
  } else if((typeof prependDefaultStyle !== 'object') || (!prependDefaultStyle[0])) {
    prependDefaultStyle = false
  }

  return {
    postcssPlugin: pluginName,
    Once: root => {
      root.walkRules(rule => {
        rule.nodes.forEach(node => {
          if((node.type === 'atrule') && (node.name === 'enums')) {
            let param = node.params.replace(/[\s\t\r\n]+/g, ' ').split(' ')
            param.reverse()
            for(let i = 0, l = param.length; i < l; i ++) {
              let regex = param[i].match(/^([\d\-a-z]+):([^!\s]+)(!)?$/)
              if(regex) {
                const important = (!!regex[3]) ? ' !important' : ''

                const value = regex[2]
                .replace(/\^/g, ' ')
                .replace(/\[\[([^}]+)\]\]/g,(_,expr)=>`[[${expr.replace(/([+\*/]|(?<=[0-9a-zA-Z\)])[-%](?=[0-9a-zA-Z\(]))/g,' $1 ')}]]`)
                .replace('[[', '(')
                .replace(']]', ')')
                .replace(/ +/g, ' ')

                for(let prop = expandShortcut(regex[1]), j = 0, m = prop.length; j < m; j ++) {
                  node.after(`${prop[j]}: ${value}${important};`)
                }
              }
            }
            node.remove()
          }
        })
      })

      if(!!prependDefaultStyle) {
        for(let i = 0, l = prependDefaultStyle.length; i < l; i ++) {
          root.prepend(postcss.parse(prependDefaultStyle[i]))
        }

        for(let i = 0, l = defaultStyle.length; i < l; i ++) {
          root.prepend(postcss.parse(defaultStyle[i]))
        }
      }

      if(!!prependDefaultColor) {
        const scheme = defaultColorDefines[prependDefaultColor]
        let colorText = []
        for(let i = 0, l = defaultColorNames.length; i < l; i ++) {
          for(let j = 0, m = scheme[defaultColorNames[i]].length; j < m; j ++) {
            colorText.push(`--enums-color-${defaultColorNames[i]}-${(j+1)*100}: ${scheme[defaultColorNames[i]][j]};`)
          }
        }
        root.prepend(postcss.parse(`:root { ${colorText.join('')} }`))
      }
    }
  }
}


/**
 * Expand shortcut property name.
 * @param {String} prop - Specified property name.
 * @return {Array<String>} - Regular property name that defined in CSS.
 * @return {Array<String>} - If this function retrieved undefined shortcut property in this plugin, returns just it.
 */
const expandShortcut = prop => {
  switch(prop) {
    // margin
    case 'm': return ['margin'];
    case 'm8': return ['margin-top'];
    case 'm6': return ['margin-right'];
    case 'm2': return ['margin-bottom'];
    case 'm4': return ['margin-left'];
    case 'mx': return ['margin-left', 'margin-right'];
    case 'my': return ['margin-top', 'margin-bottom'];

    // padding
    case 'p': return ['padding'];
    case 'p8': return ['padding-top'];
    case 'p6': return ['padding-right'];
    case 'p2': return ['padding-bottom'];
    case 'p4': return ['padding-left'];
    case 'px': return ['padding-left', 'padding-right'];
    case 'py': return ['padding-top', 'padding-bottom'];

    // outline
    case 'o': return ['outline'];
    case 'o8': return ['outline-top'];
    case 'o6': return ['outline-right'];
    case 'o2': return ['outline-bottom'];
    case 'o4': return ['outline-left'];
    case 'ox': return ['outline-left', 'outline-right'];
    case 'oy': return ['outline-top', 'outline-bottom'];

    // border-width
    case 'bw': return ['border-width'];
    case 'bw8': return ['border-top-width'];
    case 'bw6': return ['border-right-width'];
    case 'bw2': return ['border-bottom-width'];
    case 'bw4': return ['border-left-width'];
    case 'bwx': return ['border-left-width', 'border-right-width'];
    case 'bwy': return ['border-top-width', 'border-bottom-width'];

    // border-style
    case 'bs': return ['border-style'];
    case 'bs8': return ['border-top-style'];
    case 'bs6': return ['border-right-style'];
    case 'bs2': return ['border-bottom-style'];
    case 'bs4': return ['border-left-style'];
    case 'bsx': return ['border-left-style', 'border-right-style'];
    case 'bsy': return ['border-top-style', 'border-bottom-style'];

    // border-color
    case 'bc': return ['border-color'];
    case 'bc8': return ['border-top-color'];
    case 'bc6': return ['border-right-color'];
    case 'bc2': return ['border-bottom-color'];
    case 'bc4': return ['border-left-color'];
    case 'bcx': return ['border-left-color', 'border-right-color'];
    case 'bcy': return ['border-top-color', 'border-bottom-color'];

    // border-radius
    case 'br': return ['border-radius'];
    case 'br7': return ['border-top-left-radius'];
    case 'br9': return ['border-top-right-radius'];
    case 'br3': return ['border-bottom-right-radius'];
    case 'br1': return ['border-bottom-left-radius'];

    // color
    case 'ct': return ['color'];
    case 'cb': return ['background-color'];

    // inset
    case 'i': return ['inset'];
    case 'i8': return ['top'];
    case 'i6': return ['right'];
    case 'i2': return ['bottom'];
    case 'i4': return ['left'];

    // sizing
    case 'w': return ['width'];
    case 'wmin': return ['min-width'];
    case 'wmax': return ['max-width'];
    case 'h': return ['height'];
    case 'hmin': return ['min-height'];
    case 'hmax': return ['max-height'];

    // grid position
    case 'gx': return ['grid-column'];
    case 'g4': return ['grid-column-start'];
    case 'g6': return ['grid-column-end'];
    case 'gy': return ['grid-row'];
    case 'g8': return ['grid-row-start'];
    case 'g2': return ['grid-row-end'];

    // font
    case 'ff': return ['font-family'];
    case 'fs': return ['font-size'];
    case 'fw': return ['font-weight'];
    case 'fh': return ['line-height'];

    // default
    default: return [].concat(prop);
  }
}
