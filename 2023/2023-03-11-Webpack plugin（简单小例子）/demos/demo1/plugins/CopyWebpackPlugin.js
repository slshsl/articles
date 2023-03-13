const { validate } = require('schema-utils');
const schema = require('./schema.json');
const path = require('path');
const globby = require('globby');
const fs = require('fs');

class CopyWebpackPlugin {
	constructor(options) {
		this.options = options;
		validate(schema, options, {
			name: 'CopyWebpackPlugin'
		});
	}
	apply(compiler) {
		compiler.hooks.thisCompilation.tap('CopyWebpackPlugin', (compilation) => {
			compilation.hooks.additionalAssets.tapAsync(
				'CopyWebpackPlugin',
				async (cb) => {
					//将from中的资源复制到to中去，
					const { from, ignore } = this.options;
					const to = this.options.to ? this.options.to : '.';
					//1.读取from中的资源
					//options就是webpack的配置
					const context = compiler.options.context; //context实际上是process.pwd
					//将输入路径变成绝对路径
					const absoluteFrom = path.isAbsolute(from)
						? from
						: path.resolve(context, from);
					//globby函数(要处理的文件夹,option)
					const paths = await globby(absoluteFrom, {
						ignore
					});
					console.log(paths);
					//2.过滤ingnore的文件
					//3.生成webpack格式的资源
					//4.添加到compilation中，输出出去
				}
			);
		});
	}
}
module.exports = CopyWebpackPlugin;
