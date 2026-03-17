const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");
const {
  container: { ModuleFederationPlugin },
} = require("webpack");

// Load environment variables from .env file
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
const searchAppUrl = process.env.SEARCH_APP_URL || "http://localhost:3001";
const libraryAppUrl = process.env.LIBRARY_APP_URL || "http://localhost:3002";
const playerAppUrl = process.env.PLAYER_APP_URL || "http://localhost:3003";

// Build environment variables object for DefinePlugin
const envVars = {};
Object.keys(process.env).forEach((key) => {
  if (key.startsWith("REACT_APP_")) {
    envVars[`process.env.${key}`] = JSON.stringify(process.env[key]);
  }
});

module.exports = {
  mode: isProduction ? "production" : "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash:8].js",
    chunkFilename: "[name].[contenthash:8].chunk.js",
    publicPath: isProduction ? "/shell-app/" : "/",
    clean: true,
  },
  devServer: {
    port: 3000,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
    historyApiFallback: true,
  },
  devtool: isProduction ? "source-map" : "cheap-module-source-map",
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(envVars),
    new ModuleFederationPlugin({
      name: "shellApp",
      filename: "remoteEntry.js",
      remotes: {
        searchApp: `searchApp@${searchAppUrl}/remoteEntry.js`,
        libraryApp: `libraryApp@${libraryAppUrl}/remoteEntry.js`,
        playerApp: `playerApp@${playerAppUrl}/remoteEntry.js`,
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        "react-dom": { singleton: true, requiredVersion: false },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
  ],
};
