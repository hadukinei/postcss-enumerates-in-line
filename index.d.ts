declare module "postcss-enumerates-in-line"

interface EnumsEnumeratesInLineOptions extends object {
  /**
   * @param {boolean|string} prependDefaultColor - Enable to print default CSS colors which explains like a `--enums-color-red-900: #f00;`.
   * If set false, this will not print CSS colors.
   * If set true, this will print CSS colors which is styled in `#f00`.
   * And if set 'RGB' (also available 'rgb'), same as above.
   * But if set 'HSL' (also available 'hsl'), prints which styled in `hsl(0 100% 50%)`.
   * Then if set 'OKLCH' (also available 'oklch'), prints which styled in `oklch(63% 26 29.93)`.
   */
  prependDefaultColor?: true | false | '',

  /**
   * @param {boolean|string[]} prependDefaultStyle - Enable to print default CSS styles.
   * If set false, this will not print any CSS styles.
   * If set true, this will print default CSS styles which defined of the package.
   * If set {string[]} (like a ['a {text-decoration: underline}', 'a:hover {text-decoration: none}']), this will print CSS styles both package's default one and designate one.
   */
  prependDefaultStyle?: true | false | [''],

  /**
   * @param {UserColor[]} appendUserColor - Append user color settings to default color.
   */
  appendUserColor?: [],

  /**
   * @param {Object{<string>,<string>[]}[]} appendShorthand - Append user shorthand settings to default shorthand.
   */
  appendShorthand?: []
}

interface UserColor extends object {
  /**
   * @param {string} theme - The name of color theme.
   */
  theme: '',

  /**
   * @param {UserColorLevel[]} levels - Color levels
   */
  levels: [],
}

interface UserColorLevel extends object {
  /**
   * @param {number} level - Light/Dark level
   */
  level: 0,

  /**
   * @param {string} rgb - Color value which styles in RGB.
   */
  rgb: '',

  /**
   * @param {string} hsl - Color value which styles in HSL.
   */
  hsl: '',

  /**
   * @param {string} oklch - Color value which styles in OKLCH.
   */
  oklch: '',
}

export declare function enumSpreader(options?: EnumsEnumeratesInLineOptions): import('postcss').Plugin
