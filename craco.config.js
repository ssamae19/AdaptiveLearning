const webpack = require("webpack");

module.exports = {
  babel: {
    plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }]
    ]
  },
  webpack: {
    configure: {
      resolve: {
        fallback: {
          process: require.resolve("process/browser"),
          zlib: require.resolve("browserify-zlib"),
          stream: require.resolve("stream-browserify"),
          util: require.resolve("util"),
          buffer: require.resolve("buffer"),
          asset: require.resolve("assert"),
          fs: false,
          os: false,
          path: false,
          crypto: false,
        },
      },
      plugins: [
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
          process: "process/browser",
        }),
       
      ],
    },
  }
};
