const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = function (options) {
  return {
    ...options,
    plugins: [
      ...options.plugins,
      new CopyWebpackPlugin({
        patterns: [
          { context: path.resolve(__dirname), from: "**/function.json" },
          { context: path.resolve(__dirname), from: "**/host.json" },
          { context: path.resolve(__dirname), from: "**/local.settings.json" },
        ],
      }),
    ],
    output: {
      filename: options.output.filename,
      path: options.output.path,
      libraryTarget: "commonjs", // IMPORTANT!
    },
  };
};
