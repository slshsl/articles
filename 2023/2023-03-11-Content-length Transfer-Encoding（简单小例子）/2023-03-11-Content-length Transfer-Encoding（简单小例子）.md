# Content-Length

```js
const net = require("node:net");
const server = net
  .createServer((socket) => {
    socket.on("data", function (data) {
      socket.write("HTTP/1.1 200 OK\r\n");
      socket.write("Content-Length:12\r\n"); //  1
      socket.write("\r\n");
      socket.write("hello world!");
      socket.destroy(); // 2
    });
  })
  .on("error", (err) => {
    throw err;
  });

server.listen(9000, () => {
  console.log("opened server on", server.address());
});
```

- 场景一：
  注释掉 1，保留 2；
  虽然当前浏览器都是采用长连接的请求，但服务器每次响应都会挂断，浏览器正常响应

- 场景二：
  注释掉 2，保留 1；
  当前浏览器都是采用长连接的请求，服务器也不会立即挂断（可写个策略，等待多长时间没有数据来时在挂断）
  如果 Content-Length 中长度与请求体 body 长度一致，浏览器正常响应
  如果 Content-Length 中长度大于请求体 body 长度，浏览器一直 pending
  如果 Content-Length 中长度小于请求体 body 长度，浏览器会截断内容正常响应

# Transfer-Encoding

```js
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
```

- Transfer-Encoding:chunked 响应头部可以不需要 content-lenght 头部，不依赖头部的长度信息，也能知道实体的边界
- Content-Encoding 和 Transfer-Encoding 二者经常会结合来用； 其实就是针对进行了内容编码（压缩）的内容再进行传输编码（分块）
