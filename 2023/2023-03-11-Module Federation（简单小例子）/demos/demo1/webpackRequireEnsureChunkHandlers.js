// __webpack_require__.f = {};

var installedChunks = {
  main: 0,
};

__webpack_require__.f.j = (chunkId, promises) => {
  var installedChunkData = __webpack_require__.o(installedChunks, chunkId)
    ? installedChunks[chunkId]
    : undefined;
  if (installedChunkData !== 0) {
    if (installedChunkData) {
      promises.push(installedChunkData[2]);
    } else {
      if (true) {
        var promise = new Promise((resolve, reject) => {
          installedChunkData = [resolve, reject];
          installedChunks[chunkId] = [resolve, reject];
        });

        installedChunkData[2] = promise;
        promises.push(promise);

        var url = __webpack_require__.p + __webpack_require__.u(chunkId);

        var error = new Error();

        // 目前只理解到异步chunk加载失败reject掉__webpack_require__.e的promise
        var loadingEnded = (event) => {
          if (__webpack_require__.o(installedChunks, chunkId)) {
            installedChunkData = installedChunks[chunkId];
            // 此时如果installedChunkData不为0，则代表异步chunk脚本加载出错
            // 需要将installedChunks对应的chunk标志复位为undefined
            if (installedChunkData !== 0) installedChunks[chunkId] = undefined;
            // 处理异步chunk脚本加载错误信息
            if (installedChunkData) {
              var errorType =
                event && (event.type === "load" ? "missing" : event.type);
              var realSrc = event && event.target && event.target.src;
              error.message =
                "Loading chunk " +
                chunkId +
                " failed.\n(" +
                errorType +
                ": " +
                realSrc +
                ")";
              error.name = "ChunkLoadError";
              error.type = errorType;
              error.request = realSrc;
              // reject函数__webpack_require__.e的promise
              installedChunkData[1](error);
            }
          }
        };
        //动态创建异步chunk脚本的script，并挂载到head中
        __webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
      } else installedChunks[chunkId] = 0;
    }
  }
};

// 当异步chunk脚本运行触发，该函数执行完触发异步chunk脚本的onload事件
// JsonpChunkLoading
var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
  var [chunkIds, moreModules, runtime] = data;
  var moduleId,
    chunkId,
    i = 0;

  if (chunkIds.some((id) => installedChunks[id] !== 0)) {
    for (moduleId in moreModules) {
      if (__webpack_require__.o(moreModules, moduleId)) {
        //将该chunk合入到__webpack_modules__中，记录这次加载的异步chunk的信息
        __webpack_require__.m[moduleId] = moreModules[moduleId];
      }
    }
    // 没看懂
    if (runtime) var result = runtime(__webpack_require__);
  }

  // 没看懂这个变量是干什么
  if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);

  for (; i < chunkIds.length; i++) {
    chunkId = chunkIds[i];
    if (
      __webpack_require__.o(installedChunks, chunkId) &&
      installedChunks[chunkId]
    ) {
      // resolve函数__webpack_require__.e的promise
      installedChunks[chunkId][0]();
    }
    // 标志该chunk已经加载过
    installedChunks[chunkId] = 0;
  }
};

var chunkLoadingGlobal = (self["webpackChunkanalyze"] =
  self["webpackChunkanalyze"] || []);
chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
chunkLoadingGlobal.push = webpackJsonpCallback.bind(
  null,
  chunkLoadingGlobal.push.bind(chunkLoadingGlobal)
);
