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
  prependDefaultColor: false,
  prependDefaultStyle: true,
  appendUserColor: [],
  appendShorthand: [],
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

let defaultColorNames = ['black', 'white', 'base', 'red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple', 'magenta']
let defaultColorDefines = {
  rgb: {
    black:   [[0, '#100F0F'], [999, '#000000']],
    white:   [[0, '#FFFCF0'], [999, '#FFFFFF']],
    base:    [[50, '#F2F0E5'], [100, '#E6E4D9'], [150, '#DAD8CE'], [200, '#CECDC3'], [300, '#B7B5AC'], [400, '#9F9D96'], [500, '#878580'], [600, '#6F6E69'], [700, '#575653'], [800, '#403E3C'], [850, '#343331'], [900, '#282726'], [950, '#1C1B1A']],
    red:     [[50, '#FFE1D5'], [100, '#FFCABB'], [150, '#FDB2A2'], [200, '#F89A8A'], [300, '#E8705F'], [400, '#D14D41'], [500, '#C03E35'], [600, '#AF3029'], [700, '#942822'], [800, '#6C201C'], [850, '#551B18'], [900, '#3E1715'], [950, '#261312']],
    orange:  [[50, '#FFE7CE'], [100, '#FED3AF'], [150, '#FCC192'], [200, '#F9AE77'], [300, '#EC8B49'], [400, '#DA702C'], [500, '#CB6120'], [600, '#BC5215'], [700, '#9D4310'], [800, '#71320D'], [850, '#59290D'], [900, '#40200D'], [950, '#27180E']],
    yellow:  [[50, '#FAEEC6'], [100, '#F6E2A0'], [150, '#F1D67E'], [200, '#ECCB60'], [300, '#DFB431'], [400, '#D0A215'], [500, '#BE9207'], [600, '#AD8301'], [700, '#8E6B01'], [800, '#664D01'], [850, '#503D02'], [900, '#3A2D04'], [950, '#241E08']],
    green:   [[50, '#EDEECF'], [100, '#DDE2B2'], [150, '#CDD597'], [200, '#BEC97E'], [300, '#A0AF54'], [400, '#879A39'], [500, '#768D21'], [600, '#66800B'], [700, '#536907'], [800, '#3D4C07'], [850, '#313D07'], [900, '#252D09'], [950, '#1A1E0C']],
    cyan:    [[50, '#DDF1E4'], [100, '#BFE8D9'], [150, '#A2DECE'], [200, '#87D3C3'], [300, '#5ABDAC'], [400, '#3AA99F'], [500, '#2F968D'], [600, '#24837B'], [700, '#1C6C66'], [800, '#164F4A'], [850, '#143F3C'], [900, '#122F2C'], [950, '#101F1D']],
    blue:    [[50, '#E1ECEB'], [100, '#C6DDE8'], [150, '#ABCFE2'], [200, '#92BFDB'], [300, '#66A0C8'], [400, '#4385BE'], [500, '#3171B2'], [600, '#205EA6'], [700, '#1A4F8C'], [800, '#163B66'], [850, '#133051'], [900, '#12253B'], [950, '#101A24']],
    purple:  [[50, '#F0EAEC'], [100, '#E2D9E9'], [150, '#D3CAE6'], [200, '#C4B9E0'], [300, '#A699D0'], [400, '#8B7EC8'], [500, '#735EB5'], [600, '#5E409D'], [700, '#4F3685'], [800, '#3C2A62'], [850, '#31234E'], [900, '#261C39'], [950, '#1A1623']],
    magenta: [[50, '#FEE4E5'], [100, '#FCCFDA'], [150, '#F9B9CF'], [200, '#F4A4C2'], [300, '#E47DA8'], [400, '#CE5D97'], [500, '#B74583'], [600, '#A02F6F'], [700, '#87285E'], [800, '#641F46'], [850, '#4F1B39'], [900, '#39172B'], [950, '#24131D']],
  },
  hsl: {
    black:   [[0, 'hsl(0 3.2% 6.1%)'], [999, 'hsl(0 0% 0%)']],
    white:   [[0, 'hsl(48 100% 97.1%)'], [999, 'hsl(0 0% 100%)']],
    base:    [[50, 'hsl(50.8 33.3% 92.4%)'], [100, 'hsl(50.8 20.6% 87.6%)'], [150, 'hsl(50 14% 83.1%)'], [200, 'hsl(54.5 10.1% 78.6%)'], [300, 'hsl(49.1 7.1% 69.6%)'], [400, 'hsl(46.7 4.5% 60.6%)'], [500, 'hsl(42.9 2.8% 51.6%)'], [600, 'hsl(50 2.8% 42.4%)'], [700, 'hsl(45 2.4% 33.3%)'], [800, 'hsl(30 3.2% 24.3%)'], [850, 'hsl(40 3% 19.8%)'], [900, 'hsl(30 2.6% 15.3%)'], [950, 'hsl(30 3.7% 10.6%)']],
    red:     [[50, 'hsl(17.1 100% 91.8%)'], [100, 'hsl(13.2 100% 86.7%)'], [150, 'hsl(10.5 95.8% 81.4%)'], [200, 'hsl(8.7 88.7% 75.7%)'], [300, 'hsl(7.4 74.9% 64.1%)'], [400, 'hsl(5 61% 53.7%)'], [500, 'hsl(3.9 56.7% 48%)'], [600, 'hsl(3.1 62% 42.4%)'], [700, 'hsl(3.2 62.6% 35.7%)'], [800, 'hsl(3 58.8% 26.7%)'], [850, 'hsl(3 56% 21.4%)'], [900, 'hsl(2.9,49.4%,16.3%)'], [950, 'hsl(3 35.7% 11%)']],
    orange:  [[50, 'hsl(30.6,100%,90.4%)'], [100, 'hsl(27.3 97.5% 84.1%)'], [150, 'hsl(26.6 94.6% 78%)'], [200, 'hsl(25.4 91.5% 72.2%)'], [300, 'hsl(24.3 81.1% 60.6%)'], [400, 'hsl(23.4 70.2% 51.4%)'], [500, 'hsl(22.8 72.8% 46.1%)'], [600, 'hsl(21.9 79.9% 41%)'], [700, 'hsl(21.7 81.5% 33.9%)'], [800, 'hsl(22.2 79.4% 24.7%)'], [850, 'hsl(22.1 74.5% 20%)'], [900, 'hsl(22.4 66.2% 15.1%)'], [950, 'hsl(24 47.2% 10.4%)']],
    yellow:  [[50, 'hsl(46.2 83.9% 87.8%)'], [100, 'hsl(46 82.7% 79.6%)'], [150, 'hsl(45.9 80.4% 72%)'], [200, 'hsl(45.9 78.7% 65.1%)'], [300, 'hsl(45.2 73.1% 53.3%)'], [400, 'hsl(45.2 81.7% 44.9%)'], [500, 'hsl(45.6 92.9% 38.6%)'], [600, 'hsl(45.3 98.9% 34.1%)'], [700, 'hsl(45.1 98.6% 28%)'], [800, 'hsl(45.1,98.1%,20.2%)'], [850, 'hsl(45.4 95.1% 16.1%)'], [900, 'hsl(45.6 87.1% 12.2%)'], [950, 'hsl(47.1 63.6% 8.6%)']],
    green:   [[50, 'hsl(61.9 47.7% 87.3%)'], [100, 'hsl(66.3 45.3% 79.2%)'], [150, 'hsl(67.7 42.5% 71.4%)'], [200, 'hsl(68.8 41% 64.1%)'], [300, 'hsl(69.9 36.3% 50.8%)'], [400, 'hsl(71.8 46% 41.4%)'], [500, 'hsl(72.8 62.1% 34.1%)'], [600, 'hsl(73.3 84.2% 27.3%)'], [700, 'hsl(73.5 87.5% 22%)'], [800, 'hsl(73 83.1% 16.3%)'], [850, 'hsl(73.3 79.4% 13.3%)'], [900, 'hsl(73.3 66.7% 10.6%)'], [950, 'hsl(73.3 42.9% 8.2%)']],
    cyan:    [[50, 'hsl(141 41.7% 90.6%)'], [100, 'hsl(158 47.1% 82.9%)'], [150, 'hsl(164 47.6% 75.3%)'], [200, 'hsl(167.4 46.3% 67.8%)'], [300, 'hsl(169.7 42.9% 54.7%)'], [400, 'hsl(174.6 48.9% 44.5%)'], [500, 'hsl(174.8 52.3% 38.6%)'], [600, 'hsl(174.9 56.9% 32.7%)'], [700, 'hsl(175.5 58.8% 26.7%)'], [800, 'hsl(174.7 56.4% 19.8%)'], [850, 'hsl(175.8 51.8% 16.3%)'], [900, 'hsl(173.8 44.6% 12.7%)'], [950, 'hsl(172 31.9% 9.2%)']],
    blue:    [[50, 'hsl(174.5 22.4% 90.4%)'], [100, 'hsl(199.4 42.5% 84.3%)'], [150, 'hsl(200.7 48.7% 77.8%)'], [200, 'hsl(203 50.3% 71.6%)'], [300, 'hsl(204.5 47.1% 59.2%)'], [400, 'hsl(207.8 48.6% 50.4%)'], [500, 'hsl(210.2 56.8% 44.5%)'], [600, 'hsl(212.2 67.7% 38.8%)'], [700, 'hsl(212.1 68.7% 32.5%)'], [800, 'hsl(212.3 64.5% 24.3%)'], [850, 'hsl(211.9 62% 19.6%)'], [900, 'hsl(212.2 53.2% 15.1%)'], [950, 'hsl(210 38.5% 10.2%)']],
    purple:  [[50, 'hsl(340 16.7% 92.9%)'], [100, 'hsl(273.8 26.7% 88.2%)'], [150, 'hsl(259.3 35.9% 84.7%)'], [200, 'hsl(256.9 38.6% 80.2%)'], [300, 'hsl(254.2 36.9% 70.8%)'], [400, 'hsl(250.5 40.2% 63.9%)'], [500, 'hsl(254.5 37% 53.9%)'], [600, 'hsl(259.4 42.1% 43.3%)'], [700, 'hsl(259 42.2% 36.7%)'], [800, 'hsl(259.3 40% 27.5%)'], [850, 'hsl(259.5 38.1% 22.2%)'], [900, 'hsl(260.7 34.1% 16.7%)'], [950, 'hsl(258.5 22.8% 11.2%)']],
    magenta: [[50, 'hsl(357.7 92.9% 94.5%)'], [100, 'hsl(345.3 88.2% 90%)'], [150, 'hsl(339.4 84.2% 85.1%)'], [200, 'hsl(337.5 78.4% 80%)'], [300, 'hsl(335 65.6% 69.2%)'], [400, 'hsl(329.2 53.6% 58.6%)'], [500, 'hsl(327.4 45.2% 49.4%)'], [600, 'hsl(326 54.6% 40.6%)'], [700, 'hsl(325.9 54.3% 34.3%)'], [800, 'hsl(326.1 52.7% 25.7%)'], [850, 'hsl(325.4 49.1% 20.8%)'], [900, 'hsl(324.7 42.5% 15.7%)'], [950, 'hsl(324.7 30.9% 10.8%)']],
  },
  oklch: {
    black:   [[0, 'oklch(0.1696 0.0017 17.32)'], [999, 'oklch(0 0 0)']],
    white:   [[0, 'oklch(0.9901 0.0161 95.22)'], [999, 'oklch(1 0 0)']],
    base:    [[50, 'oklch(0.9537 0.0147 98.29)'], [100, 'oklch(0.9174 0.0149 98.3)'], [150, 'oklch(0.881 0.0137 97.46)'], [200, 'oklch(0.8463 0.0137 102.05)'], [300, 'oklch(0.7721 0.0128 96.47)'], [400, 'oklch(0.6956 0.0103 93.62)'], [500, 'oklch(0.6169 0.0078 88.67)'], [600, 'oklch(0.5375 0.0078 97.45)'], [700, 'oklch(0.4531 0.005 91.5)'], [800, 'oklch(0.3651 0.0044 67.69)'], [850, 'oklch(0.3214 0.0038 84.58)'], [900, 'oklch(0.2734 0.0023 67.73)'], [950, 'oklch(0.2228 0.0025 67.7)']],
    red:     [[50, 'oklch(0.9312 0.037 43.08)'], [100, 'oklch(0.8817 0.0641 36.36)'], [150, 'oklch(0.8306 0.0912 32.45)'], [200, 'oklch(0.7784 0.116 30.33)'], [300, 'oklch(0.6834 0.1523 29.79)'], [400, 'oklch(0.597 0.1692 28.38)'], [500, 'oklch(0.55 0.1678 27.88)'], [600, 'oklch(0.5042 0.1648 27.84)'], [700, 'oklch(0.4468 0.1448 27.78)'], [800, 'oklch(0.3633 0.1089 26.95)'], [850, 'oklch(0.3132 0.087 26.31)'], [900, 'oklch(0.2639 0.0618 25.14)'], [950, 'oklch(0.2133 0.0318 23.31)']],
    orange:  [[50, 'oklch(0.9409 0.0422 68.42)'], [100, 'oklch(0.8949 0.0678 61.72)'], [150, 'oklch(0.8534 0.0915 59.68)'], [200, 'oklch(0.8109 0.1131 56.61)'], [300, 'oklch(0.7282 0.143 52.66)'], [400, 'oklch(0.6576 0.1539 49.3)'], [500, 'oklch(0.6121 0.1533 47.37)'], [600, 'oklch(0.5665 0.1523 45.02)'], [700, 'oklch(0.4954 0.1334 44.79)'], [800, 'oklch(0.3971 0.1006 46.5)'], [850, 'oklch(0.3419 0.0807 47.52)'], [900, 'oklch(0.2832 0.0577 49.41)'], [950, 'oklch(0.2257 0.0302 54.27)']],
    yellow:  [[50, 'oklch(0.9486 0.0535 93.29)'], [100, 'oklch(0.9139 0.0866 93.23)'], [150, 'oklch(0.8801 0.1122 92.85)'], [200, 'oklch(0.8498 0.131 92.28)'], [300, 'oklch(0.7872 0.147 89.37)'], [400, 'oklch(0.7346 0.1462 87.46)'], [500, 'oklch(0.6828 0.1383 86.78)'], [600, 'oklch(0.6333 0.1295 85.81)'], [700, 'oklch(0.548 0.1119 85.82)'], [800, 'oklch(0.4347 0.0884 86.92)'], [850, 'oklch(0.3705 0.0744 88.38)'], [900, 'oklch(0.3036 0.0583 90.15)'], [950, 'oklch(0.2362 0.0369 94.23)']],
    green:   [[50, 'oklch(0.9403 0.0408 108.67)'], [100, 'oklch(0.8969 0.0633 112.51)'], [150, 'oklch(0.8519 0.0818 114.14)'], [200, 'oklch(0.81 0.0985 115.45)'], [300, 'oklch(0.7227 0.1178 117.2)'], [400, 'oklch(0.6513 0.1242 119.38)'], [500, 'oklch(0.6049 0.1321 121.21)'], [600, 'oklch(0.5593 0.1335 122.92)'], [700, 'oklch(0.4854 0.1161 123.03)'], [800, 'oklch(0.3898 0.09 122.07)'], [850, 'oklch(0.3376 0.0757 121.85)'], [900, 'oklch(0.2806 0.0564 120.9)'], [950, 'oklch(0.2253 0.0324 119.34)']],
    cyan:    [[50, 'oklch(0.9398 0.0273 157.36)'], [100, 'oklch(0.8977 0.0473 171)'], [150, 'oklch(0.8552 0.0652 176.36)'], [200, 'oklch(0.8127 0.0791 179.39)'], [300, 'oklch(0.734 0.0968 180.73)'], [400, 'oklch(0.6701 0.0999 186.58)'], [500, 'oklch(0.6129 0.0932 186.66)'], [600, 'oklch(0.5544 0.0863 186.74)'], [700, 'oklch(0.4831 0.075 187.62)'], [800, 'oklch(0.3898 0.0584 186.75)'], [850, 'oklch(0.3371 0.0472 188.78)'], [900, 'oklch(0.2818 0.0354 186.45)'], [950, 'oklch(0.225 0.021 185.21)']],
    blue:    [[50, 'oklch(0.9345 0.0118 190.43)'], [100, 'oklch(0.8839 0.0289 228.09)'], [150, 'oklch(0.8346 0.0466 231.04)'], [200, 'oklch(0.7823 0.0622 235.93)'], [300, 'oklch(0.6815 0.0849 239.8)'], [400, 'oklch(0.5988 0.1104 247)'], [500, 'oklch(0.539 0.1212 251.4)'], [600, 'oklch(0.4818 0.1315 254.79)'], [700, 'oklch(0.4269 0.1152 254.58)'], [800, 'oklch(0.3499 0.0862 254.23)'], [850, 'oklch(0.3056 0.0693 253.5)'], [900, 'oklch(0.2604 0.0486 253.24)'], [950, 'oklch(0.2132 0.0247 249.05)']],
    purple:  [[50, 'oklch(0.9423 0.007 354.8)'], [100, 'oklch(0.8972 0.0236 310.69)'], [150, 'oklch(0.8549 0.0395 300.22)'], [200, 'oklch(0.8075 0.0555 298.05)'], [300, 'oklch(0.7139 0.0802 295.14)'], [400, 'oklch(0.6348 0.1098 291)'], [500, 'oklch(0.5428 0.1326 292.54)'], [600, 'oklch(0.454 0.1451 294.83)'], [700, 'oklch(0.4041 0.1271 294.63)'], [800, 'oklch(0.3364 0.0955 295.65)'], [850, 'oklch(0.296 0.0764 296.46)'], [900, 'oklch(0.2538 0.0544 298.34)'], [950, 'oklch(0.2113 0.0259 298.28)']],
    magenta: [[50, 'oklch(0.9402 0.0286 15.01)'], [100, 'oklch(0.8962 0.0525 1.83)'], [150, 'oklch(0.8505 0.0787 356.49)'], [200, 'oklch(0.8051 0.1012 355.47)'], [300, 'oklch(0.7155 0.1356 354.63)'], [400, 'oklch(0.6348 0.1565 350.47)'], [500, 'oklch(0.5637 0.1612 349.8)'], [600, 'oklch(0.4954 0.1614 349.76)'], [700, 'oklch(0.4399 0.1407 349.42)'], [800, 'oklch(0.3601 0.1089 349.03)'], [850, 'oklch(0.313 0.087 347.6)'], [900, 'oklch(0.2629 0.0611 345.81)'], [950, 'oklch(0.2145 0.0328 344.07)']],
  },
}

