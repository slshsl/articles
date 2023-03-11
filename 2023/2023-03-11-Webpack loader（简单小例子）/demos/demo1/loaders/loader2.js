module.exports = function (content, map, meta) {
  console.log("loader22");
  const callback = this.async();
  setTimeout(() => {
    callback(null, content);
  }, 2000);
};
module.exports.pitch = function () {
  console.log("pitch22");
};
