// 记录模块map对象，
var __webpack_modules__ = {
  "./src/index.js": (
    __unused_webpack_module,
    __unused_webpack_exports,
    __webpack_require__
  ) => {
    __webpack_require__
      .e("src_test_js")
      .then(__webpack_require__.bind(__webpack_require__, "./src/test.js"))
      .then((res) => {
        console.log(res);
      });
  },
};