let defaultShorthands = [
  'm', 'm8', 'm6', 'm2', 'm4', 'mx', 'my',
  'p', 'p8', 'p6', 'p2', 'p4', 'px', 'py',
  'o', 'o8', 'o6', 'o2', 'o4', 'ox', 'oy',
  'bw', 'bw8', 'bw6', 'bw2', 'bw4', 'bwx', 'bwy',
  'bs', 'bs8', 'bs6', 'bs2', 'bs4', 'bsx', 'bsy',
  'bc', 'bc8', 'bc6', 'bc2', 'bc4', 'bcx', 'bcy',
  'br', 'br7', 'br9', 'br3', 'br1',
  'ct', 'cb',
  'i', 'i8', 'i6', 'i2', 'i4',
  'w', 'wmin', 'wmax', 'h', 'hmin', 'hmax',
  'gx', 'g4', 'g6', 'gy', 'g8', 'g2',
  'ff', 'fs', 'fw', 'fh',
]
let appendShorthandsIndex = []
let appendShorthandsData = {}


/**
 * PostCSS plugin: PostCSS Enumerates in Line
 * @param {EnumsEnumeratesInLineOptions|object} options - Output options.
 * @param {boolean|string} options.prependDefaultColor - Enable to print default CSS colors which explains like a `--color-black-999: #000000;`.
 * @param {boolean|string[]} options.prependDefaultStyle - Enable to print default CSS styles.
 * @param {UserColor[]} options.appendUserColor - Append user color settings to default color.
 * @description This plugin extend to multiple CSSes from shrinked it which described in 1 line like `@apply` syntax of TailwindCSS.
 */
