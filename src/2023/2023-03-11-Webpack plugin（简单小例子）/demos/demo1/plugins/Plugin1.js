class Plugin1 {
	apply(compiler) {
		compiler.hooks.emit.tap('Plugin1', (compilation) => {
			console.log('emit.tap');
		});

		compiler.hooks.afterEmit.tap('Plugin1', (compilation) => {
			console.log('afterEmit.tap');
		});

		compiler.hooks.done.tap('Plugin1', (stats) => {
			console.log('done.tap');
		});
	}
}
module.exports = Plugin1;
