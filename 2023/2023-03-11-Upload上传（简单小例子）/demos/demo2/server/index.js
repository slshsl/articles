const express = require("express");
const cors = require("cors");
const multiparty = require("multiparty");
const EventEmitter = require("events");
const path = require("path");
const fs = require("fs");
const { Buffer } = require("buffer");
const clc = require("cli-color");

const STATIC_TEMPORARY = path.resolve(__dirname, "../upload/temporary");
const STATIC_FILES = path.resolve(__dirname, "../upload/files");

const app = express();

app.use(cors());

const clientRoot = path.resolve(__dirname, "../client");
const uploadRoot = path.resolve(__dirname, "../upload");

app.use(express.static(clientRoot));

app.use(express.static(uploadRoot));

app.post("/upload", function (req, res) {
  const form = new multiparty.Form();
  const formData = {
    index: undefined,
    filename: undefined,
    chunk: undefined,
  };
  let isFileOk = false;
  let isFieldOk = false;

  const eventEmitter = new EventEmitter();

  form.parse(req, function (err, fields, files) {
    formData.index = fields["index"][0];
    formData.filename = fields["filename"][0];
    isFieldOk = true;
    eventEmitter.emit("startSave");
  });

  form.on("file", function (name, file) {
    formData.chunk = file;
    isFileOk = true;
    eventEmitter.emit("startSave");
  });

  eventEmitter.on("startSave", function () {
    if (isFieldOk && isFileOk) {
      const { index, filename, chunk } = formData;

      try {
        const dir = path.resolve(STATIC_TEMPORARY, filename);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
        const buffer = fs.readFileSync(chunk.path);
        const ws = fs.createWriteStream(`${dir}/${index}`);
        ws.end(buffer);
        ws.close();
        res.send(`chunk ${filename} - ${index} upload success.`);
      } catch (error) {
        console.error(error);
        res.status(500).send("chunk upload error");
      }
      isFileOk = false;
      isFieldOk = false;
    }
  });
});

app.get("/merge", function (req, res) {
  const { filename } = req.query;
  try {
    let bufferLength = 0;
    const bufferList = fs
      .readdirSync(path.resolve(STATIC_TEMPORARY, filename))
      .map((fn) => {
        const buffer = fs.readFileSync(
          path.resolve(STATIC_TEMPORARY, filename, fn)
        );
        bufferLength += buffer.length;
        return buffer;
      });
    const buffer = Buffer.concat(bufferList, bufferLength);
    const ws = fs.createWriteStream(path.resolve(STATIC_FILES, filename));
    ws.end(buffer);
    ws.close();
    const url = `/files/${filename}`;
    res.send({
      code: 0,
      msg: "",
      data: url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("merge error");
  }
});

app.listen(9000, () => {
  console.log(clc.green.underline("http://localhost:9000"));
  console.log(clc.green.underline("http://127.0.0.1:9000"));
});
