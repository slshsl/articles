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
      name: "app1",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/components/Button.js",
      },
      remotes: {},
      shared: {},
    }),
  ],
};
