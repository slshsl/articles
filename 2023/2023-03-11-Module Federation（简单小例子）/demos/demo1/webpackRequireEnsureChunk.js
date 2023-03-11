__webpack_require__.f = {};

__webpack_require__.e = (chunkId) => {
  const temp = Object.keys(__webpack_require__.f).reduce((promises, key) => {
    __webpack_require__.f[key](chunkId, promises);
    return promises;
  }, []);

  return Promise.all(temp);
};
