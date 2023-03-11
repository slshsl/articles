// 获得默认导出处理函数，module为模块导出结果，实际上是module.exports
// 判断是否是esmodule导出，如果是返回module.export.default,否则返回module.export
__webpack_require__.n = (module) => {
  var getter =
    module && module.__esModule ? () => module["default"] : () => module;
  __webpack_require__.d(getter, { a: getter });
  return getter;
};
