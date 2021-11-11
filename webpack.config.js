const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = function (options) {
  return {
    ...options,
    plugins: [
      ...options.plugins,
      new CopyWebpackPlugin({
        patterns: [{ context: "apps/demoanappfunc", from: "**/function.json", to: "apps/demoanappfunc" }],
      }),
    ],
    output: {
      filename: options.output.filename,
      path: options.output.path,
      libraryTarget: "commonjs", // IMPORTANT!
    },
  };
};