export const enumSpreader = (options = {}) => {
  let {
    prependDefaultColor,
    prependDefaultStyle,
    appendUserColor,
    appendShorthand,
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

  appendUserColors(appendUserColor)
  appendUserShorthands(appendShorthand)

  return {
    postcssPlugin: pluginName,
    Once: root => {
      root.walkRules(rule => {
        rule.nodes.forEach(node => {
          if((node.type === 'atrule') && (node.name === 'enums')) {
            let param = node.params.replace(/[\s\t\r\n]+/g, ' ').split(' ')
            for(let i = 0, l = param.length; i < l; i ++) {
              let setting = {
                isHover: false,
                isDark: false,
                isMq: '',
                isData: '',
                isAria: '',
                isAttr: '',
                important: '',
                prop: '',
                value: '',
              }

              if(/hover!/.test(param[i])) {
                setting.isHover = true
                param[i] = param[i].replace(/hover!/g, '')
              }

              if(/dark!/.test(param[i])) {
                setting.isDark = true
                param[i] = param[i].replace(/dark!/g, '')
              }

              if(/mq\(.+?\)!/.test(param[i])) {
                setting.isMq = []
                ;(!!param[i].match(/mq\((.+?)\)!/)[1] ? param[i].match(/mq\((.+?)\)!/)[1] : '').split(',').forEach(q => {
                  let kv = q.split(':')
                  if(kv.length === 2) {
                    switch(kv[0]) {
                      case 'aspect-ratio':
                        if(/^[\d\.]+$/.test(kv[1])) {
                          let match = kv[1].match(/^([\d\.]+)$/)
                          if(!!match[1]) {
                            setting.isMq.push(`(aspect-ratio: ${match[1]})`)
                          }
                        } else if(/^\-[\d\.]+$/.test(kv[1])) {
                          let match = kv[1].match(/^\-([\d\.]+)$/)
                          if(!!match[1]) {
                            setting.isMq.push(`(max-aspect-ratio: ${match[1]})`)
                          }
                        } else if(/^[\d\.]+\-$/.test(kv[1])) {
                          let match = kv[1].match(/^([\d\.]+)\-$/)
                          if(!!match[1]) {
                            setting.isMq.push(`(min-aspect-ratio: ${match[1]})`)
                          }
                        } else if(/^[\d\.]+\-[\d\.]+$/.test(kv[1])) {
                          let match = kv[1].match(/^([\d\.]+)\-([\d\.]+)$/)
                          if(!!match[1] && !!match[2]) {
                            setting.isMq.push(`(min-aspect-ratio: ${match[1]}) and (max-aspect-ratio: ${match[2]})`)
                          }
                        }
                        break;
                      case 'height':
                        if(/^[\d\.a-zA-Z]+$/.test(kv[1])) {
                          let match = kv[1].match(/^([\d\.a-zA-Z]+)$/)
                          if(!!match[1]) {
                            setting.isMq.push(`(height: ${match[1]})`)
                          }
                        } else if(/^\-[\d\.a-zA-Z]+$/.test(kv[1])) {
                          let match = kv[1].match(/^\-([\d\.a-zA-Z]+)$/)
                          if(!!match[1]) {
                            setting.isMq.push(`(max-height: ${match[1]})`)
                          }
                        } else if(/^[\d\.a-zA-Z]+\-$/.test(kv[1])) {
                          let match = kv[1].match(/^([\d\.a-zA-Z]+)\-$/)
                          if(!!match[1]) {
                            setting.isMq.push(`(min-height: ${match[1]})`)
                          }
                        } else if(/^[\d\.a-zA-Z]+\-[\d\.a-zA-Z]+$/.test(kv[1])) {
                          let match = kv[1].match(/^([\d\.a-zA-Z]+)\-([\d\.a-zA-Z]+)$/)
                          if(!!match[1] && !!match[2]) {
                            setting.isMq.push(`(min-height: ${match[1]}) and (max-height: ${match[2]})`)
                          }
                        }
                        break;
                      case 'orientation':
                        if(/^portrait$/.test(kv[1])) {
                          setting.isMq.push(`(orientation: portrait)`)
                        } else if(/^landscape$/.test(kv[1])) {
                          setting.isMq.push(`(orientation: landscape)`)
                        }
                        break;
                      case 'width':
                        if(/^[\d\.a-zA-Z]+$/.test(kv[1])) {
                          let match = kv[1].match(/^([\d\.a-zA-Z]+)$/)
                          if(!!match[1]) {
                            setting.isMq.push(`(width: ${match[1]})`)
                          }
                        } else if(/^\-[\d\.a-zA-Z]+$/.test(kv[1])) {
                          let match = kv[1].match(/^\-([\d\.a-zA-Z]+)$/)
                          if(!!match[1]) {
                            setting.isMq.push(`(max-width: ${match[1]})`)
                          }
                        } else if(/^[\d\.a-zA-Z]+\-$/.test(kv[1])) {
                          let match = kv[1].match(/^([\d\.a-zA-Z]+)\-$/)
                          if(!!match[1]) {
                            setting.isMq.push(`(min-width: ${match[1]})`)
                          }
                        } else if(/^[\d\.a-zA-Z]+\-[\d\.a-zA-Z]+$/.test(kv[1])) {
                          let match = kv[1].match(/^([\d\.a-zA-Z]+)\-([\d\.a-zA-Z]+)$/)
                          if(!!match[1] && !!match[2]) {
                            setting.isMq.push(`(min-width: ${match[1]}) and (max-width: ${match[2]})`)
                          }
                        }
                        break;
                      default:
                        break;
                    }
                  }
                })
                setting.isMq = setting.isMq.join(' and ')
                param[i] = param[i].replace(/mq\(.+?\)!/g, '')
              }

              if(/data\(.+?\)!/.test(param[i])) {
                setting.isData = []
                ;(!!param[i].match(/data\((.+?)\)!/)[1] ? param[i].match(/data\((.+?)\)!/)[1] : '').split(',').forEach(q => {
                  let v1 = q.match(/^([A-Za-z\d_](?:[A-Za-z\d_\-]*[A-Za-z\d_])?)([\~\|\^\$\*]?=)(?:(?=["])["](.*)["]|(?=['])['](.*)['])$/)
                  if(!!v1) {
                    setting.isData.push(`[data-${v1[1]}${v1[2]}"${(v1[3]||v1[4]).replace('\%','%25').replace('\"','%22').replace('\'','%27').replace('\`','%60').replace('\\','%5D')}"]`)
                  } else {
                    let v2 = q.match(/^([A-Za-z\d_](?:[A-Za-z\d_\-]*[A-Za-z\d_])?)$/)
                    if(!!v2) {
                      setting.isData.push(`[data-${v2[1]}]`)
                    }
                  }
                })
                setting.isData = setting.isData.join('')
                param[i] = param[i].replace(/data\(.+?\)!/g, '')
              }

              if(/aria\(.+?\)!/.test(param[i])) {
                setting.isAria = []
                ;(!!param[i].match(/aria\((.+?)\)!/)[1] ? param[i].match(/aria\((.+?)\)!/)[1] : '').split(',').forEach(q => {
                  let v = q.match(/^([a-z]+)=(?:(?=["])["](.*)["]|(?=['])['](.*)['])$/)
                  if(!!v) {
                    setting.isAria.push(`[aria-${v[1]}="${(v[2]||v[3]).replace('\%','%25').replace('\"','%22').replace('\'','%27').replace('\`','%60').replace('\\','%5D')}"]`)
                  }
                })
                setting.isAria = setting.isAria.join('')
                param[i] = param[i].replace(/aria\(.+?\)!/g, '')
              }

              if(/attr\(.+?\)!/.test(param[i])) {
                setting.isAttr = []
                ;(!!param[i].match(/attr\((.+?)\)!/)[1] ? param[i].match(/attr\((.+?)\)!/)[1] : '').split(',').forEach(q => {
                  let v1 = q.match(/^([A-Za-z\d_](?:[A-Za-z\d_\-]*[A-Za-z\d_])?)([\~\|\^\$\*]?=)(?:(?=["])["](.*)["]|(?=['])['](.*)['])$/)
                  if(!!v1) {
                    setting.isAttr.push(`[${v1[1]}${v1[2]}"${(v1[3]||v1[4]).replace('\%','%25').replace('\"','%22').replace('\'','%27').replace('\`','%60').replace('\\','%5D')}"]`)
                  } else {
                    let v2 = q.match(/^([A-Za-z\d_](?:[A-Za-z\d_\-]*[A-Za-z\d_])?)$/)
                    if(!!v2) {
                      setting.isAttr.push(`[${v2[1]}]`)
                    }
                  }
                })
                setting.isAttr = setting.isAttr.join('')
                param[i] = param[i].replace(/attr\(.+?\)!/g, '')
              }

              if(setting.isHover || setting.isDark || (setting.isMq !== '') || (setting.isData !== '') || (setting.isAria !== '') || (setting.isAttr !== '')) {
                let regex = param[i].match(/^([\d\-a-z]+):([^!\s]+)(!)?$/)
                setting.important = (!!regex[3]) ? ' !important' : ''
                setting.prop = expandShorthand(regex[1])
                setting.value = replaceCssPropertyValueWBracket(regex[2])

                for(let j = 0, m = setting.prop.length; j < m; j ++) {
                  const css = `${setting.isMq !== '' ? '@media screen and ' + setting.isMq + ' { ' : ''}${setting.isDark ? ':root.dark ' : ''}${rule.selector}${setting.isData}${setting.isAria}${setting.isAttr}${setting.isHover ? ':hover' : ''}{${setting.prop[j]}: ${setting.value}}${setting.isMq !== '' ? ' }' : ''}`
                  rule.after(css)
                }
              } else if(/^([\d\-a-z]+):([^!\s]+)(!)?$/.test(param[i])) {
                let regex = param[i].match(/^([\d\-a-z]+):([^!\s]+)(!)?$/)
                setting.important = (!!regex[3]) ? ' !important' : ''
                setting.value = replaceCssPropertyValueWBracket(regex[2])

                for(let prop = expandShorthand(regex[1]), j = 0, m = prop.length; j < m; j ++) {
                  node.after(`${prop[j]}: ${setting.value}${setting.important};`)
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
            colorText.push(`--color-${defaultColorNames[i]}-${scheme[defaultColorNames[i]][j][0]}: ${scheme[defaultColorNames[i]][j][1]};`)
          }
        }
        root.prepend(postcss.parse(`:root { ${colorText.join('')} }`))
      }
    }
  }
}


/**
 * Append user color settings
 * @param {UserColor[]} auc - User color settings.
 */
const appendUserColors = auc => {
  for(let i = 0, l = auc.length; i < l; i ++) {
    // check data
    if(!auc[i].hasOwnProperty('theme')) continue
    if(!auc[i].hasOwnProperty('levels')) continue
    if(defaultColorNames.indexOf(auc[i].theme) >= 0) continue
    let flg = false
    for(let j = 0, m = auc[i].levels.length; j < m; j ++) {
      if(
        !auc[i].levels[j].hasOwnProperty('level')
        || !auc[i].levels[j].hasOwnProperty('rgb')
        || !auc[i].levels[j].hasOwnProperty('hsl')
        || !auc[i].levels[j].hasOwnProperty('oklch')
      ) {
        flg = true
        break
      }
    }
    if(flg) continue

    // push data
    defaultColorNames.push(auc[i].theme)
    if(!defaultColorDefines.rgb[auc[i].theme]) defaultColorDefines.rgb[auc[i].theme] = []
    if(!defaultColorDefines.hsl[auc[i].theme]) defaultColorDefines.hsl[auc[i].theme] = []
    if(!defaultColorDefines.oklch[auc[i].theme]) defaultColorDefines.oklch[auc[i].theme] = []
    for(let j = 0, m = auc[i].levels.length; j < m; j ++) {
      defaultColorDefines.rgb[auc[i].theme].push([auc[i].levels[j].level, auc[i].levels[j].rgb])
      defaultColorDefines.hsl[auc[i].theme].push([auc[i].levels[j].level, auc[i].levels[j].hsl])
      defaultColorDefines.oklch[auc[i].theme].push([auc[i].levels[j].level, auc[i].levels[j].oklch])
    }
  }

  // to unique data
  for(let i = 0, l = defaultColorNames.length; i < l; i ++) {
    defaultColorDefines.rgb[defaultColorNames[i]] = Array.from(new Set(defaultColorDefines.rgb[defaultColorNames[i]].map(JSON.stringify)))
    defaultColorDefines.hsl[defaultColorNames[i]] = Array.from(new Set(defaultColorDefines.hsl[defaultColorNames[i]].map(JSON.stringify)))
    defaultColorDefines.oklch[defaultColorNames[i]] = Array.from(new Set(defaultColorDefines.oklch[defaultColorNames[i]].map(JSON.stringify)))
    for(let j = 0, m = defaultColorDefines.rgb[defaultColorNames[i]].length; j < m; j ++) {
      defaultColorDefines.rgb[defaultColorNames[i]][j] = JSON.parse(defaultColorDefines.rgb[defaultColorNames[i]][j])
      defaultColorDefines.hsl[defaultColorNames[i]][j] = JSON.parse(defaultColorDefines.hsl[defaultColorNames[i]][j])
      defaultColorDefines.oklch[defaultColorNames[i]][j] = JSON.parse(defaultColorDefines.oklch[defaultColorNames[i]][j])
    }
  }
}

/**
 * Append user shorthand settings
 * @param {Object{<string>,<string>[]}[]} aus - User shorthand settings.
 */
const appendUserShorthands = aus => {
  for(let i = 0, l = aus.length; i < l; i ++) {
    // check data
    if(typeof aus[i] !== 'object') continue
    if(aus[i].length !== 2) continue
    if(typeof aus[i][1] !== 'object') continue
    if((defaultShorthands.indexOf(aus[i][0]) === -1) && (appendShorthandsIndex.indexOf(aus[i][0]) === -1)) {
      // push data
      appendShorthandsIndex.push(aus[i][0])
      appendShorthandsData[aus[i][0]] = aus[i][1]
    }
  }
}

/**
 * Replace W SQUARE BRACKET syntax to available value in CSS property value
 * @param {string} value - Designated value.
 * @returns {string} Available value as CSS property.
 */
const replaceCssPropertyValueWBracket = value => value.replace(/\^/g, ' ')
.replace(/color\[\[(.+?)\]\]/g,(_,expr) => {
  const args = expr.split(',').reverse()
  let opts = {
    style: 'hsl',
    color: 'base',
    level: '400',
    opacity: '100%',
  }

  for(let i = 0, l = args.length; i < l; i ++) {
    if(/^[\d]+$/.test(args[i])) {
      opts.level = args[i]
    } else if(/^[\d]+[%]$/.test(args[i])) {
      opts.opacity = args[i]
    } else if(/^(rgb|hsl|oklch)$/i.test(args[i])) {
      opts.style = args[i].toLowerCase()
    } else if(defaultColorNames.includes(args[i])) {
      opts.color = args[i]
    } else {
      return ''
    }
  }

  let color = defaultColorDefines[opts.style][opts.color].filter(arr => arr[0] === parseInt(opts.level))
  if(color.length !== 1) return ''
  if(color[0].length !== 2) return ''
  color = color[0][1]

  switch(opts.style) {
    case 'rgb':
      color += Math.ceil(parseInt(opts.opacity)*2.55).toString(16).toUpperCase()
      break;
    case 'hsl':
    case 'oklch':
      color = color.replace(')', ` / ${opts.opacity})`)
      break;
    default:
      break;
  }

  return color
})
.replace(/\[\[([^}]+)\]\]/g,(_,expr)=>`[[${expr.replace(/([+\*/]|(?<=[0-9a-zA-Z\)])[-%](?=[0-9a-zA-Z\(]))/g,' $1 ')}]]`)
.replace('[[', '(')
.replace(']]', ')')
.replace('color()', '#0000')
.replace(/ +/g, ' ')

/**
 * Expand shorthand property name.
 * @param {String} prop - Specified property name.
 * @return {Array<String>} - Regular property name that defined in CSS.
 * @return {Array<String>} - If this function retrieved undefined shorthand property in this plugin, returns just it.
 */
const expandShorthand = prop => {
  switch(prop) {
    // margin
    case 'm': return ['margin']
    case 'm8': return ['margin-top']
    case 'm6': return ['margin-right']
    case 'm2': return ['margin-bottom']
    case 'm4': return ['margin-left']
    case 'mx': return ['margin-left', 'margin-right']
    case 'my': return ['margin-top', 'margin-bottom']

    // padding
    case 'p': return ['padding']
    case 'p8': return ['padding-top']
    case 'p6': return ['padding-right']
    case 'p2': return ['padding-bottom']
    case 'p4': return ['padding-left']
    case 'px': return ['padding-left', 'padding-right']
    case 'py': return ['padding-top', 'padding-bottom']

    // outline
    case 'o': return ['outline']
    case 'o8': return ['outline-top']
    case 'o6': return ['outline-right']
    case 'o2': return ['outline-bottom']
    case 'o4': return ['outline-left']
    case 'ox': return ['outline-left', 'outline-right']
    case 'oy': return ['outline-top', 'outline-bottom']

    // border-width
    case 'bw': return ['border-width']
    case 'bw8': return ['border-top-width']
    case 'bw6': return ['border-right-width']
    case 'bw2': return ['border-bottom-width']
    case 'bw4': return ['border-left-width']
    case 'bwx': return ['border-left-width', 'border-right-width']
    case 'bwy': return ['border-top-width', 'border-bottom-width']

    // border-style
    case 'bs': return ['border-style']
    case 'bs8': return ['border-top-style']
    case 'bs6': return ['border-right-style']
    case 'bs2': return ['border-bottom-style']
    case 'bs4': return ['border-left-style']
    case 'bsx': return ['border-left-style', 'border-right-style']
    case 'bsy': return ['border-top-style', 'border-bottom-style']

    // border-color
    case 'bc': return ['border-color']
    case 'bc8': return ['border-top-color']
    case 'bc6': return ['border-right-color']
    case 'bc2': return ['border-bottom-color']
    case 'bc4': return ['border-left-color']
    case 'bcx': return ['border-left-color', 'border-right-color']
    case 'bcy': return ['border-top-color', 'border-bottom-color']

    // border-radius
    case 'br': return ['border-radius']
    case 'br7': return ['border-top-left-radius']
    case 'br9': return ['border-top-right-radius']
    case 'br3': return ['border-bottom-right-radius']
    case 'br1': return ['border-bottom-left-radius']

    // color
    case 'ct': return ['color']
    case 'cb': return ['background-color']

    // inset
    case 'i': return ['inset']
    case 'i8': return ['top']
    case 'i6': return ['right']
    case 'i2': return ['bottom']
    case 'i4': return ['left']

    // sizing
    case 'w': return ['width']
    case 'wmin': return ['min-width']
    case 'wmax': return ['max-width']
    case 'h': return ['height']
    case 'hmin': return ['min-height']
    case 'hmax': return ['max-height']

    // grid position
    case 'gx': return ['grid-column']
    case 'g4': return ['grid-column-start']
    case 'g6': return ['grid-column-end']
    case 'gy': return ['grid-row']
    case 'g8': return ['grid-row-start']
    case 'g2': return ['grid-row-end']

    // font
    case 'ff': return ['font-family']
    case 'fs': return ['font-size']
    case 'fw': return ['font-weight']
    case 'fh': return ['line-height']

    // default
    default:
      if(appendShorthandsData.hasOwnProperty(prop)) {
        return appendShorthandsData[prop]
      } else {
        return [].concat(prop)
      }
  }
}
