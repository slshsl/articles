const router = require("express").Router();
const handleUpload = require("../middleware/handleUpload");

router.post("/", (req, res) => {
  handleUpload(req, res, (err) => {
    console.log(res);
    if (!err) {
      const url = `/upload/${req.files[0].filename}`;
      res.send({
        code: 0,
        msg: "",
        data: url,
      });
    }
  });
});

module.exports = router;
