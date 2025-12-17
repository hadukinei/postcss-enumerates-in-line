// declare module "postcss-enumerates-in-line"

interface EnumsEnumeratesInLineOptions extends object {
  /**
   * @param {boolean|string} prependDefaultColor - Enable to print default CSS colors which explains like a `--enums-color-red-900: #f00;`.
   * If set false, this will not print CSS colors.
   * If set true, this will print CSS colors which is styled in `#f00`.
   * And if set 'RGB' (also available 'rgb'), same as above.
   * But if set 'HSL' (also available 'hsl'), prints which styled in `hsl(0 100% 50%)`.
   * Then if set 'OKLCH' (also available 'oklch'), prints which styled in `oklch(63% 26 29.93)`.
   */
  prependDefaultColor?: true | '',

  /**
   * @param {boolean|string[]} prependDefaultStyle - Enable to print default CSS styles.
   * If set false, this will not print any CSS styles.
   * If set true, this will print default CSS styles which defined of the package.
   * If set {string[]} (like a ['a {text-decoration: underline}', 'a:hover {text-decoration: none}']), this will print CSS styles both package's default one and designate one.
   */
  prependDefaultStyle?: true | [''],
}
export declare function enumSpreader(options?: EnumsEnumeratesInLineOptions): import('postcss').Plugin
