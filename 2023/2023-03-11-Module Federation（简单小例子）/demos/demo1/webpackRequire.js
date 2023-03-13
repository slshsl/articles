function __webpack_require__(moduleId) {
	// 从缓存中取出
	var cachedModule = __webpack_module_cache__[moduleId];
	// 判断是否存在，存在则把返回缓存的结果
	if (cachedModule !== undefined) {
		return cachedModule.exports;
	}
	//不存在，则开始运行该模块，初始化module,module.exports变量
	var module = (__webpack_module_cache__[moduleId] = {
		exports: {}
	});
	//运行该模块
	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
	//返回该模块导出结果
	return module.exports;
}
