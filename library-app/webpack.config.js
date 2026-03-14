const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { container: { ModuleFederationPlugin } } = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');

const isProduction = process.env.NODE_ENV === 'production';
const publicPath = process.env.PUBLIC_PATH || 'http://localhost:3002/';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[name].[contenthash:8].chunk.js',
    publicPath: publicPath,
    clean: true,
  },
  devServer: {
    port: 3002,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
  resolve: {
    extensions: ['.vue', '.js', '.json'],
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'libraryApp',
      filename: 'remoteEntry.js',
      exposes: {
        './libraryInjector': './src/injectors/libraryInjector.js',
      },
      shared: {
        vue: { singleton: true, requiredVersion: false },
      },
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
  ],
};
