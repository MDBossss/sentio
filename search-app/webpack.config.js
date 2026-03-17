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
const publicPath = process.env.PUBLIC_PATH || "http://localhost:3001/";

// Build environment variables object for DefinePlugin
const envVars = {};
Object.keys(process.env).forEach((key) => {
  if (key.startsWith("REACT_APP_")) {
    envVars[`process.env.${key}`] = JSON.stringify(process.env[key]);
  }
});

module.exports = {
  mode: isProduction ? "production" : "development",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash:8].js",
    chunkFilename: "[name].[contenthash:8].chunk.js",
    publicPath: publicPath,
    clean: true,
  },
  devServer: {
    port: 3001,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
  devtool: isProduction ? "source-map" : "cheap-module-source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        oneOf: [
          {
            resourceQuery: /inline/,
            use: ["to-string-loader", "css-loader", "postcss-loader"],
          },
          {
            use: ["style-loader", "css-loader", "postcss-loader"],
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(envVars),
    new ModuleFederationPlugin({
      name: "searchApp",
      filename: "remoteEntry.js",
      exposes: {
        "./searchInjector": "./src/injectors/searchInjector.tsx",
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
