var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.send(`<h1>hello world </h1>`);
});

module.exports = router;
