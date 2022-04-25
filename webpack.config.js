const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { dirname } = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', "@babel/preset-react"],
            cacheDirectory: true,
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./src/index.html")
    })
  ],
  devServer: {
    static: {
        directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000, 
},
};