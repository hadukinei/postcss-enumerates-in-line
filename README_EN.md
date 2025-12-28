# PostCSS Enumerates in Line

|言語|Language|
|---|---|
|[<img width="24" height="24" align="left" src="README.img/1f1ef-1f1f5.png" alt="🇯🇵"> 日本語](README.md)|[<img width="24" height="24" align="left" src="README.img/1f1fa-1f1f8.png" alt="🇺🇸"> English](README_EN.md)|


## Revision: in v0.3.1

- Added conditional CSS property names about below.
  + `hover!`
  + `dark!`
  + `mq(<mediaQueries>)!`
  + `data(<customDataElements>)`
  + `aria(<ariaAttributes>)`
- Changed default colors to [Flexoki].
- Appended `_color.scss` file into this package.
- Updated files as development samples, `test/gulp/` and `test/postcss/`.


## Maybe add functions

- Add new conditional CSS property: `attr(<attributes>)!`.
- Be able to define user generated shorthands.
- Refine `[[...]]` syntax, and add to use `color-alpha[[...]]` syntax which is enable to add alpha channel to default colors (using in CSS property value).


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

~~There are no imprements about state transition like a hover, media queries, dark mode, etc.; because I am wishing only to aim for enumerating CSS styles.~~

~~> What do I want to say; this plugin do not have any `hover:`, `md:`, and `dark:` etc. at [Tailwind CSS].~~

☑️In version 0.3.0 and upper.

And also if you prepend below syntaxes into CSS property, would be available about conditional CSS properties.

- `hover!`: :hover
- `dark!`: :root.dark
- `mq(<mediaQueries>)!`: @media screen and &lt;mediaQueries&gt;
- `data(<customDataElements>)!`: [data-&lt;customDataElement&gt;]
- `aria(<ariaAttributes>)!`: [aria-&lt;ariaAttributes&gt;]

> There are syntax descriptions after indexes.

I think primary usage is [gulp] and [gulp-postcss]. However it also works on JS-API of the PostCSS.

[PostCSS]: https://github.com/postcss/postcss
[Tailwind CSS]: https://tailwindcss.com/
[SCSS]: https://sass-lang.com/
[gulp]: https://gulpjs.com/
[gulp-postcss]: https://github.com/postcss/gulp-postcss
[Flexoki]: https://stephango.com/flexoki

<div class="x--hr"></div>


## Indexes

