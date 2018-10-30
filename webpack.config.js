const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const poststylus = require("poststylus");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const LiveReloadPlugin = require("webpack-livereload-plugin");

module.exports = env => {
  const config = require(`./config.json`);
  const outputDir =
    process.env.npm_lifecycle_script.indexOf("webpack --watch") === -1
      ? config.outputDir
      : config.publishedPath;

  const plugins = [
    new CleanWebpackPlugin(`${outputDir}/*`, {
      allowExternal: true
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash].css"
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
  ];

  if (process.env.npm_lifecycle_script.indexOf("webpack --watch") !== -1) {
    plugins.push(
      new LiveReloadPlugin({
        delay: 50
      })
    );
  }

  return [
    {
      entry: "./app.js",
      output: {
        path: path.isAbsolute(outputDir)
          ? path.normalize(outputDir)
          : path.join(__dirname, outputDir),
        filename: "[name].[chunkhash].js",
        chunkFilename: "[id].[chunkhash].js",
        publicPath: config.publicPath
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
          },
          {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            exclude: /node_modules/,
            loader: "file-loader?limit=1024&name=fonts/[name].[ext]"
          },
          {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            exclude: /node_modules/,
            loader: "file-loader?limit=1024&name=fonts/[name].[ext]"
          },
          {
            test: /\.(png|jpg|jpeg)$/,
            exclude: /node_modules/,
            loader: "file-loader?limit=1024&name=[name].[ext]"
          }
        ]
      },
      plugins: plugins
    }
  ];
};
