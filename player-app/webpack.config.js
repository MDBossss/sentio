const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { container: { ModuleFederationPlugin } } = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';
const publicPath = process.env.PUBLIC_PATH || 'http://localhost:3003/';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[name].[contenthash:8].chunk.js',
    publicPath: publicPath,
    clean: true,
  },
  devServer: {
    port: 3003,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              '@babel/preset-typescript',
              'babel-preset-solid',
            ],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        oneOf: [
          {
            resourceQuery: /inline/,
            use: ['to-string-loader', 'css-loader', 'postcss-loader'],
          },
          {
            use: ['style-loader', 'css-loader', 'postcss-loader'],
          },
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'playerApp',
      filename: 'remoteEntry.js',
      exposes: {
        './playerInjector': './src/injectors/playerInjector.tsx',
      },
      shared: {
        'solid-js': { singleton: true, requiredVersion: false },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
  ],
};
