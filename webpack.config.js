const htmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./assets/javascript/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js",
  },
  plugins: [
    new htmlWebpackPlugin({
      title: "Battleship",
      template: "assets/html/index.html",
    }),
  ],
};
