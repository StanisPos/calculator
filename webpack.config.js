const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    clean: true,
  },
  target: ['web', 'es5'],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /(\.css|\.scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                ['postcss-preset-env'],
              ],
            },
          },
        },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        include: path.join(__dirname, 'assets/img'),
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      inlineSource: '.(js|css)$',
      filename: 'index.html',
      inject: 'body',
      favicon: './assets/icons/favicon.png',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: ['...', new CssMinimizerPlugin()],
  },
  devServer: {
    watchFiles: ['src/**/*.html', 'src/**/*.scss'],
    static: {
      directory: path.join(__dirname, 'build'),
    },
    port: 9090,
    hot: true,
    compress: true,
  },
};
