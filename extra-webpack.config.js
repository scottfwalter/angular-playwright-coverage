
// // extra-webpack.config.js
// const fs = require('fs');
// const util = require('util');
// const webpack = require('webpack');

// const readFile = util.promisify(fs.readFile);

// module.exports = readFile('./LICENSE', {
//   encoding: 'utf-8',
// }).then(license => ({
//   plugins: [new webpack.BannerPlugin(license)],
// }));

// module.exports = {
//     module: {
//       rules: [
//         {
//             test: /\.ts$/,
//             exclude: [/node_modules/],
//             use: {
//                 loader: 'babel-loader'
//             }
//         }
//       ],
//     },
//   };


console.log('YES');

module.exports = {
    module: {
      rules: [
        {
          // test: /\.m?js$/,
        test: /\.ts$/,

          /**
           * Exclude `node_modules` except the ones that need transpiling for IE11 compatibility.
           * Run `$ npx are-you-es5 check . -r` to get a list of those modules.
           */
          exclude: /[\\/]node_modules[\\/](?!(incompatible-module1|incompatible_module_2|some_other_nested_module)[\\/])/,
          use: {
            loader: 'babel-loader',
            options: {
                "plugins": [
                    ["@babel/plugin-proposal-decorators", {"legacy": true}],
                    "babel-plugin-istanbul"
                ],
                "presets": ["@babel/preset-typescript"]
            }
          }
        }
      ]
    }
  };
