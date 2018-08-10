const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const LiveReloadPlugin = require("webpack-livereload-plugin");
const poststylus = require("poststylus");

const config = {
  outputDir: "./dist",
  entry: "./src/app.js"
};

if (true) {
  // demo
  config.outputDir = "./demo/dist";
  config.entry = "./demo/app.js";
}

module.exports = env => {
  return [
    {
      entry: config.entry,
      output: {
        path: path.join(__dirname, config.outputDir),
        filename: "[name].js",
        publicPath: "/dist/"
      },
      optimization: {
        minimizer: [
          new UglifyJsPlugin({
            cache: true,
            parallel: true
          }),
          new OptimizeCSSAssetsPlugin({})
        ]
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            use: "babel-loader"
          },
          {
            test: /\.(sa|sc)ss$/,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              "sass-loader",
              "postcss-loader"
            ]
          },
          {
            test: /\.less$/,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              "less-loader",
              "postcss-loader"
            ]
          },
          {
            test: /\.styl$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"]
          }
        ]
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: "[name].css"
        }),
        new LiveReloadPlugin({
          appendScriptTag: true,
          protocol: "http",
          hostname: "127.0.0.1",
          port: "35729",
          delay: 50
        }),
        new webpack.LoaderOptionsPlugin({
          options: {
            stylus: {
              use: [poststylus(["autoprefixer"])]
            }
          }
        })
      ]
    }
  ];
};
