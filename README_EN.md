# PostCSS Enumerates in Line

|言語|Language|
|---|---|
|[<img width="24" height="24" align="left" src="README.img/1f1ef-1f1f5.png" alt="🇯🇵"> 日本語](README.md)|[<img width="24" height="24" align="left" src="README.img/1f1fa-1f1f8.png" alt="🇺🇸"> English](README_EN.md)|


## Revision: in v0.0.1

- Change connection a package loading from inner file-path to [npmjs.com](https://www.npmjs.com/).

---

This [PostCSS] plugin extend to multiple CSSes from shrinked it which described in 1 line like `@apply` syntax of [Tailwind CSS].

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

Specific speaking, it takes the syntax like above -- language in [SCSS].

> The syntax is a kind of at-rules which begins by `@enums`, writing as same as `@apply` on Tailwind CSS.
>
> There are shorthands; `my` means convined `margin-top` and `margin-bottom`, `ff` means `font-family`, and `fs` means `font-size`.
> What are defining about shorthands, c.f. [Shorthands of property names](#shorthands-of-property-names).
>
> You would separate CSS styles by `:` character so, property name appears in before and property value appears in after against `:`.
> Whitespace characters (like a ` `) treat as separator of CSS styles. If you want to write whitespaces at property values, then may replace these by `^` character.
>
> There are syntax descriptions after indexes.

There are no imprements about state transition like a hover, media queries, dark mode, etc.; because I am wishing only to aim for enumerating CSS styles.

> What do I want to say; this plugin do not have any `hover:`, `md:`, and `dark:` etc. at [Tailwind CSS].

I think primary usage is [gulp] and [gulp-postcss]. However it also works on JS-API of the PostCSS.

[PostCSS]: https://github.com/postcss/postcss
[Tailwind CSS]: https://tailwindcss.com/
[SCSS]: https://sass-lang.com/
[gulp]: https://gulpjs.com/
[gulp-postcss]: https://github.com/postcss/gulp-postcss

<div class="x--hr"></div>


## Indexes

- [PostCSS Enumerates in Line](#postcss-enumerates-in-line)
  - [Revision: in v0.0.1](#revision-in-v001)
  - [Indexes](#indexes)
  - [Method of writing in CSS files.](#method-of-writing-in-css-files)
    - [Special characters](#special-characters)
      - [COLON Character](#colon-character)
      - [EXCLAMATION character](#exclamation-character)
      - [CIRCUMFLEX character](#circumflex-character)
      - [double SQUARE BRACKET character](#double-square-bracket-character)
    - [Shorthands of property names](#shorthands-of-property-names)
  - [How to use this plugin](#how-to-use-this-plugin)
    - [How to use with gulp](#how-to-use-with-gulp)
      - [package.json](#packagejson)
      - [Javascript module](#javascript-module)
        - [Load packages](#load-packages)
        - [Task: SCSS](#task-scss)
      - [Source files of sample](#source-files-of-sample)
      - [Execute compiling](#execute-compiling)
    - [How to use with JS-API](#how-to-use-with-js-api)
      - [package.json](#packagejson-1)
      - [Javascript module](#javascript-module-1)
        - [Load packages](#load-packages-1)
        - [Task: SCSS](#task-scss-1)
      - [Source files of sample](#source-files-of-sample-1)
      - [Execute compiling](#execute-compiling-1)
  - [Arguments of option settings](#arguments-of-option-settings)
    - [prependDefaultColor](#prependdefaultcolor)
    - [prependDefaultStyle](#prependdefaultstyle)

<div class="x--hr"></div>


## Method of writing in CSS files.

It is easilable doing in CSS (or SCSS) files.

```scss
html {
  @enums background-color:#000 color:#fff;

  h1 {
    @enums font-size:100%;
  }
}
```

You need not to write setting `@import tailwindcss;` as for [Tailwind CSS]. There are no special syntax for import in this plugin.

Begin with `@enums`, and end with `;`. That is all.

You can enumerates multiple CSS styles with whitespace splitter which are "WHITESPACEs". That means splitting is executed by line breaks also.

There are simplification at CSS style declarating too. That made by combination with "`property name`", "`:`", and "`property value`".

You will be able to operate designation freely like a "`border:1px^#888^solid`", because property values can have arbitary value.


### Special characters

There are 5 characters which behave especially; `:`, `^`, `!`, `[[`, and `]]`.


#### COLON Character

As saying before, COLON (`:`) characters are used for separator against property name and property value.

Because of this, you cannot describe as `content:":"`.

Please transform to escape the characters by yourself -- `content:"\03A"`.


#### EXCLAMATION character

When you postfix EXCLAMATION (`!`) character about property value, this plugin recognize "I ordered this property is declared `!important`". There is `padding-top:1rem`, then will be replaced to `padding-top: 1rem !important`.


#### CIRCUMFLEX character

CIRCUMFLEX (`^`) characters will be replaced to half-width space (` `) character automatically.

When you occured that need to separate a CSS style by whitespace character. For example using, `border:1px^#888^solid` (this CSS style appears above).

There are not only usage at CSS property shorthands, there are used in the case of calculation operators, multiple CSS property values, avoidance `//` character. See no.1, 2, and 3.

1. calculation operators

Operators (`+`, `-`, `*`, and `/`) of calculation functions (`calc`, `min`, etc.) need whitespace character at before and behind, it must descripts like `calc(100vw - 1rem)` in regular CSS syntax.

But this plugin is not allow whitespaces in property values. So you should replace whitespace character to `^`.

2. multiple CSS property values

There is a case of effecting to combine multiple property values like `filter: blur(5px) grayscale(80%)`. As same above, you would describe replacing whitespace characters to `filter:blur(5px)^grayscale(80%)`.

3. avoidance `//` character

In the unique case, there are special way to describe using shorthands like `border-image: linear-gradient(#333,#333) fill 0 // 0 100vw`.

> This is a one of CSS tricks which used on drawing to max of viewport  width over DOM element's left and right.

There is included `//` character, this can write on CSS syntax because which only have block comment-out. But SCSS syntax have 1 line comment-out too, it occurs a compile error.

> I needed to consider about this probrem -- all user possibly write the both case `/ /` (sepalated by whitespace) and `//` (adjacented SLASH characters) -- that is works too as same CSS syntax meaning.

Therefore you might supplement CIRCUMFLEX (`^`) characters against whitespace as `border-image:linear-gradient(#333,#333)^fill^0^/^/^0^100vw`, so have to describe explicitly as `/ /` for evading SCSS syntax error.


#### double SQUARE BRACKET character

Additional speaking, this is a experimental function. I provided another method for problem of calculation operators (no. 1; `+`, `-`, `*`, and `/`).

You can describe as `width:calc[[100vw-(100%+2rem)*(2)+1rem]]` too to omit `^` characters, by surrounding with `[[` and `]]` characters.

Because there ware annoying `^` characters they appear many and many times about `width:calc(100vw^-^(100%^+^2rem)^*^2^+^1rem)`, that is not visibility at good.

> Please must you not use `[[` and `]]` characters about non-mathematical functions like `var()`.
> 
> Cause for example; `var[[--foo-bar]]` will be wrongly replacing to `var(--foo - var)`. That is destructed and meaningless property value of CSS.

This is experimental function. I am improving a transform compiler, so you will face at risk that would not insert whitespace characters to both end of calculation operators normally at your wish.

It works to replace whitespace to `^` characters as this case too. But I recommend to take a surefire way, it is supplements by `^` characters manually without `[[` and `]]`.


### Shorthands of property names

There are defined shorthands about some property names.

For example, `border-top-width:1px` as same as `bw8:1px`.

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

`x` character means left & right, `y` means top & bottom.

Numeric character (from `1` to `9`) are related to position of Ten-key pad.


## How to use this plugin

### How to use with gulp

I will prepare for workable sample in `test/gulp` folder.


#### package.json

```powershell
npm init -y
```

Change defining some properties in a package.json.

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


#### Javascript module

Create `gulpfile.mjs` file.

I only describe functions about this package.


##### Load packages

Load this package with PostCSS and other plugin packages.

```javascript
// PostCSS
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import csso from 'postcss-csso'
import { enumSpreader } from 'postcss-enumerates-in-line'
```


##### Task: SCSS

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

Insert a function of `enumSpreader({})` into array of PostCSS execution.

> Please set a PostCSS function after Sass (SCSS), and set this package before all other PostCSS plugins.

You will designate a blank object at a function of this package, if want to use by default settings.

Or not want, might add option settings in the object.

The detail of settings to know, refer to [Arguments of option settings](#arguments-of-option-settings).


#### Source files of sample

I created to provide these folders -- `src`, `src/css`, `src/js`, and `dist`. And files -- `src/index.html`, `src/css/app.scss`, and `src/js/app.js`.

For lively using example about this package, you may mainly see a file `src/css/app.scss`.


#### Execute compiling

`npm run dev` runs CLI debug mode, and `npm run build` runs CLI build mode.


### How to use with JS-API

I will prepare for workable sample in `test/postcss` folder.


#### package.json

```powershell
npm init -y
```

Change defining some properties in a package.json.

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

#### Javascript module

Create these files -- `build-clean.mjs`, `build-copy.mjs`, and `build-css.mjs`.

Omit to explain about build-clean.mjs and build-copy.mjs, because there are no affects directly with this package.


##### Load packages

Load these packages.

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

##### Task: SCSS

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

Insert a function of `enumSpreader({})` into array of PostCSS execution.

> Please set this package before all other PostCSS plugins.

You will designate a blank object at a function of this package, if want to use by default settings.

Or not want, might add option settings in the object.

The detail of settings to know, refer to [Arguments of option settings](#arguments-of-option-settings).


#### Source files of sample

I created to provide these folders -- `src`, `src/css`, `src/js`, and `dist`. And files -- `src/index.html`, `src/css/app.scss`, and `src/js/app.js`.

For lively using example about this package, you may mainly see a file `src/css/app.scss`.


#### Execute compiling

`npm run dev` runs CLI debug mode, and `npm run build` runs CLI build mode.


## Arguments of option settings

### prependDefaultColor

How to dealing with CSS about color settings that will add automatically.

Default value: true (boolean|string)

If you designate to `true` (either nothing to designate, or designate `"hsl"` including `"HSL"`), this package output color settings in HSL type to CSS files like below.

```css
:root {
  --enums-color-gray-100: hsl(210 5% 10%);
}
```

Turn it `false`, this will not output any color settings.

You want to output by RGB type (without default HSL type), may designate `"rgb"` or `"RGB"`.

```css
:root {
  --enums-color-gray-100: #181a1b;
}
```

Or want to output by OKLCH type, may designate `"oklch"` or `"OKLCH"`.

```css
:root {
  --enums-color-gray-100: oklch(0.21 0.01 210);
}
```


### prependDefaultStyle

How to dealing with CSS about reset settings that will add automatically.

Default value: true (boolean|string[])

If you designate to `true` (or nothing to designate), this package output reset settings to CSS files like below.

```css
*, ::before, ::after, ::backdrop, ::file-selector-button {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0 solid;
}
```

Turn it `false`, this will not output any reset settings.

```javascript
prependDefaultStyle: [
  'a { color: red }',
  'a:hover { text-decoration: underline }',
]
```

You want to append your original reset CSS, please designate CSS blocks (string[] type) like above.

It only works appending CSS styles, you cannot remove reset CSS styles which defined in this package.

In the case of working perfectly original CSS styles, you may designate `false` to this option, and write these in your SCSS files.
