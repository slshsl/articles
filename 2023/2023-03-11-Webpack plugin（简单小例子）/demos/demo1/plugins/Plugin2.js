const fs = require("fs");
const util = require("util");
const path = require("path");
const webpack = require("webpack");
const { RawSource } = webpack.sources;

const readFile = util.promisify(fs.readFile);

class Plugin2 {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap("Plugin2", (compilation) => {
      compilation.hooks.additionalAssets.tapAsync("Plugin2", async (cb) => {
        const content = "aaaaaaaaaaaaaaaaaa";

        compilation.assets["a.txt"] = {
          size() {
            return content.length;
          },
          source() {
            return content;
          },
        };

        const data = await readFile(path.resolve(__dirname, "b.txt"));

        // compilation.assets["b.txt"] = new RawSource(data);

        compilation.emitAsset("b.txt", new RawSource(data));

        cb();
      });
    });
  }
}
module.exports = Plugin2;
