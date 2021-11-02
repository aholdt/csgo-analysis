const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = function (options) {
  const toCopy = [
    { context: path.resolve(__dirname), from: "**/function.json" },
    { context: path.resolve(__dirname), from: "**/host.json" },
  ];
  return {
    ...options,
    plugins: [
      ...options.plugins,
      new CopyWebpackPlugin({
        patterns: toCopy,
      }),
    ],
    output: {
      filename: options.output.filename,
      path: options.output.path,
      libraryTarget: "commonjs", // IMPORTANT!
    },
  };
};
