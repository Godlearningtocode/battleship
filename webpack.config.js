const htmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: ["./assets/javascript/index.js", "./assets/javascript/gameboard.js", "./assets/javascript/ship.js", "./assets/javascript/player.js"],
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      title: "Battleship",
      template: "assets/html/index.html",
    }),
  ],
};
