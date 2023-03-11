// 标记该模块采用的是esmodule,还是commonjs导出
__webpack_require__.r = (exports) => {
  if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
    Object.defineProperty(exports, Symbol.toStringTag, {
      value: "Module",
    });
  }
  Object.defineProperty(exports, "__esModule", { value: true });
};

//_esModule 是用来兼容 ES 模块导入 CommonJS 模块默认导出方案。
