# PostCSS Enumerates in Line

|言語|Language|
|---|---|
|[<img width="24" height="24" align="left" src="README.img/1f1ef-1f1f5.png" alt="🇯🇵"> 日本語](README.md)|[<img width="24" height="24" align="left" src="README.img/1f1fa-1f1f8.png" alt="🇺🇸"> English](README_EN.md)|


## 更新点: v0.1.0

- サンプルのパッケージ読み込みを[npmjs.com](https://www.npmjs.com/)経由に変更

---

この[PostCSS]プラグインは、複数のCSSプロパティを1つの行にまとめ上げて記述できるようにします。

[Tailwind CSS]の`@apply`構文と似た働きをします。

```scss
// header
.c-header {
  @enums my:1.5rem;

  &--caption {
    @enums ff:"Rammetto^One",sans-serif fs:1.25em;
  }

  &--description {
    @enums fs:0.85em;
  }
}
```

具体的には上のような書式を取ります。（言語は[SCSS]）

> `@enum`で始まるat-rulesの一種であり、`@apply`と記述方法は全く同じです。
>
> `my`は`margin-top` & `margin-bottom`の、`ff`は`font-family`の、`fs`は`font-size`のショートハンドです。
> 何がショートハンドとして定義されているかは[プロパティ名のショートハンド](#プロパティ名のショートハンド)を参照してください。
>
> `:`記号の前がプロパティ名、後ろがプロパティ値になっています。
> ホワイトスペースはプロパティの区切り文字であるため、プロパティ値に半角スペース記号を使いたい場合は`^`で代用します。
>
> 詳しい書式は目次の次へお進みください。

プロパティの列挙を目的としているため、hoverのような状態遷移・メディアクエリ・ダークモードなどへの対応はしません。

> [Tailwind CSS]における`hover:`・`md:`・`dark:`などに対応する機能は備えていないという意味です。

基本的には[gulp]および[gulp-postcss]での動作を想定していますが、JS-APIによるPostCSS単体でも動作します。

[PostCSS]: https://github.com/postcss/postcss
[Tailwind CSS]: https://tailwindcss.com/
[SCSS]: https://sass-lang.com/
[gulp]: https://gulpjs.com/
[gulp-postcss]: https://github.com/postcss/gulp-postcss

<div class="x--hr"></div>


## 目次

- [PostCSS Enumerates in Line](#postcss-enumerates-in-line)
  - [更新点: v0.1.0](#更新点-v010)
  - [目次](#目次)
  - [CSSでの記述方法](#cssでの記述方法)
    - [特殊な記号](#特殊な記号)
      - [コロン記号](#コロン記号)
      - [エクスクラメーション記号](#エクスクラメーション記号)
      - [サーカムフレックス記号](#サーカムフレックス記号)
      - [二重角括弧記号](#二重角括弧記号)
    - [プロパティ名のショートハンド](#プロパティ名のショートハンド)
  - [プラグインを使用する方法](#プラグインを使用する方法)
    - [gulpでの使い方](#gulpでの使い方)
      - [package.json](#packagejson)
      - [Javascriptモジュール](#javascriptモジュール)
        - [読み込み処理](#読み込み処理)
        - [タスク処理](#タスク処理)
      - [サンプルのソースファイル](#サンプルのソースファイル)
      - [実行](#実行)
    - [JS-APIでの使い方](#js-apiでの使い方)
      - [package.json](#packagejson-1)
      - [Javascriptモジュール](#javascriptモジュール-1)
        - [読み込み処理](#読み込み処理-1)
        - [タスク処理](#タスク処理-1)
      - [サンプルのソースファイル](#サンプルのソースファイル-1)
      - [実行](#実行-1)
  - [オプション引数](#オプション引数)
    - [prependDefaultColor](#prependdefaultcolor)
    - [prependDefaultStyle](#prependdefaultstyle)

<div class="x--hr"></div>


## CSSでの記述方法

CSS（やSCSSなど）での書式は単純です。

```scss
html {
  @enums background-color:#000 color:#fff;

  h1 {
    @enums font-size:100%;
  }
}
```

[Tailwind CSS]における`@import tailwindcss;`のような記述をCSS側ファイルに行う必要はありません。

`@enums`で開始し、`;`で終了します。

ホワイトスペースで区切られているため、半角スペースだけでなく改行記号でも複数あるCSSスタイル宣言を分割することができます。

CSSスタイル宣言についても単純で、「`プロパティ名`・`半角コロン記号`・`プロパティ値`」の組み合わせになっています。

プロパティ値は任意の値を取ることができるため、`border:1px^#888^solid`など自由な指示をすることができるでしょう。


### 特殊な記号

特殊な振る舞いを起こす文字は、`:`・`^`・`!`・`[[`・`]]`の５種類です。


#### コロン記号

前述の通り`:`記号はプロパティ名とプロパティ値を区切るために使います。

このため`content:":"`という表記はできません。

`content:"\03A"`のように文字エスケープを行ってください。


#### エクスクラメーション記号

`padding-top:1rem!`などのようにして、`!`記号をプロパティ値の末尾に付けると`!important`宣言をしたことになります。


#### サーカムフレックス記号

`^`記号はこのPostCSSプラグインにおいて半角スペースに自動変換されます。

上述の`border:1px^#888^solid`など、ホワイトスペースで区切る必要がある場合に使用します。

一括指定型プロパティだけでなく、演算記号の問題や、複数のプロパティ値を持つ場合、`//`の回避などに使うことができます。どういう事例を想定しているかはNo. 1から3を参照してください。


1. 演算記号

`calc(100vw - 1rem)`などの算術関数の中で使われる演算記号（`+`・`-`・`*`・`/`）は、両端に空白記号を挿入する必要があります。空白記号を補うために`calc(100vw^-^1rem)`のようにしてください。


2. 複数のプロパティ値

`filter:blur(5px) grayscale(80%)`などのような複数のプロパティ値を組み合わせることで効果を発揮する場合もあります。同様に空白記号を補うべく`filter:blur(5px)^grayscale(80%)`などと表してください。

3. `//`の回避

ショートハンドを利用した特殊な記法として、`border-image: linear-gradient(#333,#333) fill 0 // 0 100vw`のようなものがあります。

> DOM要素の左右へ飛び出してビューポートの横幅いっぱいを塗りつぶすCSSトリックの一種です。

この中に`//`が含まれており、CSSにはブロックコメントアウトしか存在しないため問題ないのですが、SCSSでは一行コメントアウトとして機能してしまうため構文エラーを引き起こします。

> `/ /`のようにして半角スペースを補えば問題ないのですが、CSSの文法として成立する以上は考慮する必要がありました。

そのため`border-image:linear-gradient(#333,#333)^fill^0^/^/^0^100vw`のようにして空白記号に替わる`^`を補い、明示的に`/ /`だと表記してSCSS構文エラーを回避するのです。


#### 二重角括弧記号

なお実験的機能ではありますが、算術関数における演算子（`+`・`-`・`*`・`/`）の空白記号問題については別の解決方法も用意しています。

`width:calc(100vw^-^(100%^+^2rem)^*^2^+^1rem)`のような記述は視覚的ではないため、`[[`と`]]`に囲んだ中であれば`width:calc[[100vw-(100%+2rem)*(2)+1rem]]`としてサーカムフレックス記号を省くことができます。

> `var`関数など算術関数でないものに`[[`・`]]`記号は使わないでください。
> 
> 例えば`var(--foo-bar)`が誤変換されて、`var(--foo - bar)`のようにして意味のないCSSへと破壊されてしまうためです。

しかし変換書式を改善中であるため、意図したように演算子の両端へ正常に空白記号が挿入されない可能性があります。

こうした場合でも`^`記号を補えば正常な算術関数へと修正できるのですが、より確実な手段としては`[[`・`]]`記号を使わず人力で`^`記号を補う方が間違いは少ないでしょう。


### プロパティ名のショートハンド

いくつかのプロパティ名にはショートハンド定義がしてあります。

例えば`border-top-width:1px`は`bw8:1px`と同義となります。

+ margin
  - `m`: margin
  - `m8`: margin-top
  - `m6`: margin-right
  - `m2`: margin-bottom
  - `m4`: margin-left
  - `mx`: margin-left & margin-right
  - `my`: margin-top & margin-bottom
+ padding
  - `p`: padding
  - `p8`: padding-top
  - `p6`: padding-right
  - `p2`: padding-bottom
  - `p4`: padding-left
  - `px`: padding-left & padding-right
  - `py`: padding-top & padding-bottom
+ outline
  - `o`: outline
  - `o8`: outline-top
  - `o6`: outline-right
  - `o2`: outline-bottom
  - `o4`: outline-left
  - `ox`: outline-left & outline-right
  - `oy`: outline-top & outline-bottom
+ border-width
  - `bw`: border-width
  - `bw8`: border-top-width
  - `bw6`: border-right-width
  - `bw2`: border-bottom-width
  - `bw4`: border-left-width
  - `bwx`: border-left-width & border-right-width
  - `bwy`: border-top-width & border-bottom-width
+ border-style
  - `bs`: border-style
  - `bs8`: border-top-style
  - `bs6`: border-right-style
  - `bs2`: border-bottom-style
  - `bs4`: border-left-style
  - `bsx`: border-left-style & border-right-style
  - `bsy`: border-top-style & border-bottom-style
+ border-color
  - `bc`: border-color
  - `bc8`: border-top-color
  - `bc6`: border-right-color
  - `bc2`: border-bottom-color
  - `bc4`: border-left-color
  - `bcx`: border-left-color & border-right-color
  - `bcy`: border-top-color & border-bottom-color
+ border-radius
  - `br`: border-radius
  - `br7`: border-top-left-radius
  - `br9`: border-top-right-radius
  - `br3`: border-bottom-right-radius
  - `br1`: border-bottom-left-radius
+ color
  - `ct`: color
  - `cb`: background-color
+ inset
  - `i`: inset
  - `i8`: top
  - `i6`: right
  - `i2`: bottom
  - `i4`: left
+ sizing
  - `w`: width
  - `wmin`: min-width
  - `wmax`: max-width
  - `h`: height
  - `hmin`: min-height
  - `hmax`: max-height
+ grid position
  - `gx`: grid-column
  - `g4`: grid-column-start
  - `g6`: grid-column-end
  - `gy`: grid-row
  - `g8`: grid-row-start
  - `g2`: grid-row-end
+ font
  - `ff`: font-family
  - `fs`: font-size
  - `fw`: font-weight
  - `fh`: line-height

`x`はleft & right、`y`はtop & bottomの意味です。

数字の`1`から`9`が使われる理由はテンキーの配置を想像してみてください。


## プラグインを使用する方法

### gulpでの使い方

動作サンプルを`test/gulp`フォルダに用意してあります。


#### package.json

```powershell
npm init -y
```

`package.json`ファイルの該当箇所を次のように書き換えます。

```json
{
  "type": "module",
  "scripts": {
    "clean": "gulp clean",
    "build": "npm run clean && gulp",
    "dev": "gulp dev"
  }
}
```

```powershell
npm install autoprefixer browser-sync gulp gulp-plumber gulp-postcss gulp-sass postcss-csso postcss-enumerates-in-line sass
```


#### Javascriptモジュール

`gulpfile.mjs`ファイルを作ります。

その中でもこのパッケージに関する処理だけを説明します。


##### 読み込み処理

PostCSS本体や他のプラグインパッケージと同様に読み込みます。

```javascript
// PostCSS
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import csso from 'postcss-csso'
import { enumSpreader } from 'postcss-enumerates-in-line'
```


##### タスク処理

```javascript
// CSS <- SCSS
const task_css = done => {
  src('src/css/**/!(_)*.scss', {
    allowEmpty: true,
  })
  .pipe(plumber())
  .pipe(sass())
  .pipe(postcss([
    enumSpreader({}),
    autoprefixer(),
    csso(),
  ]))
  .pipe(dest('dist/css'))

  done()
}
```

PostCSS処理の配列の中に、`enumSpreader({})`関数を差し込みます。

> Sass (SCSS)の後に実行し、他のPostCSSプラグインよりも前に記述してください。

この関数は初期設定のまま利用する場合は空のオブジェクトを指定します。

動作を変更したい場合は引数にオプション設定を加えます。

設定内容は[オプション引数](#オプション引数)を参照してください。


#### サンプルのソースファイル

`src`・`src/css`・`src/js`・`dist`フォルダを作成し、`src/index.html`・`src/css/app.scss`・`src/js/app.js`ファイルを用意しました。

このパッケージの利用方法は、主に`src/css/app.scss`をご参照ください。


#### 実行

デバッグモードは`npm run dev`、ビルドモードは`npm run build`です。


### JS-APIでの使い方

動作サンプルを`test/postcss`フォルダに用意してあります。

#### package.json

```powershell
npm init -y
```

`package.json`ファイルの該当箇所を次のように書き換えます。

```json
{
  "type": "module",
  "scripts": {
    "clean": "node build-clean.mjs",
    "common:copy": "node build-copy.mjs",
    "build:css": "node build-css.mjs -- build",
    "dev:css": "node build-css.mjs -- dev",
    "build": "npm run clean && run-s common:* build:*",
    "dev": "run-s common:* dev:*"
  }
}
```

```powershell
npm install autoprefixer glob npm-run-all2 postcss postcss-csso postcss-enumerates-in-line sass
```


#### Javascriptモジュール

`build-clean.mjs`・`build-copy.mjs`・`build-css.mjs`ファイルを作ります。

build-clean.mjsとbuild-copy.mjsはこのパッケージに直接関係するものではないため説明を省略します。


##### 読み込み処理

各種パッケージを読み込みます。

```javascript
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
```


##### タスク処理

```javascript
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
      enumSpreader({}),
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
```

PostCSS処理の配列の中に、`enumSpreader({})`関数を差し込みます。

> 他のPostCSSプラグインよりも前に記述してください。

この関数は初期設定のまま利用する場合は空のオブジェクトを指定します。

動作を変更したい場合は引数にオプション設定を加えます。

設定内容は[オプション引数](#オプション引数)を参照してください。


#### サンプルのソースファイル

`src`・`src/css`・`src/js`・`dist`フォルダを作成し、`src/index.html`・`src/css/app.scss`・`src/js/app.js`ファイルを用意しました。

このパッケージの利用方法は、主に`src/css/app.scss`をご参照ください。


#### 実行

デバッグモードは`npm run dev`、ビルドモードは`npm run build`です。


## オプション引数

### prependDefaultColor

自動的に出力される色設定への対応内容。

初期値: true (boolean|string)

`true`を設定した時（または何も設定しなかった時、あるいは`"hsl"`や`"HSL"`を設定した時）において、次のような色設定（HSL形式）がCSSに出力されます。

```css
:root {
  --enums-color-gray-100: hsl(210 5% 10%);
}
```

これを`false`にすると、色設定は出力されません。

初期状態のHSL形式でなく、RGB形式で出力させたい場合は`"rgb"` (string型; `"RGB"`でも可)と設定してください。

```css
:root {
  --enums-color-gray-100: #181a1b;
}
```

また`"oklch"` (string型; `"OKLCH"`でも可)と設定した場合はOKLCH形式で出力します。

```css
:root {
  --enums-color-gray-100: oklch(0.21 0.01 210);
}
```


### prependDefaultStyle

自動的に出力されるリセットCSS設定への対応内容。

初期値: true (boolean|string[])

`true`を設定した時（または何も設定しなかった時）、次のようなリセットCSS設定がCSSに出力されます。

```css
*, ::before, ::after, ::backdrop, ::file-selector-button {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0 solid;
}
```

これを`false`にすると、リセットCSSの設定は出力されません。

```javascript
prependDefaultStyle: [
  'a { color: red }',
  'a:hover { text-decoration: underline }',
]
```

`prependDefaultStyle`オプションにCSSブロック（string[]型）を記述すると、オリジナルのリセットCSSを追記することができます。

追記するだけであって、このプラグインが最初から搭載しているリセットCSSの一部だけを除去することはできません。

完全に自己流のリセットCSSだけを出力したい場合は`prependDefaultStyle`オプションを`false`にした上で、SCSSファイルにその設定を記述してください。
