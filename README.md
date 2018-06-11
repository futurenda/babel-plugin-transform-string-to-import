# babel-plugin-transform-string-to-import

Transform prefixed strings into imports.
Works with babel 6/7.

## Why
To allow `.jsx` to have the equivalent of `vue-loader`'s`transformAssetUrls`,
so we can use `<Icon name="~image.jpg"/>` in jsx too, as the same in `.vue`.

### in
```js
var a = '~iconName'
function foo() {
    return <icon name="~iconName"/>
}
```

### out
```js
import _iconName from 'iconName';
var a = _iconName;
function foo() {
    return <icon name={_iconName} />;
}
```
and then let webpack handle `import _iconName from 'iconName';`


## Installation

```sh
$ npm install babel-plugin-transform-string-to-import
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-string-to-import"]
}
```

### Via CLI

```sh
$ babel --plugins transform-string-to-import script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-string-to-import"]
});
```

## Options

### `prefix`

`string`, defaults to `'~'`

The prefix of the strings to transform
