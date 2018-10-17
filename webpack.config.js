const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const LiveReloadPlugin = require("webpack-livereload-plugin");
const poststylus = require("poststylus");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = env => {
  const config = require(`./${process.env.npm_config_configFile ||
    "config.json"}`);

  return [
    {
      entry: config.entry,
      output: {
        path: path.join(__dirname, config.outputDir),
        filename: "[name].[chunkhash].js",
        chunkFilename: "[id].[chunkhash].js",
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
        new CleanWebpackPlugin(`${config.outputDir}/*`, {
          allowExternal: true
        }),
        new MiniCssExtractPlugin({
          filename: "[name].[chunkhash].css"
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
        }),
        new HtmlWebpackPlugin({
          filename: "scripts.html",
          template: "./src/templates/scripts.html",
          inject: false
        }),
        new HtmlWebpackPlugin({
          filename: "styles.html",
          template: "./src/templates/styles.html",
          inject: false
        })
      ]
    }
  ];
};
