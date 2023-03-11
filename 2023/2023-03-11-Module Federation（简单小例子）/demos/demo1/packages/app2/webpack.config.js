const HtmlWebpackPlugin = require("html-webpack-plugin");

const { ModuleFederationPlugin } = require("webpack").container;
module.exports = {
  entry: {
    main: "./src/index.js",
  },
  output: {
    clean: true,
  },
  optimization: {
    moduleIds: "named",
    chunkIds: "named",
    minimize: false,
    // runtimeChunk: {
    //   name: (entrypoint) => `runtime~${entrypoint.name}`,
    // },
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new ModuleFederationPlugin({
      name: "app2",
      filename: "remoteEntry.js",
      exposes: {},
      remotes: {
        app1: `app1@${"http://127.0.0.1:9000/remoteEntry.js"}`,
      },
      shared: {},
    }),
  ],
};