- [PostCSS Enumerates in Line](#postcss-enumerates-in-line)
  - [Revision: in v0.3.1](#revision-in-v031)
  - [Maybe add functions](#maybe-add-functions)
  - [Indexes](#indexes)
  - [Method of writing in CSS files.](#method-of-writing-in-css-files)
    - [Conditional CSS property](#conditional-css-property)
      - [Dark mode](#dark-mode)
      - [Mouse over state](#mouse-over-state)
      - [Media Queries](#media-queries)
      - [Custom data attribute](#custom-data-attribute)
      - [ARIA attributes](#aria-attributes)
    - [Special characters](#special-characters)
      - [COLON Character](#colon-character)
      - [EXCLAMATION character](#exclamation-character)
      - [CIRCUMFLEX character](#circumflex-character)
      - [double SQUARE BRACKET character](#double-square-bracket-character)
    - [Default colors](#default-colors)
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
    @enums font-size:100% hover!color:red;
  }
}
```

You need not to write setting `@import tailwindcss;` as for [Tailwind CSS]. There are no special syntax for import in this plugin.

Begin with `@enums`, and end with `;`. That is all.

You can enumerates multiple CSS styles with whitespace splitter which are "WHITESPACEs". That means splitting is executed by line breaks also.

There are simplification at CSS style declarating too. That made by combination with "`property name`", "`:`", and "`property value`".

You will be able to operate designation freely like a "`border:1px^#888^solid`", because property values can have arbitary value.


### Conditional CSS property

```scss
h1 {
  @emums data(visible="hidden")!display:none
  ct:blue hover!ct:red
  cb:white dark!cb:black
  mq(width:1000px-)!mx:auto;
}
```

You can extend a syntax to `<condition>!<CssPropertyName>:<CssPropertyValue>` like above.

Each condition (`hover!`, `dark!`, `mq(...)!`, `data(...)!`, and `aria(...)!`) are able to mate with others.

```scss
h1 {
  @enums dark!hover!ct:red;
}
```

But can you not prepend consecutively same conditional type about `mq(...)!`, `data(...)!`, and `aria(...)!`.
Because these are only able to add the 1 type by 1 CSS property.

If you want to enumerate conditions, please use by `,` splitting that located between `(` and`)`.

The case of there are designated consecutively same optional types, this plugin will be applying the only first one, and ignoring following others.

```scss
/* ❌️NG */
h1 {
  @enums mq(width:-640px)!mq(orientation:portrait)!m2:auto
  data(state="succeed")!data(target-href^="https://")!text-indent:1rem;
}

/* ⭕️OK */
h1 {
  @enums mq(width:-640px,orientation:portrait)!m2:auto
  data(state="succeed",target-href^="https://")!text-indent:1rem;
}

/* 🙂Unzip */
@media screen and (max-width: 640px) and (orientation: portrait) {
  h1 {
    margin-bottom: auto;
  }
}
h1[data-state="succeed"][data-target-href^="https://"] {
  text-indent: 1rem;
}
```


#### Dark mode

Using `dark!` case that of conditional syntax, this plugin behave to judge whether does `root:` (html element) have a `dark` class?

```scss
/* 🚧Before */
h1 {
  @emums cb:white dark!cb:black;
}

/* 🚀After */
h1 {
  background-color: white;
}
:root.dark h1 {
  background-color: black;
}
```


#### Mouse over state

Using `hover!` case that of conditional syntax, this plugin behave to add `:hover` pseudo class.

```scss
/* 🚧Before */
h1 {
  @emums ct:blue hover!ct:red;
}

/* 🚀After */
h1 {
  color: blue;
}
h1:hover {
  color: red;
}
```


#### Media Queries

Using `mq(...)!` case that of conditional syntax, this plugin behave to insert into `@media` rules.

If you wish to combine multiple media queries consecutively, can describe by `,` splitting syntax.

```scss
/* 🚧Before */
h1 {
  @emums mq(width:1000px-)!m2:auto
  mq(height:-1000px,aspect-ratio:1-)!p:1.5rem;
}

/* 🚀After */
@media screen and (min-width: 1000px) {
  h1 {
    margin-bottom: auto;
  }
}
@media screen and (max-height: 1000px) and (min-aspect-ratio: 1) {
  h1 {
    padding: 1.5rem;
  }
}
```

The media queries (which are as arguments of `mq(...)` function) can be described in these combination; `media feature`, `:`, `value of condition`.

There are usable media features as a below, however this plugin will change outputting actual media feathres by what do you use any values of condition.

- `orientation`: orientation
- `width`: width, min-width, max-width
- `height`: height, min-height, max-height
- `aspect-ratio`: aspect-ratio, min-aspect-ratio, max-aspect-ratio

> In `orientation` case; there is designatable value, `portrait` (long vertical or square shapes) or `landscape` (long horizontal shape) only.

```scss
body {
  @enums
  mq(orientation:portrait)!m2:1rem
  mq(orientation:landscape)!m8:1rem
  ;
}
```

> In `width` case; there are 3 type of designatable value. `-<length>`, `<length>-<length>`, and `<length>-`.
>
> You will be able to designate to `<length>` as these numeric values, that is related to length which tied with CSS sizing units; `px`, `rem`, `vw`, etc.
>
> + In `-<length>` case (the syntax is `<length>` with `-` prefix) -- this plugin recognize it as "This media query is smaller than `<length>`". (Applied media feature is `max-width`.)
> + In `<length>-<length>` case (the syntax is `-` sandwiching by 2 `<length>`) -- this plugin recognize it as "This media query still is range of between first `<length>` and second `<length>`". (Applied media feature are `min-width` and `max-width`.)
> + In `<length>-` case (the syntax is `<length>` with `-` postfix) -- this plugin recognize it as "This media query is larger than `<length>`". (Applied media feature is `min-width`.)

```scss
body {
  @enums
  mq(width:-480px)!m2:1rem
  mq(width:640px-1024px)!mx:1rem
  mq(width:1280px)!m8:1rem
  ;
}
```

> In `height` case; there are designatable value of condition and behavior that is same as `width`.
>
> But applying media feature are changed to `height`, `min-height`, and `max-height`.

```scss
body {
  @enums
  mq(height:-480px)!m2:1rem
  mq(height:640px-1024px)!mx:1rem
  mq(height:1280px)!m8:1rem
  ;
}
```

> In `aspect-ratio` case; you can only designate a value in numeric which is integer (like a `1`) or float (like a `0.85`) type.
>
> Notice: Must NOT designate value with divide operator (`/`), by what you wish to transform it from `@media (aspect-ratio: 16/9)`. You should designate a calculated literal number. (e.g. 16/9 🔀 1.78)
>
> + In `-<number>` case (the syntax is `<number>` with `-` prefix) -- this plugin recognize it as "This aspect ratio is smaller than `<number>`". (Applied media feature is `max-aspect-ratio`.)
> + In `<number>-<number>` case (the syntax is `-` sandwiching by 2 `<number>`) -- this plugin recognize it as "This aspect ratio stillis range of between first `<number>` and second `<number>`". (Applied media feature are `min-aspect-ratio` and `max-aspect-ratio`.)
> + In `<number>-` case (the syntax is `<number>` with `-` postfix) -- this plugin recognize it as "This aspect ratio is largeer than `<number>`". (Applied media feature is `min-aspect-ratio`.)
> + In `<number>` case (the syntax only is `<number>` and without any `-`) -- this plugin recognize it as "This aspect ratio is as just equal as `<number>`". (Applied media feature is `aspect-ratio`.)

```scss
body {
  @enums
  mq(aspect-ratio:-0.5)!m2:1rem
  mq(aspect-ratio:0.55-0.95)!mx:1rem
  mq(aspect-ratio:1.25-)!m8:1rem
  mq(aspect-ratio:1)!p:1rem
  ;
}
```


#### Custom data attribute

Using `data(...)!` case that conditional syntax, this plugin behave to combine CSS selector and custom data attributes.

If you wish to combine multiple custom data attributes consecutively, can describe by `,` splitting syntax.

```scss
/* 🚧Before */
h1 {
  @emums data(visible="hidden")!display:none;
}

/* 🚀After */
h1[data-visible="hidden"] {
  display: none;
}
```

The custom data attributes (which are as arguments of `data(...)` function) can be described in these combination; `attribute name`, `conditional operator`, `attribute value`.

If do you need a attribute value (that means you want to need only attribute name like as `*[data-loading]`), should not designate `conditional operator` and `attribute value`,

```scss
/* 🚧Before */
h1 {
  @enums data(loading)!display:none
  data(is-empty="false")!m8:1rem;
}

/* 🚀After */
h1[data-loading] {
  display: none;
}
h1[data-is-empty="false"] {
  margin-top: 1rem;
}
```

> At attribute name; designated value is only string which is following onto `data-`.
>
> Strictly speaking, there are available only `/[A-Za-z\d_\-]/` characters. But you cannot put `-` characters at first or last.

> At conditional operator; there are usable kinds as a below.
>
> + `=`: The case of matching between designated value and custom data attributes absolutely. (e.g. `[data-foo="bar"]`)
> + `~=`: The case of matching between one of designated value ([required] string must be space character separated style) and custom data attributes. (e.g. `[data-tags~="ipsum"]` vs. `<span data-tags="lorem ipsum dolor sit amet"></span>`)
> + `^=`: The case of matching between designated value and custom data attributes starting with the same characters. (e.g. `[data-href^="https://"]`)
> + `$=`: The case of matching between designated value and custom data attributes finishing with the same characters. (e.g. `[data-href$=".webp"]`)
> + `*=`: The case of matching between designated value and custom data attributes including with the same characters. (e.g. `[data-alphabet*="bcdef"]`)
> + `|=`: The case of matching between designated value and custom data attributes starting with the same characters, and string of custom data attribute followed `/-[A-Za-z]+/`. (e.g. `[data-lang|="en"]`)
>
> > This expression is offen used by tag of languages (like a `en-US`, `en-GB`) which based on ISO 639 + ISO 3166.

> At attribute value; you need to sandwich a designated value by quote symbols (`"` or `'`).
>
> Please notice if you want to handle quote symbol characters in custom data attributes.
>
> And saying, this plugin transform at percent encoding (%xx) against below characters in attribute value by internal processing.
> + `%`: %25
> + `"`: %22
> + `'`: %27
> + `｀`: %60
> + `\`: %5D


#### ARIA attributes

Using `aria(...)!` case that conditional syntax, this plugin behave to combine CSS selector and ARIA attributes.

If you wish to combine multiple ARIA attributes consecutively, can describe by `,` splitting syntax.

```scss
/* 🚧Before */
h1 {
  @emums aria(label="heading")!fs:1.5rem;
}

/* 🚀After */
h1[aria-label="heading"] {
  font-size: 1.5rem;
}
```

The ARIA attributes (which are as arguments of `aria(...)` function) can be described in these combination; `attribute name`, `=`, `attribute value`.

> At attribute name; designated value is only string which is following onto `aria-`.
>
> Strictly speaking, there are available only `/[a-z]/` characters.

> At conditional operator; there is only available character `=`.
>
> If there are desirable more operators, I would be extending to a level of same kinds as `data(...)!` maybe.

> At attribute value; you need to sandwich a designated value by quote symbols (`"` or `'`).
>
> Please notice if you want to handle quote symbol characters in ARIA attributes.
>
> And saying, this plugin transform at percent encoding (%xx) against below characters in attribute value by internal processing.
> + `%`: %25
> + `"`: %22
> + `'`: %27
> + `｀`: %60
> + `\`: %5D


### Special characters

There are 5 characters which behave especially; `:`, `^`, `!`, `[[`, and `]]`.


#### COLON Character

As saying before, COLON (`:`) characters are used for separator against property name and property value.

Because of this, you cannot describe as `content:":"`.

Please transform to escape the characters by yourself -- `content:"\03A"`.


#### EXCLAMATION character

When you postfix EXCLAMATION (`!`) character about property value, this plugin recognize "I ordered this property is declared `!important`". There is `padding-top:1rem`, then will be replaced to `padding-top: 1rem !important`.

> Notice: This usage case of exclamation character (`!`) which behave as `!important` declaration is different to conditional syntax as `hover!`.

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


### Default colors

Default colors forked from [Flexoki] v2.0 to this package.

If you want to use it, call a CSS variable from CSS `var()` function.

```scss
body {
  @enums ct:var(--color-red-400);
}
```

[<img src="README.img/default_color.png" alt="Default color">](README.img/default_color.png)

But currently you cannot use a CSS color settings with alpha channel which styles as `#RRGGBBAA`.

So this packages includes `_color.scss` file.

```scss
@use '../node_modules/postcss-enumerates-in-line/_color.scss' as c;

html {
  color: #{c.$color-red-400}99; // D14D4199
}
```

> I will implement `color-alpha[[<color-theme>,<color-depth>,<alpha>,<optional:output-style>]]` function futurity.

```scss
/* 🚧Before */
html {
  color: color-alpha[[red,400,60%,oklch]];
}

/* 🚀After */
html {
  color: oklch(0.597 0.1692 28.38 / 60%);
}
```


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
  --color-red-400: hsl(5 61% 53.7%);
}
```

Turn it `false`, this will not output any color settings.

You want to output by RGB type (without default HSL type), may designate `"rgb"` or `"RGB"`.

```css
:root {
  --color-red-400: #D14D41;
}
```

Or want to output by OKLCH type, may designate `"oklch"` or `"OKLCH"`.

```css
:root {
  --color-red-400: oklch(0.597 0.1692 28.38);
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
