//Transfer-Encoding:chunked响应头部可以不需要content-lenght头部，不依赖头部的长度信息，也能知道实体的边界
//Content-Encoding 和 Transfer-Encoding 二者经常会结合来用； 其实就是针对进行了内容编码（压缩）的内容再进行传输编码（分块）

const net = require("node:net");
const server = net
  .createServer((socket) => {
    socket.on("data", function (data) {
      socket.write("HTTP/1.1 200 OK\r\n");
      socket.write("Transfer-Encoding:chunked\r\n");
      socket.write("\r\n");

      socket.write("b\r\n"); //第一个分块的长度，十六进制表示，不包括\r\n
      socket.write("01234567898\r\n"); //第一个分块的数据

      socket.write("5\r\n"); //第二个分块的长度，十六进制表示，不包括\r\n
      socket.write("12345\r\n"); //第二个分块的数据

      socket.write("0\r\n"); //最后一个分块的长度必须为0，不包括\r\n
      socket.write("\r\n"); //最后一个分块的数据没有内容，表示实体结束
    });
  })
  .on("error", (err) => {
    throw err;
  });

server.listen(9000, () => {
  console.log("opened server on", server.address());
});
