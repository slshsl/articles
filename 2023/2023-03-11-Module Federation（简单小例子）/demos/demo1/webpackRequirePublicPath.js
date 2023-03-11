var scriptUrl;
if (__webpack_require__.g.importScripts)
  scriptUrl = __webpack_require__.g.location + "";

var document = __webpack_require__.g.document;

if (!scriptUrl && document) {
  if (document.currentScript) scriptUrl = document.currentScript.src;

  if (!scriptUrl) {
    var scripts = document.getElementsByTagName("script");
    if (scripts.length) scriptUrl = scripts[scripts.length - 1].src;
  }
}
if (!scriptUrl)
  throw new Error("Automatic publicPath is not supported in this browser");

scriptUrl = scriptUrl
  .replace(/#.*$/, "")
  .replace(/\?.*$/, "")
  .replace(/\/[^\/]+$/, "/");

__webpack_require__.p = scriptUrl;
