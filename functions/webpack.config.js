const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  target: "node", // IMPORTANT!
  entry: {
    UnparsedDemosBlobTrigger: path.join(__dirname, "unparsed-demos-blobtrigger/index.ts"),
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [new TsconfigPathsPlugin()],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "commonjs", // IMPORTANT!
  },
  plugins: [
    new webpack.IgnorePlugin({
      checkResource(resource) {
        const lazyImports = [
          "@nestjs/microservices",
          "@nestjs/websockets",
          "@nestjs/websockets/socket-module",
          "@nestjs/microservices/microservices-module",
          "memcpy",
        ];
        if (!lazyImports.includes(resource)) {
          return false;
        }
        try {
          require.resolve(resource);
        } catch (err) {
          return true;
        }
        return false;
      },
    }),
    new CopyWebpackPlugin([
      { context: "unparsed-demos-blobtrigger", from: "**/function.json", to: "unparsed-demos-blobtrigger" },
      "host.json",
      "local.settings.json",
    ]),
  ],

  node: {
    __dirname: false,
    __filename: false,
  },
};
