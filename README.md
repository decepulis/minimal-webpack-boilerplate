# minimal-webpack-boilerplate

- Markup: Handlebars => HTML
- Style: SCSS + postcss/autoprefixer => CSS
- Logic: ES6 + Babel => JS

That's it.

## Commands
### Installation
`npm install`
### Development
`npm run dev`

_(runs `webpack-dev-server --open --config webpack.dev.js`)_
### Production
`npm run build`

_(runs `webpack --config webpack.prod.js"`)_

## Adding Web Pages
- `src/styles/` contans pages' styles as .css or .scss
  - Webpack automatically detects .css or .scss files
- `src/scripts` contains pages' scripts as ES6 .js
  - Webpack must be told to watch these files by adding them to the `entry` section of `webpack.common.js`
  - The format for the `entry` section is `{ chunk_name: './src/scripts/chunk_file.js }`
- `src/pages` contains pages' markup, as either .hbs (handlebars templates) or .html (none/lodash templates)
  - Webpack must be told to watch these files by adding them to the `plugins` section of `webpack.common.js`
    - These files are added using the [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
    - Scripts for a page can be added by adding the above-defined `chunk-name` to the `chunks` section of the `new HtmlWebpackPlugin({})`
    - Styles for a page can be added by importing them in a chunk.

## Example
This is a minimal example showing the bullet points from the previous section. You'll find _approximately_ the same thing in the repo.

### Style
`src/styles/about.scss`
```scss
$primary-color: red;
html {
    background: $primary-color;
}
```
### Script
`src/scripts/about.js`
```javascript
import `../styles/about.scss`

console.log('Hello from About!')
```

### Markup
`src/pages/layouts/base.hbs`
```hbs
<!doctype html>
<html>
  <head>
    <title>{{#if title}}{{title}}{{else}}Default Title{{/if}}</title>
  </head>
  <body>
    <h1>Base</h1>
    {{#> body-block}}<p>Default Body</p>{{/body-block}}
  </body>
</html>
```

`src/pages/about.hbs`
```hbs
{{#> layouts/base title="About" }}
  {{#*inline "body-block"}}
    <h2>About</h2>
  {{/inline}}
{{/layouts/base}}
```

### Webpack
`webpack.common.js`
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // === Add Scripts Here === //
  entry: {
    about: './src/scripts/about.js',
  },

  // === Add Webpages Here === //
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'about/index.html',
      template: 'src/pages/about.hbs',
      chunks: ['about']  //  - Link webpages to scripts here - //
    }),
  ],

  // Don't Worry About This Too Much (unless you're feeling confident)
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      { 
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }, {
        test: /\.hbs$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'handlebars-loader'
        }
      }
    ]
  },
};
```

