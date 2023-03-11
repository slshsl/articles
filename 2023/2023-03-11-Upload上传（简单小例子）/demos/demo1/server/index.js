const express = require("express");
const path = require("path");

const app = express();
const staticRoot = path.resolve(__dirname, "../client");

app.use(express.static(staticRoot));

app.use("/api/upload", require("./routes/upload"));

app.use(require("./middleware/handleError"));

app.listen(9000, () => {
  console.log("opened server on", 9000);
});
