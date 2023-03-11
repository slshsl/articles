// 将esm模块的导出结果转换成commonjs的导出结果

// export const name = "leo";
// export default 13;
//        ⬇ ⬇ ⬇
// exports.default = 13;
// exports.name = "age";

__webpack_require__.d = (exports, definition) => {
  for (var key in definition) {
    if (
      __webpack_require__.o(definition, key) &&
      !__webpack_require__.o(exports, key)
    ) {
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: definition[key],
      });
    }
  }
};
